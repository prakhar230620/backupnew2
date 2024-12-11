const { authJwt } = require("../middleware");
const controller = require("../controllers/review.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new review
  app.post(
    "/api/reviews",
    [authJwt.verifyToken],
    controller.create
  );

  // Get all approved reviews
  app.get("/api/reviews/approved", controller.getAllApproved);

  // Get user's reviews
  app.get(
    "/api/reviews/user",
    [authJwt.verifyToken],
    controller.getUserReviews
  );

  // Update review status (admin only)
  app.put(
    "/api/reviews/:reviewId/status",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateStatus
  );

  // Delete a review
  app.delete(
    "/api/reviews/:reviewId",
    [authJwt.verifyToken],
    controller.delete
  );

  // Get review statistics
  app.get("/api/reviews/stats", controller.getStats);
}; 