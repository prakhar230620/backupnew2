require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRATION || 86400,  // 24 hours
  saltRounds: 10
};