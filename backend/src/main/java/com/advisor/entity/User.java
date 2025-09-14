// entity/User.java
package com.advisor.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name="users")
public class User {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable=false)
  private String name;

  @Column(unique = true, nullable=false)
  private String email;

  @Column(nullable=false)
  private String password; // will be BCrypt hashed

  @Enumerated(EnumType.STRING)
  @Column(nullable=false)
  private Role role = Role.USER;

  @Column(name = "phone_number")
  private String phoneNumber;

  @Column(name = "profile_picture_url")
  private String profilePictureUrl;

  @Column(name = "bio", length = 1000)
  private String bio;

  @Column(name = "location")
  private String location;

  @Column(name = "linkedin_url")
  private String linkedinUrl;

  @Column(name = "github_url")
  private String githubUrl;

  @Column(name = "website_url")
  private String websiteUrl;

  @Column(name = "is_active")
  private Boolean isActive = true;

  @Column(name = "email_verified")
  private Boolean emailVerified = false;

  @Column(name = "last_login")
  private LocalDateTime lastLogin;

  @Column(name = "created_at")
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(name = "updated_at")
  private LocalDateTime updatedAt = LocalDateTime.now();

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Resume> resumes;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<UserActivity> activities;

  @PreUpdate
  public void preUpdate() {
    this.updatedAt = LocalDateTime.now();
  }
}
