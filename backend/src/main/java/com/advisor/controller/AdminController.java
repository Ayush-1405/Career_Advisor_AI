package com.advisor.controller;

//controller/AdminController.java

import com.advisor.entity.*;
import com.advisor.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
private final UserRepository userRepository;
private final ResumeRepository resumeRepository;
private final ResumeAnalysisRepository resumeAnalysisRepository;

@GetMapping("/users")
public List<User> users() { return userRepository.findAll(); }

@GetMapping("/resumes")
public List<Resume> resumes() { return resumeRepository.findAll(); }

@GetMapping("/analyses")
public List<ResumeAnalysis> analyses() { return resumeAnalysisRepository.findAll(); }
}
