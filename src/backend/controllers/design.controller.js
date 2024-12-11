const Design = require('../models/design.model');
const uploadService = require('../services/upload.service');

// Create new design (admin only)
exports.create = async (req, res) => {
  try {
    // Verify if user is admin
    if (req.userType !== 'admin') {
      return res.status(403).send({
        message: "Only admin can create designs!"
      });
    }

    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Handle media uploads
    let mediaFiles = [];
    if (req.files) {
      const images = req.files.images || [];
      const primaryImage = req.files.primary_image ? [req.files.primary_image[0]] : [];
      
      mediaFiles = await Promise.all([
        ...primaryImage.map(async file => ({
          type: 'image',
          url: (await uploadService.uploadFile(file)).url,
          isPrimary: true
        })),
        ...images.map(async file => ({
          type: 'image',
          url: (await uploadService.uploadFile(file)).url,
          isPrimary: false
        }))
      ]);
    }

    const design = new Design({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      style: req.body.style,
      area_sqft: req.body.area_sqft,
      estimated_cost: req.body.estimated_cost,
      features: JSON.parse(req.body.features || '[]'),
      created_by: req.userId
    });

    Design.create(design, mediaFiles, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the design."
        });
      } else {
        res.send(data);
      }
    });
  } catch (error) {
    console.error('Design creation error:', error);
    res.status(500).send({
      message: "Error creating design"
    });
  }
};

// Get designs by category (public access)
exports.getByCategory = (req, res) => {
  Design.getByCategory(req.params.category, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving designs"
      });
    } else {
      res.send(data);
    }
  });
};

// Get design details (public access)
exports.findOne = (req, res) => {
  Design.findById(req.params.designId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Design not found with id ${req.params.designId}`
        });
        return;
      }
      res.status(500).send({
        message: "Error retrieving design"
      });
      return;
    }
    res.send(data);
  });
};

// Update design (admin only)
exports.update = async (req, res) => {
  try {
    // Verify if user is admin
    if (req.userType !== 'admin') {
      return res.status(403).send({
        message: "Only admin can update designs!"
      });
    }

    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Handle media updates
    let mediaFiles = [];
    if (req.files) {
      const images = req.files.images || [];
      const primaryImage = req.files.primary_image ? [req.files.primary_image[0]] : [];
      
      mediaFiles = await Promise.all([
        ...primaryImage.map(async file => ({
          type: 'image',
          url: (await uploadService.uploadFile(file)).url,
          isPrimary: true
        })),
        ...images.map(async file => ({
          type: 'image',
          url: (await uploadService.uploadFile(file)).url,
          isPrimary: false
        }))
      ]);
    }

    const updatedDesign = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      style: req.body.style,
      area_sqft: req.body.area_sqft,
      estimated_cost: req.body.estimated_cost,
      features: JSON.parse(req.body.features || '[]'),
      status: req.body.status,
      created_by: req.userId
    };

    Design.update(
      req.params.designId,
      updatedDesign,
      mediaFiles,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Design not found with id ${req.params.designId}`
            });
            return;
          }
          res.status(500).send({
            message: "Error updating design"
          });
          return;
        }
        res.send(data);
      }
    );
  } catch (error) {
    console.error('Design update error:', error);
    res.status(500).send({
      message: "Error updating design"
    });
  }
};

// Delete design (admin only)
exports.delete = (req, res) => {
  // Verify if user is admin
  if (req.userType !== 'admin') {
    return res.status(403).send({
      message: "Only admin can delete designs!"
    });
  }

  Design.remove(req.params.designId, req.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Design not found with id ${req.params.designId}`
        });
        return;
      }
      res.status(500).send({
        message: "Could not delete design"
      });
      return;
    }
    res.send({ message: "Design deleted successfully!" });
  });
};

// Get all designs for admin dashboard
exports.getAllForAdmin = (req, res) => {
  // Verify if user is admin
  if (req.userType !== 'admin') {
    return res.status(403).send({
      message: "Access denied!"
    });
  }

  Design.getAllForAdmin((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving designs"
      });
    } else {
      res.send(data);
    }
  });
}; 