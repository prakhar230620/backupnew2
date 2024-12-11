const mysql = require('mysql2');
const dbConfig = require('./db.config');

const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.getConnection((err, conn) => {
  if (err) {
    console.error('Database Connection Failed! Bad Config: ', err);
    return;
  }
  console.log('Database Connected Successfully!');
  conn.release();
});

module.exports = pool.promise(); 