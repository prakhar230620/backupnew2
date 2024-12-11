const { authJwt } = require("../middleware");
const controller = require("../controllers/design.controller");
const uploadService = require("../services/upload.service");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Get all design projects
  app.get("/api/design/projects", controller.getAllProjects);

  // Get projects by category
  app.get("/api/design/projects/:category", controller.getProjectsByCategory);

  // Create new project (admin only)
  app.post(
    "/api/design/projects",
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
      uploadService.getUploadMiddleware().fields([
        { name: 'images', maxCount: 10 },
        { name: 'designs', maxCount: 5 }
      ])
    ],
    controller.createProject
  );

  // Update project (admin only)
  app.put(
    "/api/design/projects/:id",
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
      uploadService.getUploadMiddleware().fields([
        { name: 'images', maxCount: 10 },
        { name: 'designs', maxCount: 5 }
      ])
    ],
    controller.updateProject
  );

  // Delete project (admin only)
  app.delete(
    "/api/design/projects/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteProject
  );
}; 