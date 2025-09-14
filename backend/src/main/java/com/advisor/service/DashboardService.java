package com.advisor.service;

import com.advisor.dto.DashboardStatsResponse;
import com.advisor.entity.*;
import com.advisor.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DashboardService {
    
    @Autowired
    private UserProfileCompletionRepository profileCompletionRepository;
    
    @Autowired
    private CareerSuggestionRepository careerSuggestionRepository;
    
    @Autowired
    private SkillsAssessmentRepository skillsAssessmentRepository;
    
    @Autowired
    private UserActivityRepository userActivityRepository;
    
    @Autowired
    private ResumeRepository resumeRepository;
    
    public DashboardStatsResponse getUserDashboardStats(Long userId) {
        // Get profile completion data
        Optional<UserProfileCompletion> profileCompletion = profileCompletionRepository.findByUserId(userId);
        boolean hasResume = profileCompletion.map(UserProfileCompletion::getHasResume).orElse(false);
        boolean hasSkillsAssessment = profileCompletion.map(UserProfileCompletion::getHasSkillsAssessment).orElse(false);
        int completionRate = profileCompletion.map(UserProfileCompletion::getCompletionPercentage).orElse(0);
        
        // Count suggestions
        long suggestionsCount = careerSuggestionRepository.countUnviewedSuggestionsByUserId(userId);
        
        // Get recent activities
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusWeeks(1);
        List<UserActivity> recentActivities = userActivityRepository.findRecentActivitiesByUserId(userId, oneWeekAgo);
        
        // Build recent activities for response
        List<DashboardStatsResponse.RecentActivity> recentActivitiesResponse = new ArrayList<>();
        for (UserActivity activity : recentActivities) {
            recentActivitiesResponse.add(mapActivityToResponse(activity));
        }
        
        return new DashboardStatsResponse(
            hasResume,
            (int) suggestionsCount,
            hasSkillsAssessment,
            completionRate,
            recentActivities.size(),
            recentActivities.size(),
            recentActivitiesResponse
        );
    }
    
    public void trackUserActivity(Long userId, String activityType, String activityData) {
        UserActivity activity = new UserActivity(userId, activityType, activityData);
        userActivityRepository.save(activity);
        
        // Update profile completion if needed
        updateProfileCompletion(userId, activityType);
    }
    
    public void updateProfileCompletion(Long userId, String activityType) {
        Optional<UserProfileCompletion> profileCompletion = profileCompletionRepository.findByUserId(userId);
        UserProfileCompletion completion = profileCompletion.orElse(new UserProfileCompletion(userId));
        
        switch (activityType) {
            case "resume_upload":
                completion.setHasResume(true);
                break;
            case "skills_assessment":
                completion.setHasSkillsAssessment(true);
                break;
            case "career_preferences":
                completion.setHasCareerPreferences(true);
                break;
            case "education_update":
                completion.setHasEducationInfo(true);
                break;
        }
        
        completion.calculateCompletionPercentage();
        profileCompletionRepository.save(completion);
    }
    
    private DashboardStatsResponse.RecentActivity mapActivityToResponse(UserActivity activity) {
        String message = getActivityMessage(activity.getActivityType());
        String icon = getActivityIcon(activity.getActivityType());
        String color = getActivityColor(activity.getActivityType());
        String timestamp = activity.getCreatedAt().format(DateTimeFormatter.ofPattern("MMM dd, yyyy 'at' HH:mm"));
        
        return new DashboardStatsResponse.RecentActivity(
            activity.getActivityType(),
            message,
            timestamp,
            icon,
            color
        );
    }
    
    private String getActivityMessage(String activityType) {
        switch (activityType) {
            case "resume_upload":
                return "Resume uploaded successfully";
            case "skills_assessment":
                return "Skills assessment completed";
            case "login":
                return "Logged in successfully";
            case "profile_update":
                return "Profile updated";
            case "career_suggestion_viewed":
                return "Viewed career suggestions";
            default:
                return "Activity completed";
        }
    }
    
    private String getActivityIcon(String activityType) {
        switch (activityType) {
            case "resume_upload":
                return "ri-file-text-line";
            case "skills_assessment":
                return "ri-brain-line";
            case "login":
                return "ri-login-box-line";
            case "profile_update":
                return "ri-user-settings-line";
            case "career_suggestion_viewed":
                return "ri-lightbulb-line";
            default:
                return "ri-check-line";
        }
    }
    
    private String getActivityColor(String activityType) {
        switch (activityType) {
            case "resume_upload":
                return "text-green-600";
            case "skills_assessment":
                return "text-purple-600";
            case "login":
                return "text-blue-600";
            case "profile_update":
                return "text-orange-600";
            case "career_suggestion_viewed":
                return "text-yellow-600";
            default:
                return "text-gray-600";
        }
    }
}
