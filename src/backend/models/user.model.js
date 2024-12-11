const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    try {
      const [result] = await db.query(
        'INSERT INTO users (name, email, password, mobile, user_type) VALUES (?, ?, ?, ?, ?)',
        [userData.name, userData.email, userData.password, userData.mobile || null, 'user']
      );
      
      return { 
        id: result.insertId, 
        ...userData,
        user_type: 'user' 
      };
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already exists');
      }
      throw err;
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.query(
        'SELECT user_id, name, email, mobile, user_type FROM users WHERE user_id = ?',
        [id]
      );
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User; 