-- Construction Projects Table
CREATE TABLE construction_projects (
  project_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'Planning',
  start_date DATE,
  completion_date DATE,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(user_id)
);

-- Project Media Table
CREATE TABLE project_media (
  media_id INT PRIMARY KEY AUTO_INCREMENT,
  project_id INT NOT NULL,
  media_type VARCHAR(50) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  file_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES construction_projects(project_id) ON DELETE CASCADE
);

-- Add indexes
CREATE INDEX idx_project_category ON construction_projects(category);
CREATE INDEX idx_project_status ON construction_projects(status); 