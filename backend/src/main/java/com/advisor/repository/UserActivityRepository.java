package com.advisor.repository;

import com.advisor.entity.UserActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserActivityRepository extends JpaRepository<UserActivity, Long> {
    
    List<UserActivity> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<UserActivity> findByUserIdAndActivityTypeOrderByCreatedAtDesc(Long userId, String activityType);
    
    @Query("SELECT ua FROM UserActivity ua WHERE ua.userId = :userId AND ua.createdAt >= :since ORDER BY ua.createdAt DESC")
    List<UserActivity> findRecentActivitiesByUserId(@Param("userId") Long userId, @Param("since") LocalDateTime since);
    
    @Query("SELECT COUNT(ua) FROM UserActivity ua WHERE ua.activityType = :activityType AND ua.createdAt >= :since")
    Long countActivitiesByTypeSince(@Param("activityType") String activityType, @Param("since") LocalDateTime since);
    
    @Query("SELECT ua.activityType, COUNT(ua) FROM UserActivity ua WHERE ua.createdAt >= :since GROUP BY ua.activityType")
    List<Object[]> getActivityCountsByType(@Param("since") LocalDateTime since);
}
