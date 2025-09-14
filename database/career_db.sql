
-- Additional tables for dynamic dashboard functionality
-- Run this after the main career_db.sql

USE career_db;

-- User activities table for tracking user actions
CREATE TABLE IF NOT EXISTS user_activities (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  activity_type VARCHAR(50) NOT NULL, -- 'resume_upload', 'skills_assessment', 'login', 'profile_update', etc.
  activity_data JSON, -- Store additional data about the activity
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_ua_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Skills assessments table
CREATE TABLE IF NOT EXISTS skills_assessments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  assessment_type VARCHAR(50) NOT NULL, -- 'technical', 'soft', 'overall'
  score INT NOT NULL,
  max_score INT NOT NULL,
  answers JSON, -- Store the answers given
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_sa_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User profile completion tracking
CREATE TABLE IF NOT EXISTS user_profile_completion (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL UNIQUE,
  has_resume BOOLEAN DEFAULT FALSE,
  has_skills_assessment BOOLEAN DEFAULT FALSE,
  has_career_preferences BOOLEAN DEFAULT FALSE,
  has_education_info BOOLEAN DEFAULT FALSE,
  completion_percentage INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_upc_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Career suggestions/recommendations table
CREATE TABLE IF NOT EXISTS career_suggestions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  suggestion_title VARCHAR(255) NOT NULL,
  suggestion_description TEXT,
  match_percentage INT NOT NULL,
  salary_range VARCHAR(100),
  growth_potential VARCHAR(50),
  required_skills JSON,
  suggested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_viewed BOOLEAN DEFAULT FALSE,
  CONSTRAINT fk_cs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- System analytics table for admin dashboard
CREATE TABLE IF NOT EXISTS system_analytics (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  metric_name VARCHAR(100) NOT NULL,
  metric_value BIGINT NOT NULL,
  metric_date DATE NOT NULL,
  additional_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User sessions table for tracking active users
CREATE TABLE IF NOT EXISTS user_sessions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  session_token VARCHAR(255) NOT NULL UNIQUE,
  login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  CONSTRAINT fk_us_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX idx_user_activities_type ON user_activities(activity_type);
CREATE INDEX idx_user_activities_created_at ON user_activities(created_at);

CREATE INDEX idx_skills_assessments_user_id ON skills_assessments(user_id);
CREATE INDEX idx_skills_assessments_type ON skills_assessments(assessment_type);

CREATE INDEX idx_career_suggestions_user_id ON career_suggestions(user_id);
CREATE INDEX idx_career_suggestions_viewed ON career_suggestions(is_viewed);

CREATE INDEX idx_system_analytics_date ON system_analytics(metric_date);
CREATE INDEX idx_system_analytics_name ON system_analytics(metric_name);

CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_active ON user_sessions(is_active);
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);


