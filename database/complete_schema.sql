-- Complete Career Advisor Database Schema
-- This schema includes all tables needed for the frontend and backend functionality

-- Create database
CREATE DATABASE IF NOT EXISTS career_db;
USE career_db;

-- =============================================
-- CORE USER MANAGEMENT TABLES
-- =============================================

-- Users table (main user entity)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- BCrypt hashed
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    phone_number VARCHAR(20),
    profile_picture_url VARCHAR(500),
    bio TEXT,
    location VARCHAR(255),
    linkedin_url VARCHAR(500),
    github_url VARCHAR(500),
    website_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_users_email (email),
    INDEX idx_users_role (role),
    INDEX idx_users_active (is_active),
    INDEX idx_users_created_at (created_at)
);

-- Password reset tokens
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(100) UNIQUE NOT NULL,
    user_id BIGINT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_prt_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_prt_token (token),
    INDEX idx_prt_user_id (user_id),
    INDEX idx_prt_expires_at (expires_at)
);

-- =============================================
-- RESUME AND ANALYSIS TABLES
-- =============================================

-- Resume table
CREATE TABLE IF NOT EXISTS resume (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    education TEXT,
    skills TEXT,
    experience TEXT,
    file_name VARCHAR(255),
    file_path VARCHAR(500),
    file_size BIGINT,
    file_type VARCHAR(50),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_resume_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_resume_user_id (user_id),
    INDEX idx_resume_uploaded_at (uploaded_at)
);

-- Resume analysis results
CREATE TABLE IF NOT EXISTS resume_analysis (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    resume_id BIGINT,
    overall_score INT,
    strengths TEXT, -- comma-separated list
    improvements TEXT, -- comma-separated list
    analysis_data JSON, -- Store detailed analysis results
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_ra_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_ra_resume FOREIGN KEY (resume_id) REFERENCES resume(id) ON DELETE SET NULL,
    INDEX idx_ra_user_id (user_id),
    INDEX idx_ra_resume_id (resume_id),
    INDEX idx_ra_analyzed_at (analyzed_at)
);

-- =============================================
-- SKILLS ASSESSMENT TABLES
-- =============================================

-- Skills assessments
CREATE TABLE IF NOT EXISTS skills_assessments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    assessment_type VARCHAR(50) NOT NULL, -- 'technical', 'soft', 'overall', 'leadership', 'communication', 'problem_solving', 'adaptability'
    score INT NOT NULL,
    max_score INT NOT NULL,
    answers JSON, -- Store the answers given
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_sa_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_sa_user_id (user_id),
    INDEX idx_sa_type (assessment_type),
    INDEX idx_sa_completed_at (completed_at)
);

-- Skills categories and questions (for dynamic assessment)
CREATE TABLE IF NOT EXISTS skills_questions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(50) NOT NULL,
    question TEXT NOT NULL,
    question_type ENUM('scale', 'choice', 'multiple') NOT NULL,
    options JSON, -- For choice and multiple type questions
    scale_description VARCHAR(255), -- For scale type questions
    weight DECIMAL(3,2) DEFAULT 1.0, -- Weight of this question in scoring
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_sq_category (category),
    INDEX idx_sq_type (question_type),
    INDEX idx_sq_active (is_active)
);

-- =============================================
-- CAREER RECOMMENDATION TABLES
-- =============================================

-- Career suggestions/recommendations
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
    
    CONSTRAINT fk_cs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_cs_user_id (user_id),
    INDEX idx_cs_viewed (is_viewed),
    INDEX idx_cs_suggested_at (suggested_at)
);

-- Career paths (master data)
CREATE TABLE IF NOT EXISTS career_paths (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    required_skills JSON,
    salary_range VARCHAR(100),
    growth_potential VARCHAR(50),
    education_requirements TEXT,
    experience_requirements TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_cp_category (category),
    INDEX idx_cp_active (is_active)
);

-- =============================================
-- USER ACTIVITY AND TRACKING TABLES
-- =============================================

-- User activities
CREATE TABLE IF NOT EXISTS user_activities (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    activity_type VARCHAR(50) NOT NULL, -- 'resume_upload', 'skills_assessment', 'login', 'profile_update', 'career_suggestion_viewed', etc.
    activity_data JSON, -- Store additional data about the activity
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_ua_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_ua_user_id (user_id),
    INDEX idx_ua_type (activity_type),
    INDEX idx_ua_created_at (created_at)
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
    
    CONSTRAINT fk_upc_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_upc_user_id (user_id),
    INDEX idx_upc_completion (completion_percentage)
);

-- User sessions
CREATE TABLE IF NOT EXISTS user_sessions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    
    CONSTRAINT fk_us_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_us_user_id (user_id),
    INDEX idx_us_active (is_active),
    INDEX idx_us_token (session_token),
    INDEX idx_us_last_activity (last_activity)
);

-- =============================================
-- ADMIN AND ANALYTICS TABLES
-- =============================================

-- System analytics
CREATE TABLE IF NOT EXISTS system_analytics (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    metric_name VARCHAR(100) NOT NULL,
    metric_value BIGINT NOT NULL,
    metric_date DATE NOT NULL,
    additional_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_sa_date (metric_date),
    INDEX idx_sa_name (metric_name)
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'in_progress', 'resolved', 'closed') DEFAULT 'new',
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_cs_status (status),
    INDEX idx_cs_created_at (created_at)
);

-- =============================================
-- NOTIFICATION AND COMMUNICATION TABLES
-- =============================================

-- User notifications
CREATE TABLE IF NOT EXISTS user_notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_un_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_un_user_id (user_id),
    INDEX idx_un_read (is_read),
    INDEX idx_un_created_at (created_at)
);

-- =============================================
-- INSERT SAMPLE DATA
-- =============================================

-- Insert sample skills questions
INSERT INTO skills_questions (category, question, question_type, options, scale_description, weight) VALUES
('Technical', 'How would you rate your proficiency in JavaScript?', 'scale', NULL, 'Beginner to Expert (1-5)', 1.0),
('Technical', 'Which programming languages are you most comfortable with?', 'multiple', '["JavaScript", "Python", "Java", "C++", "React", "Angular", "Vue.js", "Node.js"]', NULL, 1.0),
('Technical', 'How experienced are you with cloud platforms?', 'scale', NULL, 'No experience to Expert (1-5)', 1.0),
('Technical', 'Which database technologies have you worked with?', 'multiple', '["MySQL", "PostgreSQL", "MongoDB", "Redis", "Oracle", "SQLite", "Cassandra", "DynamoDB"]', NULL, 1.0),
('Technical', 'Rate your experience with version control systems (Git)', 'scale', NULL, 'Beginner to Expert (1-5)', 1.0),
('Leadership', 'How comfortable are you leading a team?', 'scale', NULL, 'Not comfortable to Very comfortable (1-5)', 1.0),
('Leadership', 'Have you mentored junior developers or colleagues?', 'choice', '["Never", "Occasionally", "Regularly", "It\'s a major part of my role"]', NULL, 1.0),
('Communication', 'How would you rate your presentation skills?', 'scale', NULL, 'Poor to Excellent (1-5)', 1.0),
('Communication', 'How comfortable are you with technical writing?', 'scale', NULL, 'Not comfortable to Very comfortable (1-5)', 1.0),
('Problem Solving', 'When faced with a complex problem, what\'s your approach?', 'choice', '["Break it down into smaller parts", "Research similar solutions online", "Ask for help from colleagues", "Try different approaches until one works"]', NULL, 1.0),
('Problem Solving', 'How do you handle debugging complex issues?', 'choice', '["Systematic step-by-step approach", "Use debugging tools and logs", "Discuss with team members", "Take breaks and come back with fresh perspective"]', NULL, 1.0),
('Technical', 'Rate your knowledge of software architecture patterns', 'scale', NULL, 'Beginner to Expert (1-5)', 1.0),
('Technical', 'Which development methodologies have you used?', 'multiple', '["Agile", "Scrum", "Waterfall", "Kanban", "DevOps", "CI/CD", "TDD", "BDD"]', NULL, 1.0),
('Adaptability', 'How quickly do you adapt to new technologies?', 'scale', NULL, 'Very slowly to Very quickly (1-5)', 1.0),
('Adaptability', 'How do you stay updated with industry trends?', 'choice', '["Regular reading of tech blogs and articles", "Attending conferences and meetups", "Online courses and certifications", "Networking with other professionals"]', NULL, 1.0);

-- Insert sample career paths
INSERT INTO career_paths (title, description, category, required_skills, salary_range, growth_potential, education_requirements, experience_requirements) VALUES
('Senior Frontend Developer', 'Lead frontend development projects using React and modern JavaScript', 'Software Development', '["JavaScript", "React", "TypeScript", "CSS", "HTML", "Git"]', '$80,000 - $120,000', 'High', 'Bachelor\'s in Computer Science or related field', '3+ years frontend development experience'),
('Full Stack Developer', 'Develop both frontend and backend applications', 'Software Development', '["JavaScript", "Node.js", "React", "Database", "API Development", "Git"]', '$70,000 - $110,000', 'High', 'Bachelor\'s in Computer Science or related field', '2+ years full-stack development experience'),
('Software Engineer', 'Design and develop software applications', 'Software Development', '["Programming Languages", "Data Structures", "Algorithms", "Software Design", "Testing"]', '$60,000 - $100,000', 'High', 'Bachelor\'s in Computer Science or related field', '1+ years software development experience'),
('Technical Lead', 'Lead technical teams and architecture decisions', 'Leadership', '["Technical Leadership", "System Design", "Team Management", "Mentoring", "Project Management"]', '$100,000 - $150,000', 'High', 'Bachelor\'s in Computer Science or related field', '5+ years development experience with leadership roles'),
('Solutions Architect', 'Design scalable system architectures', 'Architecture', '["System Design", "Cloud Platforms", "Microservices", "Scalability", "Security"]', '$120,000 - $180,000', 'High', 'Bachelor\'s in Computer Science or related field', '7+ years software development experience'),
('Data Scientist', 'Analyze data and build machine learning models', 'Data Science', '["Python", "Machine Learning", "Statistics", "Data Analysis", "SQL"]', '$90,000 - $140,000', 'Very High', 'Master\'s in Data Science or related field', '2+ years data science experience'),
('DevOps Engineer', 'Manage infrastructure and deployment pipelines', 'DevOps', '["Cloud Platforms", "CI/CD", "Docker", "Kubernetes", "Monitoring"]', '$85,000 - $130,000', 'High', 'Bachelor\'s in Computer Science or related field', '3+ years DevOps experience'),
('Product Manager', 'Lead product development and strategy', 'Product Management', '["Product Strategy", "User Research", "Agile", "Data Analysis", "Communication"]', '$95,000 - $145,000', 'High', 'Bachelor\'s degree', '3+ years product management experience');

-- Insert initial system analytics
INSERT INTO system_analytics (metric_name, metric_value, metric_date) VALUES
('total_users', 0, CURDATE()),
('active_users_today', 0, CURDATE()),
('resumes_uploaded_today', 0, CURDATE()),
('skills_assessments_today', 0, CURDATE()),
('new_registrations_today', 0, CURDATE()),
('career_suggestions_generated_today', 0, CURDATE()),
('contact_submissions_today', 0, CURDATE());

-- =============================================
-- CREATE VIEWS FOR COMMON QUERIES
-- =============================================

-- User profile completion view
CREATE VIEW user_profile_summary AS
SELECT 
    u.id,
    u.name,
    u.email,
    u.role,
    u.created_at,
    upc.completion_percentage,
    upc.has_resume,
    upc.has_skills_assessment,
    upc.has_career_preferences,
    upc.has_education_info,
    COUNT(DISTINCT r.id) as resume_count,
    COUNT(DISTINCT sa.id) as assessment_count,
    COUNT(DISTINCT cs.id) as suggestion_count
FROM users u
LEFT JOIN user_profile_completion upc ON u.id = upc.user_id
LEFT JOIN resume r ON u.id = r.user_id
LEFT JOIN skills_assessments sa ON u.id = sa.user_id
LEFT JOIN career_suggestions cs ON u.id = cs.user_id
GROUP BY u.id, upc.completion_percentage, upc.has_resume, upc.has_skills_assessment, upc.has_career_preferences, upc.has_education_info;

-- Recent user activities view
CREATE VIEW recent_activities AS
SELECT 
    ua.id,
    ua.user_id,
    u.name as user_name,
    ua.activity_type,
    ua.activity_data,
    ua.created_at
FROM user_activities ua
JOIN users u ON ua.user_id = u.id
ORDER BY ua.created_at DESC;

-- =============================================
-- STORED PROCEDURES
-- =============================================

DELIMITER //

-- Procedure to update user profile completion
CREATE PROCEDURE UpdateUserProfileCompletion(IN p_user_id BIGINT)
BEGIN
    DECLARE v_has_resume BOOLEAN DEFAULT FALSE;
    DECLARE v_has_skills_assessment BOOLEAN DEFAULT FALSE;
    DECLARE v_has_career_preferences BOOLEAN DEFAULT FALSE;
    DECLARE v_has_education_info BOOLEAN DEFAULT FALSE;
    DECLARE v_completion_percentage INT DEFAULT 0;
    
    -- Check if user has resume
    SELECT COUNT(*) > 0 INTO v_has_resume FROM resume WHERE user_id = p_user_id;
    
    -- Check if user has skills assessment
    SELECT COUNT(*) > 0 INTO v_has_skills_assessment FROM skills_assessments WHERE user_id = p_user_id;
    
    -- Check if user has career preferences (has viewed suggestions)
    SELECT COUNT(*) > 0 INTO v_has_career_preferences FROM career_suggestions WHERE user_id = p_user_id AND is_viewed = TRUE;
    
    -- Check if user has education info (has bio or education in resume)
    SELECT COUNT(*) > 0 INTO v_has_education_info FROM users u 
    LEFT JOIN resume r ON u.id = r.user_id 
    WHERE u.id = p_user_id AND (u.bio IS NOT NULL AND u.bio != '' OR r.education IS NOT NULL AND r.education != '');
    
    -- Calculate completion percentage
    SET v_completion_percentage = (
        (CASE WHEN v_has_resume THEN 1 ELSE 0 END) +
        (CASE WHEN v_has_skills_assessment THEN 1 ELSE 0 END) +
        (CASE WHEN v_has_career_preferences THEN 1 ELSE 0 END) +
        (CASE WHEN v_has_education_info THEN 1 ELSE 0 END)
    ) * 25;
    
    -- Insert or update profile completion
    INSERT INTO user_profile_completion (user_id, has_resume, has_skills_assessment, has_career_preferences, has_education_info, completion_percentage)
    VALUES (p_user_id, v_has_resume, v_has_skills_assessment, v_has_career_preferences, v_has_education_info, v_completion_percentage)
    ON DUPLICATE KEY UPDATE
        has_resume = v_has_resume,
        has_skills_assessment = v_has_skills_assessment,
        has_career_preferences = v_has_career_preferences,
        has_education_info = v_has_education_info,
        completion_percentage = v_completion_percentage,
        updated_at = CURRENT_TIMESTAMP;
END //

-- Procedure to clean up expired sessions
CREATE PROCEDURE CleanupExpiredSessions()
BEGIN
    -- Deactivate sessions older than 24 hours with no activity
    UPDATE user_sessions 
    SET is_active = FALSE 
    WHERE last_activity < DATE_SUB(NOW(), INTERVAL 24 HOUR) AND is_active = TRUE;
    
    -- Delete sessions older than 7 days
    DELETE FROM user_sessions 
    WHERE last_activity < DATE_SUB(NOW(), INTERVAL 7 DAY);
    
    -- Delete expired password reset tokens
    DELETE FROM password_reset_tokens 
    WHERE expires_at < NOW();
END //

DELIMITER ;

-- =============================================
-- TRIGGERS
-- =============================================

-- Trigger to update profile completion when resume is uploaded
DELIMITER //
CREATE TRIGGER tr_resume_uploaded
AFTER INSERT ON resume
FOR EACH ROW
BEGIN
    CALL UpdateUserProfileCompletion(NEW.user_id);
END //

-- Trigger to update profile completion when skills assessment is completed
CREATE TRIGGER tr_skills_assessment_completed
AFTER INSERT ON skills_assessments
FOR EACH ROW
BEGIN
    CALL UpdateUserProfileCompletion(NEW.user_id);
END //

-- Trigger to update profile completion when career suggestion is viewed
CREATE TRIGGER tr_career_suggestion_viewed
AFTER UPDATE ON career_suggestions
FOR EACH ROW
BEGIN
    IF NEW.is_viewed = TRUE AND OLD.is_viewed = FALSE THEN
        CALL UpdateUserProfileCompletion(NEW.user_id);
    END IF;
END //

DELIMITER ;

-- =============================================
-- GRANT PERMISSIONS (Adjust as needed for your environment)
-- =============================================

-- Create application user (adjust username and password)
-- CREATE USER 'career_app'@'localhost' IDENTIFIED BY 'secure_password';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON career_db.* TO 'career_app'@'localhost';
-- FLUSH PRIVILEGES;

-- =============================================
-- FINAL NOTES
-- =============================================

/*
This schema provides:

1. Complete user management with authentication
2. Resume upload and analysis capabilities
3. Skills assessment system with dynamic questions
4. Career recommendation engine
5. User activity tracking
6. Admin dashboard analytics
7. Contact form management
8. Notification system
9. Profile completion tracking
10. Session management

Key features:
- Proper indexing for performance
- Foreign key constraints for data integrity
- JSON columns for flexible data storage
- Views for common queries
- Stored procedures for complex operations
- Triggers for automatic updates
- Sample data for testing

To use this schema:
1. Run this script to create the database and tables
2. Update the application.properties with the correct database connection
3. The application will automatically create the necessary relationships
4. Use the sample data for testing

For production:
1. Change the application user credentials
2. Adjust the database permissions as needed
3. Consider adding additional indexes based on query patterns
4. Set up regular cleanup of expired sessions and tokens
*/
