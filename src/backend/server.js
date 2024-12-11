const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');
const dbConfig = require('./config/db.config');
const { authJwt, verifySignUp } = require('./middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Database Connection
const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test Database Connection
connection.getConnection((err, conn) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Successfully connected to the database.');
  conn.release();
});

// Routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/subscription.routes')(app);
require('./routes/property.routes')(app);
require('./routes/review.routes')(app);
require('./routes/admin.routes')(app);
require('./routes/finance.routes')(app);
require('./routes/brand.routes')(app);
require('./routes/construction.routes')(app);
require('./routes/design.routes')(app);

// Simple Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to NIR Real Estate API.' });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = connection; 