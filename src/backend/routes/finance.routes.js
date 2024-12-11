const { authJwt } = require("../middleware");
const controller = require("../controllers/finance.controller");
const uploadService = require("../services/upload.service");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Calculate EMI
  app.post("/api/finance/calculate-emi", controller.calculateEMI);

  // Get loan types and rates
  app.get("/api/finance/loan-types", controller.getLoanTypes);

  // Submit loan application
  app.post(
    "/api/finance/apply",
    [
      authJwt.verifyToken,
      uploadService.getUploadMiddleware().fields([
        { name: 'aadharFront', maxCount: 1 },
        { name: 'aadharBack', maxCount: 1 },
        { name: 'panCardImage', maxCount: 1 },
        { name: 'photo', maxCount: 1 }
      ])
    ],
    controller.submitApplication
  );

  // Get user's applications
  app.get(
    "/api/finance/applications",
    [authJwt.verifyToken],
    controller.getUserApplications
  );

  // Get application details
  app.get(
    "/api/finance/applications/:applicationId",
    [authJwt.verifyToken],
    controller.getApplicationDetails
  );
}; 