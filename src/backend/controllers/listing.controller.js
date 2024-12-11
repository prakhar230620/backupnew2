const Listing = require('../models/listing.model');
const uploadService = require('../services/upload.service');

// Create new listing
exports.create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Handle media uploads (video and images)
    let mediaFiles = [];
    if (req.files) {
      const video = req.files.video ? [req.files.video[0]] : [];
      const images = req.files.images || [];
      
      // Validate video duration (30 seconds max)
      if (video.length > 0) {
        const videoFile = video[0];
        // Add video duration check logic here
      }

      mediaFiles = await Promise.all([
        ...video.map(async file => ({
          type: 'video',
          url: (await uploadService.uploadFile(file)).url
        })),
        ...images.map(async file => ({
          type: 'image',
          url: (await uploadService.uploadFile(file)).url
        }))
      ]);
    }

    const listing = new Listing({
      user_id: req.userId,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      location: req.body.location,
      contact_info: JSON.stringify(req.body.contact_info),
      specifications: JSON.stringify(req.body.specifications)
    });

    Listing.create(listing, mediaFiles, (err, data) => {
      if (err) {
        if (err.message.includes("complete your profile")) {
          res.status(403).send({
            message: err.message
          });
        } else {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the listing."
          });
        }
      } else {
        res.send(data);
      }
    });
  } catch (error) {
    console.error('Listing creation error:', error);
    res.status(500).send({
      message: "Error creating listing"
    });
  }
};

// Get user's listings
exports.getUserListings = (req, res) => {
  Listing.getByUserId(req.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving listings"
      });
    } else {
      res.send(data);
    }
  });
};

// Get all active listings with filters
exports.getAllActive = (req, res) => {
  const filters = {
    category: req.query.category,
    location: req.query.location,
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice
  };

  Listing.getAllActive(filters, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving listings"
      });
    } else {
      res.send(data);
    }
  });
};

// Update listing
exports.update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Handle media updates
    let mediaFiles = [];
    if (req.files) {
      const video = req.files.video ? [req.files.video[0]] : [];
      const images = req.files.images || [];
      
      if (video.length > 0) {
        const videoFile = video[0];
        // Add video duration check logic here
      }

      mediaFiles = await Promise.all([
        ...video.map(async file => ({
          type: 'video',
          url: (await uploadService.uploadFile(file)).url
        })),
        ...images.map(async file => ({
          type: 'image',
          url: (await uploadService.uploadFile(file)).url
        }))
      ]);
    }

    const updatedListing = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      location: req.body.location,
      specifications: JSON.stringify(req.body.specifications)
    };

    Listing.update(
      req.params.listingId,
      req.userId,
      updatedListing,
      mediaFiles,
      (err, data) => {
        if (err) {
          if (err.message.includes("Not authorized")) {
            res.status(403).send({
              message: err.message
            });
          } else {
            res.status(500).send({
              message: "Error updating listing"
            });
          }
          return;
        }
        res.send(data);
      }
    );
  } catch (error) {
    console.error('Listing update error:', error);
    res.status(500).send({
      message: "Error updating listing"
    });
  }
};

// Delete listing
exports.delete = (req, res) => {
  Listing.remove(req.params.listingId, req.userId, (err, data) => {
    if (err) {
      if (err.message.includes("Not authorized")) {
        res.status(403).send({
          message: err.message
        });
      } else {
        res.status(500).send({
          message: "Could not delete listing"
        });
      }
      return;
    }
    res.send({ message: "Listing deleted successfully!" });
  });
}; 