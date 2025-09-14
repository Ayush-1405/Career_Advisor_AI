package com.advisor.controller;

import com.advisor.dto.*;
import com.advisor.entity.*;
import com.advisor.repository.*;
import com.advisor.service.AdminUserManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final ResumeAnalysisRepository resumeAnalysisRepository;
    private final AdminUserManagementService adminUserManagementService;

    // User Management Endpoints
    @GetMapping("/users")
    public ResponseEntity<Page<UserProfileDto>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UserProfileDto> users = adminUserManagementService.getAllUsers(pageable);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<UserProfileDto> getUserById(@PathVariable Long userId) {
        try {
            UserProfileDto user = adminUserManagementService.getUserById(userId);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<UserProfileDto> updateUserProfile(
            @PathVariable Long userId,
            @RequestBody UpdateUserProfileRequest request) {
        try {
            UserProfileDto updatedUser = adminUserManagementService.updateUserProfile(userId, request);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/users/{userId}/role-status")
    public ResponseEntity<UserProfileDto> updateUserRoleAndStatus(
            @PathVariable Long userId,
            @RequestBody AdminUserManagementRequest request) {
        try {
            request.setUserId(userId);
            UserProfileDto updatedUser = adminUserManagementService.updateUserRoleAndStatus(request);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        try {
            adminUserManagementService.deleteUser(userId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Reports and Analytics
    @GetMapping("/reports/overview")
    public ResponseEntity<AdminReportResponse> getAdminReport() {
        try {
            AdminReportResponse report = adminUserManagementService.generateAdminReport();
            return ResponseEntity.ok(report);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Legacy endpoints for backward compatibility
    @GetMapping("/resumes")
    public List<Resume> resumes() { 
        return resumeRepository.findAll(); 
    }

    @GetMapping("/analyses")
    public List<ResumeAnalysis> analyses() { 
        return resumeAnalysisRepository.findAll(); 
    }

    // Search and filter endpoints
    @GetMapping("/users/search")
    public ResponseEntity<Page<UserProfileDto>> searchUsers(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        // This would need to be implemented in the service with custom query
        Page<UserProfileDto> users = adminUserManagementService.getAllUsers(pageable);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/role/{role}")
    public ResponseEntity<List<UserProfileDto>> getUsersByRole(@PathVariable String role) {
        try {
            List<User> users = userRepository.findByRole(Role.valueOf(role.toUpperCase()));
            List<UserProfileDto> userDtos = users.stream()
                    .map(adminUserManagementService::convertToUserProfileDto)
                    .collect(java.util.stream.Collectors.toList());
            return ResponseEntity.ok(userDtos);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
