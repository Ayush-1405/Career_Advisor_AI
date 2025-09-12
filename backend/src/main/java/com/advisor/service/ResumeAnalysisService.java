package com.advisor.service;

import com.advisor.entity.*;
import com.advisor.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeAnalysisService {
  private final ResumeRepository resumeRepository;
  private final ResumeAnalysisRepository analysisRepository;

  public ResumeAnalysis analyzeAndSave(Resume resume, User user) {
    // basic heuristic example
    int score = 70;
    if (resume.getSkills() != null) {
      List<String> skills = Arrays.asList(resume.getSkills().split(","));
      if (skills.stream().anyMatch(s -> s.trim().equalsIgnoreCase("react"))) score += 5;
      if (skills.stream().anyMatch(s -> s.trim().equalsIgnoreCase("java"))) score += 5;
      if (skills.stream().anyMatch(s -> s.trim().equalsIgnoreCase("aws"))) score += 5;
    }

    Resume saved = resumeRepository.save(resume);

    ResumeAnalysis ra = new ResumeAnalysis();
    ra.setUser(user);
    ra.setResume(saved);
    ra.setOverallScore(score);
    ra.setStrengths("Strong technical foundation,Problem-solving,Communication");
    ra.setImprovements("Leadership,Cloud,System design");
    return analysisRepository.save(ra);
  }
}



