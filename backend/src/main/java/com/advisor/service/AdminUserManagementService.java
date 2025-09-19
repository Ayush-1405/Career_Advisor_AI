package com.advisor.service;

import com.advisor.dto.*;
import com.advisor.entity.*;
import com.advisor.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminUserManagementService {

    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final ResumeAnalysisRepository resumeAnalysisRepository;
    private final UserActivityRepository userActivityRepository;

    public Page<UserProfileDto> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(this::convertToUserProfileDto);
    }

    public UserProfileDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToUserProfileDto(user);
    }

    @Transactional
    public UserProfileDto updateUserProfile(Long userId, UpdateUserProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if email is being changed and if it's already taken
        if (!user.getEmail().equals(request.getEmail()) && 
            userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setBio(request.getBio());
        user.setLocation(request.getLocation());
        user.setLinkedinUrl(request.getLinkedinUrl());
        user.setGithubUrl(request.getGithubUrl());
        user.setWebsiteUrl(request.getWebsiteUrl());
        user.setUpdatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);
        return convertToUserProfileDto(savedUser);
    }

    @Transactional
    public UserProfileDto updateUserRoleAndStatus(AdminUserManagementRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }
        if (request.getIsActive() != null) {
            user.setIsActive(request.getIsActive());
        }
        if (request.getEmailVerified() != null) {
            user.setEmailVerified(request.getEmailVerified());
        }
        user.setUpdatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);
        return convertToUserProfileDto(savedUser);
    }

    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Soft delete by setting isActive to false
        user.setIsActive(false);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    public AdminReportResponse generateAdminReport() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfMonth = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);

        Long totalUsers = userRepository.count();
        Long activeUsers = userRepository.countByIsActiveTrue();
        Long newUsersThisMonth = userRepository.countByCreatedAtAfter(startOfMonth);
        Long totalResumes = resumeRepository.count();
        Long totalAnalyses = resumeAnalysisRepository.count();

        // Calculate average resume score
        List<ResumeAnalysis> analyses = resumeAnalysisRepository.findAll();
        Double averageResumeScore = analyses.stream()
                .mapToDouble(ResumeAnalysis::getOverallScore)
                .average()
                .orElse(0.0);

        // Get user activities
        List<UserActivity> activities = userActivityRepository.findAll();
        List<AdminReportResponse.UserActivityReport> userActivityReports = activities.stream()
                .map(activity -> new AdminReportResponse.UserActivityReport(
                        activity.getUser().getId(),
                        activity.getUser().getName(),
                        activity.getUser().getEmail(),
                        activity.getActivityType(),
                        activity.getActivityData(),
                        activity.getTimestamp()
                ))
                .collect(Collectors.toList());

        // Get resume analyses
        List<AdminReportResponse.ResumeAnalysisReport> resumeAnalysisReports = analyses.stream()
                .map(analysis -> new AdminReportResponse.ResumeAnalysisReport(
                        analysis.getId(),
                        analysis.getResume().getUser().getId(),
                        analysis.getResume().getUser().getName(),
                        analysis.getResume().getFileName(),
                        analysis.getOverallScore(),
                        analysis.getStrengths(),
                        analysis.getWeaknesses(),
                        analysis.getAnalyzedAt()
                ))
                .collect(Collectors.toList());

        // Get user registrations by month
        Map<String, Long> userRegistrationsByMonth = userRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        user -> user.getCreatedAt().getYear() + "-" + 
                               String.format("%02d", user.getCreatedAt().getMonthValue()),
                        Collectors.counting()
                ));

        // Get role distribution
        Map<String, Long> roleDistribution = userRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        user -> user.getRole().name(),
                        Collectors.counting()
                ));

        return new AdminReportResponse(
                totalUsers,
                activeUsers,
                newUsersThisMonth,
                totalResumes,
                totalAnalyses,
                averageResumeScore,
                userActivityReports,
                resumeAnalysisReports,
                userRegistrationsByMonth,
                roleDistribution,
                now
        );
    }

    private UserProfileDto convertToUserProfileDto(User user) {
        return new UserProfileDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getProfilePictureUrl(),
                user.getBio(),
                user.getLocation(),
                user.getLinkedinUrl(),
                user.getGithubUrl(),
                user.getWebsiteUrl(),
                user.getIsActive(),
                user.getEmailVerified(),
                user.getLastLogin(),
                user.getCreatedAt(),
                user.getUpdatedAt(),
                user.getRole().name()
        );
    }
}


