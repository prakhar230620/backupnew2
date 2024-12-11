const { authJwt } = require("../middleware");
const controller = require("../controllers/product.controller");
const uploadService = require("../services/upload.service");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create new product listing
  app.post(
    "/api/products/list",
    [
      authJwt.verifyToken,
      uploadService.getUploadMiddleware().fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'video', maxCount: 1 }
      ])
    ],
    controller.createListing
  );

  // Get user's listings
  app.get(
    "/api/products/user",
    [authJwt.verifyToken],
    controller.getUserListings
  );

  // Get all listings
  app.get("/api/products", controller.getAllListings);

  // Get listing details
  app.get("/api/products/:id", controller.getListingDetails);

  // Update listing
  app.put(
    "/api/products/:id",
    [authJwt.verifyToken],
    controller.updateListing
  );

  // Delete listing
  app.delete(
    "/api/products/:id",
    [authJwt.verifyToken],
    controller.deleteListing
  );
}; 