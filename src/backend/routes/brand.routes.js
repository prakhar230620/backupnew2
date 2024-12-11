const { authJwt } = require("../middleware");
const controller = require("../controllers/brand.controller");
const uploadService = require("../services/upload.service");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create new promotion
  app.post(
    "/api/brand-promotions",
    [
      authJwt.verifyToken,
      uploadService.getUploadMiddleware().fields([
        { name: 'photos', maxCount: 5 },
        { name: 'video', maxCount: 1 }
      ])
    ],
    controller.create
  );

  // Get active promotions
  app.get("/api/brand-promotions/active", controller.getActivePromotions);

  // Get user's promotions
  app.get(
    "/api/brand-promotions/user",
    [authJwt.verifyToken],
    controller.getUserPromotions
  );

  // Initiate payment
  app.post(
    "/api/brand-promotions/payment/initiate",
    [authJwt.verifyToken],
    controller.initiatePayment
  );

  // Payment callback
  app.post("/api/brand-promotions/payment/callback", controller.handlePaymentCallback);

  // Admin routes
  app.get(
    "/api/admin/brand-promotions",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllPromotions
  );

  app.put(
    "/api/admin/brand-promotions/:promotionId/status",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateStatus
  );
}; 