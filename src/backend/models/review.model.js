const sql = require('../server');

const Review = function(review) {
  this.user_id = review.user_id;
  this.rating = review.rating;
  this.comment = review.comment;
  this.status = review.status || 'pending';
};

// Create new review
Review.create = (newReview, result) => {
  sql.query("INSERT INTO reviews SET ?", newReview, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newReview });
  });
};

// Get all approved reviews
Review.getAllApproved = (result) => {
  sql.query(
    `SELECT r.*, u.name as user_name, u.profile_image 
     FROM reviews r
     JOIN users u ON r.user_id = u.user_id
     WHERE r.status = 'approved'
     ORDER BY r.created_at DESC`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

// Get reviews by user ID
Review.getByUserId = (userId, result) => {
  sql.query(
    `SELECT * FROM reviews WHERE user_id = ? ORDER BY created_at DESC`,
    userId,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

// Update review status (for admin)
Review.updateStatus = (reviewId, status, result) => {
  sql.query(
    "UPDATE reviews SET status = ? WHERE review_id = ?",
    [status, reviewId],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: reviewId, status: status });
    }
  );
};

// Delete review
Review.remove = (reviewId, userId, result) => {
  sql.query(
    "DELETE FROM reviews WHERE review_id = ? AND user_id = ?",
    [reviewId, userId],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, res);
    }
  );
};

// Get review statistics
Review.getStats = (result) => {
  sql.query(
    `SELECT 
      COUNT(*) as total_reviews,
      AVG(rating) as average_rating,
      COUNT(CASE WHEN rating = 5 THEN 1 END) as five_star,
      COUNT(CASE WHEN rating = 4 THEN 1 END) as four_star,
      COUNT(CASE WHEN rating = 3 THEN 1 END) as three_star,
      COUNT(CASE WHEN rating = 2 THEN 1 END) as two_star,
      COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star
     FROM reviews 
     WHERE status = 'approved'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      result(null, res[0]);
    }
  );
};

module.exports = Review; 