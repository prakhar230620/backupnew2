const express = require('express');
const router = express.Router();
const constructionController = require('../controllers/construction.controller');
const { authJwt } = require('../middleware');
const { upload } = require('../services/upload.service');

// Protect all routes with JWT and admin check
router.use(authJwt.verifyToken, authJwt.isAdmin);

// File upload endpoint
router.post('/upload', upload.array('files', 10), constructionController.handleFileUpload);

// CRUD endpoints
router.post('/', constructionController.create);
router.get('/', constructionController.getAllProjects);
router.get('/:id', constructionController.getProjectById);
router.put('/:id', constructionController.updateProject);
router.delete('/:id', constructionController.deleteProject);

// Category specific endpoints
router.get('/category/:category', constructionController.getProjectsByCategory);

module.exports = router; 