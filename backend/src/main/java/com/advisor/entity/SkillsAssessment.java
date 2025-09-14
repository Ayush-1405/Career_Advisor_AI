package com.advisor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "skills_assessments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkillsAssessment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "assessment_type", nullable = false, length = 50)
    private String assessmentType;
    
    @Column(name = "score", nullable = false)
    private Integer score;
    
    @Column(name = "max_score", nullable = false)
    private Integer maxScore;
    
    @Column(name = "answers", columnDefinition = "JSON")
    private String answers;
    
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
    
    // Constructor for easy creation
    public SkillsAssessment(Long userId, String assessmentType, Integer score, Integer maxScore, String answers) {
        this.userId = userId;
        this.assessmentType = assessmentType;
        this.score = score;
        this.maxScore = maxScore;
        this.answers = answers;
        this.completedAt = LocalDateTime.now();
    }
}
