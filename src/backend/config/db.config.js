require('dotenv').config();

module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "nir_user",
  PASSWORD: process.env.DB_PASSWORD || "your_password",
  DB: process.env.DB_NAME || "nir_real_estate",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}; 