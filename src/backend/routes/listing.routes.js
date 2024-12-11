const { authJwt } = require("../middleware");
const controller = require("../controllers/listing.controller");
const uploadService = require("../services/upload.service");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create new listing (authenticated users only)
  app.post(
    "/api/listings",
    [
      authJwt.verifyToken,
      uploadService.getUploadMiddleware().fields([
        { name: 'video', maxCount: 1 },
        { name: 'images', maxCount: 5 }
      ])
    ],
    controller.create
  );

  // Get all active listings
  app.get("/api/listings", controller.getAllActive);

  // Get user's listings
  app.get(
    "/api/listings/user",
    [authJwt.verifyToken],
    controller.getUserListings
  );

  // Update listing
  app.put(
    "/api/listings/:listingId",
    [
      authJwt.verifyToken,
      uploadService.getUploadMiddleware().fields([
        { name: 'video', maxCount: 1 },
        { name: 'images', maxCount: 5 }
      ])
    ],
    controller.update
  );

  // Delete listing
  app.delete(
    "/api/listings/:listingId",
    [authJwt.verifyToken],
    controller.delete
  );
}; 