-- MySQL schema for career_db

CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS resume (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  education TEXT,
  skills TEXT,
  experience TEXT,
  user_id BIGINT NOT NULL,
  CONSTRAINT fk_resume_user FOREIGN KEY (user_id) REFERENCES users(id)
);

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






