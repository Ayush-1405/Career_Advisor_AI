# Database Setup (MySQL)

## Files
- career_db.sql: Creates the career_db schema and required tables (users, resume, resume_analysis).
- seed.example.sql: Optional sample inserts (adjust emails/passwords or generate real users via API).

## How to import
1. Open MySQL Workbench (or CLI) and connect to your server.
2. Run career_db.sql to create the schema and tables:
   - Workbench: File → Open SQL Script → select career_db.sql → Run.
   - CLI: mysql -u root -p < career_db.sql
3. (Optional) Run seed.example.sql to insert sample users.

## Spring Boot configuration
Ensure backend/src/main/resources/application.properties points to your MySQL server:

spring.datasource.url=jdbc:mysql://localhost:3306/career_db?useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=YOUR_USER
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update

## Migrate existing data
If you already ran the app and tables exist, this script is idempotent and will not drop data.

## Next steps
- Start backend: cd backend && mvnw.cmd spring-boot:run
- Start frontend: cd frontend_v8 && npm run dev
- Register → Login → POST /api/resumes via Analyze page → Generate report from real DB data.









