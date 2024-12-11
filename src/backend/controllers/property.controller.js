const Property = require('../models/property.model');
const uploadService = require('../services/upload.service');

// Create new property
exports.create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Handle file uploads
    let mediaFiles = [];
    if (req.files) {
      const images = req.files.images || [];
      const documents = req.files.documents || [];
      
      mediaFiles = await Promise.all([
        ...images.map(async file => ({
          type: 'image',
          url: (await uploadService.uploadFile(file)).url
        })),
        ...documents.map(async file => ({
          type: 'document',
          url: (await uploadService.uploadFile(file)).url
        }))
      ]);
    }

    const property = new Property({
      user_id: req.userId,
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      status: req.body.status,
      price: req.body.price,
      location: req.body.location,
      area_sqft: req.body.area_sqft,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      features: JSON.parse(req.body.features || '[]'),
      amenities: JSON.parse(req.body.amenities || '[]')
    });

    Property.create(property, mediaFiles, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the property."
        });
      } else {
        res.send(data);
      }
    });
  } catch (error) {
    console.error('Property creation error:', error);
    res.status(500).send({
      message: "Error creating property"
    });
  }
};

// Get all properties
exports.findAll = (req, res) => {
  const { 
    page = 1, 
    limit = 10,
    type,
    minPrice,
    maxPrice,
    location 
  } = req.query;

  const filters = {
    type,
    minPrice,
    maxPrice,
    location
  };

  Property.getAll(page, limit, filters, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving properties"
      });
    } else {
      res.send(data);
    }
  });
};

// Find a single property
exports.findOne = (req, res) => {
  Property.findById(req.params.propertyId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Property not found with id ${req.params.propertyId}`
        });
        return;
      }
      res.status(500).send({
        message: "Error retrieving property"
      });
      return;
    }
    res.send(data);
  });
};

// Update property
exports.update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    let mediaFiles = [];
    if (req.files) {
      const images = req.files.images || [];
      const documents = req.files.documents || [];
      
      mediaFiles = await Promise.all([
        ...images.map(async file => ({
          type: 'image',
          url: (await uploadService.uploadFile(file)).url
        })),
        ...documents.map(async file => ({
          type: 'document',
          url: (await uploadService.uploadFile(file)).url
        }))
      ]);
    }

    Property.update(
      req.params.propertyId,
      {
        ...req.body,
        features: JSON.parse(req.body.features || '[]'),
        amenities: JSON.parse(req.body.amenities || '[]')
      },
      mediaFiles,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Property not found with id ${req.params.propertyId}`
            });
            return;
          }
          res.status(500).send({
            message: "Error updating property"
          });
          return;
        }
        res.send(data);
      }
    );
  } catch (error) {
    console.error('Property update error:', error);
    res.status(500).send({
      message: "Error updating property"
    });
  }
};

// Delete property
exports.delete = (req, res) => {
  Property.remove(req.params.propertyId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Property not found with id ${req.params.propertyId}`
        });
        return;
      }
      res.status(500).send({
        message: "Could not delete property"
      });
      return;
    }
    res.send({ message: "Property deleted successfully!" });
  });
};

// Get user's properties
exports.getUserProperties = (req, res) => {
  Property.findByUserId(req.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving properties"
      });
    } else {
      res.send(data);
    }
  });
};

// Search properties
exports.search = (req, res) => {
  const searchTerm = req.query.q;
  Property.search(searchTerm, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error searching properties"
      });
    } else {
      res.send(data);
    }
  });
};

// Get properties by type
exports.findByType = (req, res) => {
  Property.findByType(req.params.type, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving properties by type"
      });
    } else {
      res.send(data);
    }
  });
};

// Get properties by location
exports.findByLocation = (req, res) => {
  Property.findByLocation(req.params.location, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving properties by location"
      });
    } else {
      res.send(data);
    }
  });
}; 