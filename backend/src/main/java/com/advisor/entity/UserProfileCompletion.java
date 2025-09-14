package com.advisor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_profile_completion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileCompletion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;
    
    @Column(name = "has_resume")
    private Boolean hasResume = false;
    
    @Column(name = "has_skills_assessment")
    private Boolean hasSkillsAssessment = false;
    
    @Column(name = "has_career_preferences")
    private Boolean hasCareerPreferences = false;
    
    @Column(name = "has_education_info")
    private Boolean hasEducationInfo = false;
    
    @Column(name = "completion_percentage")
    private Integer completionPercentage = 0;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructor for easy creation
    public UserProfileCompletion(Long userId) {
        this.userId = userId;
        this.hasResume = false;
        this.hasSkillsAssessment = false;
        this.hasCareerPreferences = false;
        this.hasEducationInfo = false;
        this.completionPercentage = 0;
    }
    
    // Method to calculate completion percentage
    public void calculateCompletionPercentage() {
        int completed = 0;
        int total = 4;
        
        if (hasResume) completed++;
        if (hasSkillsAssessment) completed++;
        if (hasCareerPreferences) completed++;
        if (hasEducationInfo) completed++;
        
        this.completionPercentage = (completed * 100) / total;
    }
}
