package com.advisor.repository;

import com.advisor.entity.SkillsAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SkillsAssessmentRepository extends JpaRepository<SkillsAssessment, Long> {
    
    List<SkillsAssessment> findByUserIdOrderByCompletedAtDesc(Long userId);
    
    Optional<SkillsAssessment> findTopByUserIdAndAssessmentTypeOrderByCompletedAtDesc(Long userId, String assessmentType);
    
    @Query("SELECT sa FROM SkillsAssessment sa WHERE sa.userId = :userId AND sa.completedAt >= :since ORDER BY sa.completedAt DESC")
    List<SkillsAssessment> findRecentAssessmentsByUserId(@Param("userId") Long userId, @Param("since") LocalDateTime since);
    
    @Query("SELECT COUNT(sa) FROM SkillsAssessment sa WHERE sa.assessmentType = :assessmentType AND sa.completedAt >= :since")
    Long countAssessmentsByTypeSince(@Param("assessmentType") String assessmentType, @Param("since") LocalDateTime since);
    
    @Query("SELECT AVG(sa.score) FROM SkillsAssessment sa WHERE sa.userId = :userId AND sa.assessmentType = :assessmentType")
    Double getAverageScoreByUserIdAndType(@Param("userId") Long userId, @Param("assessmentType") String assessmentType);
}
