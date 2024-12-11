const { authJwt } = require("../middleware");
const controller = require("../controllers/subscription.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Get all subscription plans
  app.get("/api/subscriptions/plans", controller.getAllPlans);

  // Create new subscription
  app.post(
    "/api/subscriptions",
    [authJwt.verifyToken],
    controller.createSubscription
  );

  // Get user's active subscription
  app.get(
    "/api/subscriptions/active",
    [authJwt.verifyToken],
    controller.getActiveSubscription
  );

  // Update subscription payment status
  app.put(
    "/api/subscriptions/:subscriptionId/status",
    [authJwt.verifyToken],
    controller.updatePaymentStatus
  );
}; 