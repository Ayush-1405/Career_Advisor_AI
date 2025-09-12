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

  private Integer overallScore;

  @Column(length = 2000)
  private String strengths; // comma-separated list

  @Column(length = 2000)
  private String improvements; // comma-separated list
}



