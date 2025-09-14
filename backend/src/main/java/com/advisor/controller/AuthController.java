package com.advisor.controller;

import com.advisor.dto.*;
import com.advisor.entity.*;
import com.advisor.repository.*;
import com.advisor.security.*;
import com.advisor.service.PasswordResetService;
import com.advisor.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtUtil jwtUtil;
  private final PasswordResetService passwordResetService;
  private final DashboardService dashboardService;

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody @jakarta.validation.Valid RegisterRequest req) {
    if (userRepository.existsByEmail(req.getEmail())) {
      return ResponseEntity.badRequest().body("Email already registered");
    }
    User u = new User();
    u.setName(req.getName());
    u.setEmail(req.getEmail());
    u.setPassword(passwordEncoder.encode(req.getPassword()));
    u.setRole(Role.USER);
    userRepository.save(u);
    
    // Track user registration activity
    dashboardService.trackUserActivity(u.getId(), "user_registration", 
        "{\"email\":\"" + req.getEmail() + "\",\"name\":\"" + req.getName() + "\"}");
    
    return ResponseEntity.ok("Registered");
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@RequestBody @jakarta.validation.Valid LoginRequest req) {
    Authentication auth = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
    );
    User u = userRepository.findByEmail(req.getEmail()).orElseThrow();
    String token = jwtUtil.generateToken(
        u.getEmail(),
        Map.of("role", "ROLE_" + u.getRole().name(), "name", u.getName())
    );
    
    // Track login activity
    dashboardService.trackUserActivity(u.getId(), "login", 
        "{\"email\":\"" + req.getEmail() + "\",\"timestamp\":\"" + java.time.LocalDateTime.now() + "\"}");
    
    return ResponseEntity.ok(new AuthResponse(token, u.getRole().name(), u.getEmail(), u.getName()));
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<?> forgotPassword(@RequestParam String email, @RequestParam String redirectBaseUrl) {
    passwordResetService.sendResetEmail(email, redirectBaseUrl);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/reset-password/validate")
  public ResponseEntity<?> validateResetToken(@RequestParam String token, @RequestParam String email) {
    boolean ok = passwordResetService.validateToken(token, email);
    return ok ? ResponseEntity.ok().build() : ResponseEntity.badRequest().body("Invalid token");
  }

  @PostMapping("/reset-password")
  public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String email, @RequestParam String newPassword) {
    boolean ok = passwordResetService.resetPassword(token, email, newPassword);
    return ok ? ResponseEntity.ok().build() : ResponseEntity.badRequest().body("Invalid token or expired");
  }
}