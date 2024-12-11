require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET || "nir-real-estate-secret-key",
  expiresIn: process.env.JWT_EXPIRATION || 86400 // 24 hours
};