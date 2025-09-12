-- MySQL dump to create the career_db schema and tables
-- Import this file in MySQL Workbench or via CLI

-- Create database (idempotent)
CREATE DATABASE IF NOT EXISTS career_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE career_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL
);

-- Resume table
CREATE TABLE IF NOT EXISTS resume (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  education TEXT,
  skills TEXT,
  experience TEXT,
  user_id BIGINT NOT NULL,
  CONSTRAINT fk_resume_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Resume analysis table
CREATE TABLE IF NOT EXISTS resume_analysis (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  resume_id BIGINT NULL,
  overall_score INT,
  strengths VARCHAR(2000),
  improvements VARCHAR(2000),
  CONSTRAINT fk_ra_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_ra_resume FOREIGN KEY (resume_id) REFERENCES resume(id)
);

-- Optional sample data (commented out)
-- INSERT INTO users(name, email, password, role) VALUES
-- ('Admin', 'admin@example.com', '$2a$10$WqWQv7ZrW8oIh4y5o3kUuO1s0Qz8C6R2n8G2y0F6vT2N9aY0wJj7m', 'ADMIN');
-- Note: password hash above is placeholder; register via API to create real users.


INSERT INTO users(name, email, password, role)
VALUES ('Admin', 'admin@example.com', '$2a$10$Q9x4QwK9q1oJ9rZrJgW8Oe6qv7cZp9v0lYQ2n1tTqYQxZp7o8YwR6', 'ADMIN');


