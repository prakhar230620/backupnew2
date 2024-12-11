const User = require('../models/user.model');
const Property = require('../models/property.model');
const Review = require('../models/review.model');
const Subscription = require('../models/subscription.model');

// Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const stats = {
      totalUsers: await User.count(),
      totalProperties: await Property.count(),
      totalReviews: await Review.count(),
      activeSubscriptions: await Subscription.countActive()
    };
    res.json(stats);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving dashboard stats"
    });
  }
};

// User Management
exports.getAllUsers = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving users"
      });
    } else {
      res.send(data);
    }
  });
};

exports.getUserDetails = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found with id ${req.params.userId}`
        });
        return;
      }
      res.status(500).send({
        message: "Error retrieving user"
      });
      return;
    }
    res.send(data);
  });
};

exports.updateUser = (req, res) => {
  User.updateById(req.params.userId, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found with id ${req.params.userId}`
        });
        return;
      }
      res.status(500).send({
        message: "Error updating user"
      });
      return;
    }
    res.send(data);
  });
};

exports.deleteUser = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found with id ${req.params.userId}`
        });
        return;
      }
      res.status(500).send({
        message: "Could not delete user"
      });
      return;
    }
    res.send({ message: "User deleted successfully!" });
  });
};

// Property Management
exports.getAllProperties = (req, res) => {
  Property.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving properties"
      });
    } else {
      res.send(data);
    }
  });
};

exports.updateProperty = (req, res) => {
  Property.updateById(req.params.propertyId, req.body, (err, data) => {
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
  });
};

exports.deleteProperty = (req, res) => {
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

// Review Management
exports.getAllReviews = (req, res) => {
  Review.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving reviews"
      });
    } else {
      res.send(data);
    }
  });
};

exports.updateReview = (req, res) => {
  Review.updateById(req.params.reviewId, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Review not found with id ${req.params.reviewId}`
        });
        return;
      }
      res.status(500).send({
        message: "Error updating review"
      });
      return;
    }
    res.send(data);
  });
};

exports.deleteReview = (req, res) => {
  Review.remove(req.params.reviewId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Review not found with id ${req.params.reviewId}`
        });
        return;
      }
      res.status(500).send({
        message: "Could not delete review"
      });
      return;
    }
    res.send({ message: "Review deleted successfully!" });
  });
};

// Subscription Management
exports.getAllSubscriptions = (req, res) => {
  Subscription.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving subscriptions"
      });
    } else {
      res.send(data);
    }
  });
};

exports.updateSubscription = (req, res) => {
  Subscription.updateById(req.params.subscriptionId, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Subscription not found with id ${req.params.subscriptionId}`
        });
        return;
      }
      res.status(500).send({
        message: "Error updating subscription"
      });
      return;
    }
    res.send(data);
  });
};

// Reports
exports.getReports = async (req, res) => {
  try {
    const reports = {
      userStats: await User.getStats(),
      propertyStats: await Property.getStats(),
      revenueStats: await Subscription.getRevenueStats()
    };
    res.json(reports);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error generating reports"
    });
  }
};

// Settings
exports.updateSettings = (req, res) => {
  // Implement settings update logic here
  res.send({ message: "Settings updated successfully" });
};

// File Upload
exports.handleFileUpload = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send({
      message: "No files were uploaded."
    });
  }

  const uploadedFiles = req.files.map(file => ({
    filename: file.filename,
    path: `/uploads/${file.filename}`,
    size: file.size,
    mimetype: file.mimetype
  }));

  res.send({
    message: "Files uploaded successfully",
    files: uploadedFiles
  });
}; 