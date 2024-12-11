const { authJwt } = require("../middleware");
const controller = require("../controllers/payment.controller");

module.exports = function(app) {
  app.post(
    "/api/payments/initiate",
    [authJwt.verifyToken],
    controller.initiatePayment
  );

  app.post("/api/payments/callback", controller.handleCallback);
}; 