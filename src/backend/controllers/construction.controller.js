const Construction = require('../models/construction.model');
const uploadService = require('../services/upload.service');

// Handle file upload
exports.handleFileUpload = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send({
        message: "No files were uploaded."
      });
    }

    const uploadedFiles = await uploadService.handleUpload(req.files);
    res.send({
      message: "Files uploaded successfully",
      files: uploadedFiles
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).send({
      message: "Error uploading files"
    });
  }
};

// Create new project
exports.create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Content cannot be empty!"
      });
    }

    const project = new Construction({
      ...req.body,
      created_by: req.userId
    });

    const result = await Construction.create(project, req.body.media || []);
    res.send(result);
  } catch (error) {
    console.error('Project creation error:', error);
    res.status(500).send({
      message: error.message || "Error creating project"
    });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const result = await Construction.getAll();
    res.send(result);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).send({
      message: error.message || "Error retrieving projects"
    });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const result = await Construction.findById(req.params.id);
    if (!result) {
      res.status(404).send({
        message: `Project not found with id ${req.params.id}`
      });
      return;
    }
    res.send(result);
  } catch (error) {

    // Handle media uploads (images, 2D and 3D designs)
    let mediaFiles = [];
    if (req.files) {
      const images = req.files.images || [];
      const designs2d = req.files.designs_2d || [];
      const designs3d = req.files.designs_3d || [];
      
      mediaFiles = await Promise.all([
        ...images.map(async file => ({
          type: 'image',
          url: (await uploadService.uploadFile(file)).url
        })),
        ...designs2d.map(async file => ({
          type: '2d_design',
          url: (await uploadService.uploadFile(file)).url
        })),
        ...designs3d.map(async file => ({
          type: '3d_design',
          url: (await uploadService.uploadFile(file)).url
        }))
      ]);
    }

    const project = new Construction({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      location: req.body.location,
      area_sqft: req.body.area_sqft,
      completion_date: req.body.completion_date,
      features: req.body.features,
      specifications: req.body.specifications
    });

    Construction.create(project, mediaFiles, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the project."
        });
      } else {
        res.send(data);
      }
    });
  } catch (error) {
    console.error('Project creation error:', error);
    res.status(500).send({
      message: "Error creating project"
    });
  }
};

// Get projects by category
exports.getByCategory = (req, res) => {
  Construction.getByCategory(req.params.category, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving projects"
      });
    } else {
      res.send(data);
    }
  });
};

// Get project details
exports.findOne = (req, res) => {
  Construction.findById(req.params.projectId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Project not found with id ${req.params.projectId}`
        });
        return;
      }
      res.status(500).send({
        message: "Error retrieving project"
      });
      return;
    }
    res.send(data);
  });
};

// Update project
exports.update = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // Handle media updates
    let mediaFiles = [];
    if (req.files) {
      const images = req.files.images || [];
      const designs2d = req.files.designs_2d || [];
      const designs3d = req.files.designs_3d || [];
      
      mediaFiles = await Promise.all([
        ...images.map(async file => ({
          type: 'image',
          url: (await uploadService.uploadFile(file)).url
        })),
        ...designs2d.map(async file => ({
          type: '2d_design',
          url: (await uploadService.uploadFile(file)).url
        })),
        ...designs3d.map(async file => ({
          type: '3d_design',
          url: (await uploadService.uploadFile(file)).url
        }))
      ]);
    }

    Construction.update(
      req.params.projectId,
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        location: req.body.location,
        area_sqft: req.body.area_sqft,
        completion_date: req.body.completion_date,
        features: req.body.features,
        specifications: req.body.specifications
      },
      mediaFiles,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Project not found with id ${req.params.projectId}`
            });
            return;
          }
          res.status(500).send({
            message: "Error updating project"
          });
          return;
        }
        res.send(data);
      }
    );
  } catch (error) {
    console.error('Project update error:', error);
    res.status(500).send({
      message: "Error updating project"
    });
  }
};

// Delete project
exports.delete = (req, res) => {
  Construction.remove(req.params.projectId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Project not found with id ${req.params.projectId}`
        });
        return;
      }
      res.status(500).send({
        message: "Could not delete project"
      });
      return;
    }
    res.send({ message: "Project deleted successfully!" });
  });
}; 