const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const corsOptions = require('./config/cors.config');

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
const db = require('./config/database');

// Routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Other routes...

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
    server.listen(PORT + 1);
  } else {
    console.error('Server error:', err);
  }
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed');
  });
}); 