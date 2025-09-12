package com.advisor.repository;

import com.advisor.entity.ResumeAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeAnalysisRepository extends JpaRepository<ResumeAnalysis, Long> {
  List<ResumeAnalysis> findByUser_Id(Long userId);
}



