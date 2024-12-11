-- Users table modification
ALTER TABLE users ADD COLUMN user_type ENUM('user', 'admin') DEFAULT 'user';

-- Admin settings table
CREATE TABLE admin_settings (
  setting_id INT PRIMARY KEY AUTO_INCREMENT,
  setting_key VARCHAR(50) NOT NULL UNIQUE,
  setting_value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admin activity logs
CREATE TABLE admin_logs (
  log_id INT PRIMARY KEY AUTO_INCREMENT,
  admin_id INT,
  action VARCHAR(100),
  details TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES users(user_id)
);

-- Add indexes
CREATE INDEX idx_user_type ON users(user_type);
CREATE INDEX idx_admin_logs_admin ON admin_logs(admin_id); 