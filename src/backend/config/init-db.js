const mysql = require('mysql2/promise');
const dbConfig = require('./db.config');

async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PASSWORD
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.DB}`);
    await connection.query(`USE ${dbConfig.DB}`);

    // Drop tables in correct order
    await connection.query(`SET FOREIGN_KEY_CHECKS = 0`);
    
    const tablesToDrop = [
      'user_details',
      'users'
    ];

    for (const table of tablesToDrop) {
      await connection.query(`DROP TABLE IF EXISTS ${table}`);
    }

    await connection.query(`SET FOREIGN_KEY_CHECKS = 1`);

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        mobile VARCHAR(15),
        password VARCHAR(255) NOT NULL,
        user_type ENUM('user', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database initialized successfully');
    await connection.end();
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase(); 