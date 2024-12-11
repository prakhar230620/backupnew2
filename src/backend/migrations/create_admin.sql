-- Default admin user creation
INSERT INTO users (name, email, password, user_type, status) 
VALUES (
  'Admin',
  'admin@nirrealestate.com',
  '$2a$10$YourHashedPasswordHere',  -- Use bcrypt to hash 'admin123'
  'admin',
  'active'
); 