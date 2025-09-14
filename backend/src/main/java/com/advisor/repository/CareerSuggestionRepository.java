package com.advisor.repository;

import com.advisor.entity.CareerSuggestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CareerSuggestionRepository extends JpaRepository<CareerSuggestion, Long> {
    
    List<CareerSuggestion> findByUserIdOrderBySuggestedAtDesc(Long userId);
    
    List<CareerSuggestion> findByUserIdAndIsViewedOrderBySuggestedAtDesc(Long userId, Boolean isViewed);
    
    @Query("SELECT cs FROM CareerSuggestion cs WHERE cs.userId = :userId AND cs.suggestedAt >= :since ORDER BY cs.suggestedAt DESC")
    List<CareerSuggestion> findRecentSuggestionsByUserId(@Param("userId") Long userId, @Param("since") LocalDateTime since);
    
    @Query("SELECT COUNT(cs) FROM CareerSuggestion cs WHERE cs.isViewed = false")
    Long countUnviewedSuggestions();
    
    @Query("SELECT COUNT(cs) FROM CareerSuggestion cs WHERE cs.userId = :userId AND cs.isViewed = false")
    Long countUnviewedSuggestionsByUserId(@Param("userId") Long userId);
    
    @Query("SELECT cs.suggestionTitle, COUNT(cs) FROM CareerSuggestion cs GROUP BY cs.suggestionTitle ORDER BY COUNT(cs) DESC")
    List<Object[]> getMostPopularSuggestions();
}
