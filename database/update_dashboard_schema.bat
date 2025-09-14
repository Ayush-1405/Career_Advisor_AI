@echo off
echo Updating database schema for dynamic dashboard...
echo.

echo Step 1: Running dashboard schema updates...
mysql -u root -p < dashboard_schema.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo SUCCESS! Database schema updated successfully.
    echo.
    echo New tables created:
    echo - user_activities
    echo - skills_assessments  
    echo - user_profile_completion
    echo - career_suggestions
    echo - system_analytics
    echo - user_sessions
    echo.
    echo Your dashboard is now ready to use dynamic data!
) else (
    echo.
    echo FAILED! Database update failed.
    echo Please check your MySQL connection and try again.
)

pause
