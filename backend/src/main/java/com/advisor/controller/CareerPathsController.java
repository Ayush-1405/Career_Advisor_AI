package com.advisor.controller;

import java.util.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/career-paths")
public class CareerPathsController {

    record CareerPath(
        String id,
        String title,
        String description,
        String level,
        String category,
        String image,
        String averageSalary,
        String growth,
        int popularity,
        List<String> requiredSkills,
        List<Map<String, String>> careerProgression
    ) {}

    private static final List<CareerPath> PATHS = List.of(
        new CareerPath(
            "frontend-dev",
            "Frontend Developer",
            "Build rich, accessible UIs with modern frameworks like React.",
            "Mid-Level",
            "Technology",
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400",
            "$70,000 - $110,000",
            "18%",
            87,
            List.of("JavaScript", "React", "HTML", "CSS", "Accessibility"),
            List.of(
                Map.of("level", "Junior", "salary", "$60k-$80k"),
                Map.of("level", "Mid", "salary", "$80k-$110k"),
                Map.of("level", "Senior", "salary", "$110k-$150k")
            )
        ),
        new CareerPath(
            "data-scientist",
            "Data Scientist",
            "Analyze data and build ML models to drive decisions.",
            "Mid-Level",
            "Analytics",
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
            "$90,000 - $140,000",
            "22%",
            81,
            List.of("Python", "Statistics", "Machine Learning", "SQL"),
            List.of(
                Map.of("level", "Junior", "salary", "$80k-$100k"),
                Map.of("level", "Mid", "salary", "$100k-$130k"),
                Map.of("level", "Senior", "salary", "$130k-$170k")
            )
        )
    );

    @GetMapping
    public ResponseEntity<List<CareerPath>> list() {
        return ResponseEntity.ok(PATHS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CareerPath> getById(@PathVariable String id) {
        return PATHS.stream()
            .filter(p -> p.id().equals(id))
            .findFirst()
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}






