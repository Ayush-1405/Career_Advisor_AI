package com.advisor.repository;

import com.advisor.entity.UserProfileCompletion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserProfileCompletionRepository extends JpaRepository<UserProfileCompletion, Long> {
    
    Optional<UserProfileCompletion> findByUserId(Long userId);
    
    @Query("SELECT COUNT(upc) FROM UserProfileCompletion upc WHERE upc.hasResume = true")
    Long countUsersWithResume();
    
    @Query("SELECT COUNT(upc) FROM UserProfileCompletion upc WHERE upc.hasSkillsAssessment = true")
    Long countUsersWithSkillsAssessment();
    
    @Query("SELECT AVG(upc.completionPercentage) FROM UserProfileCompletion upc")
    Double getAverageCompletionPercentage();
    
    @Query("SELECT COUNT(upc) FROM UserProfileCompletion upc WHERE upc.completionPercentage >= :percentage")
    Long countUsersWithCompletionPercentageGreaterThan(@Param("percentage") Integer percentage);
}
