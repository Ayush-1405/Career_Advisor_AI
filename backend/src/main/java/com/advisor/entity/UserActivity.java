package com.advisor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_activities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserActivity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "activity_type", nullable = false, length = 50)
    private String activityType;
    
    @Column(name = "activity_data", columnDefinition = "JSON")
    private String activityData;
    
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Constructor for easy creation
    public UserActivity(Long userId, String activityType, String activityData) {
        this.userId = userId;
        this.activityType = activityType;
        this.activityData = activityData;
    }
}
