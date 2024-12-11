const bcrypt = require('bcryptjs');
const db = require('../config/db.config');

const createAdminUser = async () => {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const query = `
      INSERT INTO users (name, email, password, user_type, status) 
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.execute(query, [
      'Admin',
      'admin@nirrealestate.com',
      hashedPassword,
      'admin',
      'active'
    ]);

    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

createAdminUser(); 