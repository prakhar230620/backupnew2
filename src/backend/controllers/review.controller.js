const Review = require('../models/review.model');

// Create new review
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const review = new Review({
    user_id: req.userId,
    rating: req.body.rating,
    comment: req.body.comment
  });

  Review.create(review, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the review."
      });
    } else {
      res.send(data);
    }
  });
};

// Get all approved reviews
exports.getAllApproved = (req, res) => {
  Review.getAllApproved((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving reviews."
      });
    } else {
      res.send(data);
    }
  });
};

// Get user's reviews
exports.getUserReviews = (req, res) => {
  Review.getByUserId(req.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving reviews."
      });
    } else {
      res.send(data);
    }
  });
};

// Update review status (admin only)
exports.updateStatus = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Review.updateStatus(
    req.params.reviewId,
    req.body.status,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Review not found with id ${req.params.reviewId}.`
          });
          return;
        }
        res.status(500).send({
          message: "Error updating review status"
        });
        return;
      }
      res.send(data);
    }
  );
};

// Delete review
exports.delete = (req, res) => {
  Review.remove(req.params.reviewId, req.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Review not found with id ${req.params.reviewId}.`
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

// Get review statistics
exports.getStats = (req, res) => {
  Review.getStats((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving review statistics."
      });
    } else {
      res.send(data);
    }
  });
}; 