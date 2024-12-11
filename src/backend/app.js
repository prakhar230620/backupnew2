const express = require('express');
const app = express();
const constructionRoutes = require('./routes/construction.routes');

// Routes
app.use('/api/admin/construction-projects', constructionRoutes);

// Serve uploaded files
app.use('/uploads', express.static('uploads')); 