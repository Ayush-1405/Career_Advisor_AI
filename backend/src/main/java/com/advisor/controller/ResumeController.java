package com.advisor.controller;

import com.advisor.entity.*;
import com.advisor.repository.*;
import com.advisor.service.ResumeAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@RequiredArgsConstructor
public class ResumeController {

  private final ResumeRepository resumeRepository;
  private final UserRepository userRepository;
  private final ResumeAnalysisService analysisService;

  @PostMapping
  public ResumeAnalysis add(@RequestBody Resume resume, Authentication auth) {
    User u = userRepository.findByEmail(auth.getName()).orElseThrow();
    resume.setUser(u);
    return analysisService.analyzeAndSave(resume, u);
  }

  @GetMapping("/me")
  public List<Resume> myResumes(Authentication auth) {
    User u = userRepository.findByEmail(auth.getName()).orElseThrow();
    return resumeRepository.findByUser_Id(u.getId());
  }
}