package com.advisor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "career_suggestions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CareerSuggestion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "suggestion_title", nullable = false)
    private String suggestionTitle;
    
    @Column(name = "suggestion_description", columnDefinition = "TEXT")
    private String suggestionDescription;
    
    @Column(name = "match_percentage", nullable = false)
    private Integer matchPercentage;
    
    @Column(name = "salary_range", length = 100)
    private String salaryRange;
    
    @Column(name = "growth_potential", length = 50)
    private String growthPotential;
    
    @Column(name = "required_skills", columnDefinition = "JSON")
    private String requiredSkills;
    
    @Column(name = "suggested_at")
    private LocalDateTime suggestedAt;
    
    @Column(name = "is_viewed")
    private Boolean isViewed = false;
    
    // Constructor for easy creation
    public CareerSuggestion(Long userId, String suggestionTitle, String suggestionDescription, 
                           Integer matchPercentage, String salaryRange, String growthPotential) {
        this.userId = userId;
        this.suggestionTitle = suggestionTitle;
        this.suggestionDescription = suggestionDescription;
        this.matchPercentage = matchPercentage;
        this.salaryRange = salaryRange;
        this.growthPotential = growthPotential;
        this.suggestedAt = LocalDateTime.now();
        this.isViewed = false;
    }
}
