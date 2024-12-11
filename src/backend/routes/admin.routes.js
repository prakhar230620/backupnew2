const { authJwt } = require("../middleware");
const controller = require("../controllers/admin.controller");
const uploadService = require("../services/upload.service");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Dashboard Routes
  app.get(
    "/api/admin/dashboard",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getDashboardStats
  );

  // User Management Routes
  app.get(
    "/api/admin/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllUsers
  );

  app.get(
    "/api/admin/users/:userId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getUserDetails
  );

  app.put(
    "/api/admin/users/:userId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  );

  app.delete(
    "/api/admin/users/:userId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );

  // Property Management Routes
  app.get(
    "/api/admin/properties",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllProperties
  );

  app.put(
    "/api/admin/properties/:propertyId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateProperty
  );

  app.delete(
    "/api/admin/properties/:propertyId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteProperty
  );

  // Review Management Routes
  app.get(
    "/api/admin/reviews",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllReviews
  );

  app.put(
    "/api/admin/reviews/:reviewId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateReview
  );

  app.delete(
    "/api/admin/reviews/:reviewId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteReview
  );

  // Subscription Management Routes
  app.get(
    "/api/admin/subscriptions",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllSubscriptions
  );

  app.put(
    "/api/admin/subscriptions/:subscriptionId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateSubscription
  );

  // Reports Routes
  app.get(
    "/api/admin/reports",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getReports
  );

  // Settings Routes
  app.put(
    "/api/admin/settings",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateSettings
  );

  // File Upload Routes
  app.post(
    "/api/admin/upload",
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
      uploadService.getUploadMiddleware().array('files', 10)
    ],
    controller.handleFileUpload
  );
}; 