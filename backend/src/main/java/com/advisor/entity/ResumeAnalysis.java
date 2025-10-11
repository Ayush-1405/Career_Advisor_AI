package com.advisor.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name = "resume_analysis")
public class ResumeAnalysis {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(optional = true)
  @JoinColumn(name = "resume_id")
  private Resume resume;

  @Column(name = "overall_score")
  private Integer overallScore;

  @Column(name = "strengths", columnDefinition = "TEXT")
  private String strengths; // comma-separated list

  @Column(name = "improvements", columnDefinition = "TEXT")
  private String improvements; // comma-separated list
  
  @Column(name = "analysis_data", columnDefinition = "JSON")
  private String analysisData; // Store detailed analysis results
  
  @Column(name = "analyzed_at")
  private java.time.LocalDateTime analyzedAt = java.time.LocalDateTime.now();
  
  // Alias method for compatibility
  public String getWeaknesses() {
    return improvements;
  }
}



