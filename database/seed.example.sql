-- Example seed data for career_db (adjust emails/passwords before using)
USE career_db;

-- Create a normal user (password: Pass@123 hashed with BCrypt - placeholder)
INSERT INTO users(name, email, password, role)
VALUES ('Demo User', 'user@example.com', '$2a$10$Q9x4QwK9q1oJ9rZrJgW8Oe6qv7cZp9v0lYQ2n1tTqYQxZp7o8YwR6', 'USER');

-- Create an admin user (password: Admin@123 hashed with BCrypt - placeholder)
INSERT INTO users(name, email, password, role)
VALUES ('Admin', 'admin@example.com', '$2a$10$Q9x4QwK9q1oJ9rZrJgW8Oe6qv7cZp9v0lYQ2n1tTqYQxZp7o8YwR6', 'ADMIN');

-- Optional sample resume for the demo user (find the user id after insert)
-- INSERT INTO resume(education, skills, experience, user_id)
-- VALUES ('B.Tech CSE', 'Java,React,AWS', '3 years at XYZ', 1);




