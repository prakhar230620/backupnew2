const express = require('express');
const { authJwt } = require("../middleware");
const controller = require("../controllers/property.controller");
const uploadService = require("../services/upload.service");
const path = require('path');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create new property
  app.post(
    "/api/properties",
    [
      authJwt.verifyToken,
      uploadService.getUploadMiddleware().fields([
        { name: 'images', maxCount: 10 },
        { name: 'documents', maxCount: 5 }
      ])
    ],
    controller.create
  );

  // Get all properties
  app.get("/api/properties", controller.findAll);

  // Get property by id
  app.get("/api/properties/:propertyId", controller.findOne);

  // Update property
  app.put(
    "/api/properties/:propertyId",
    [
      authJwt.verifyToken,
      uploadService.getUploadMiddleware().fields([
        { name: 'images', maxCount: 10 },
        { name: 'documents', maxCount: 5 }
      ])
    ],
    controller.update
  );

  // Delete property
  app.delete(
    "/api/properties/:propertyId",
    [authJwt.verifyToken],
    controller.delete
  );

  // Get user's properties
  app.get(
    "/api/properties/user",
    [authJwt.verifyToken],
    controller.getUserProperties
  );

  // Get properties by type
  app.get(
    "/api/properties/type/:type",
    controller.findByType
  );

  // Get properties by location
  app.get(
    "/api/properties/location/:location",
    controller.findByLocation
  );

  // Search properties
  app.get(
    "/api/properties/search",
    controller.search
  );

  // Serve uploaded files
  const uploadsPath = path.join(__dirname, '../public/uploads');
  app.use('/uploads', express.static(uploadsPath));
}; 