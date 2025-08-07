<<<<<<< HEAD
package com.advisor.controller;

import com.advisor.dto.AuthRequest;
import com.advisor.dto.AuthResponse;
import com.advisor.dto.RegisterRequest;
import com.advisor.entity.UserEntity;
import com.advisor.enums.Role;
import com.advisor.repository.UserRepository;
import com.advisor.security.JwtService;
import com.advisor.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository = null;
    private final JwtService jwtService = null;
    private final EmailService emailService = null;
    private final AuthenticationManager authenticationManager = null;
    private final UserDetailsServiceImpl userDetailsService = null;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        // Generate OTP
        String otp = String.format("%06d", new Random().nextInt(1000000));


        UserEntity user = new UserEntity();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // password should be encoded in service layer
        user.setOtp(otp);
        user.setVerified(false);
        user.setRole(Role.USER);

        userRepository.save(user);

        // Send OTP via email
        emailService.sendOtpEmail(user.getEmail(), otp);

        return ResponseEntity.ok("User registered successfully. Please verify OTP sent to your email.");
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        Optional<UserEntity> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        UserEntity user = optionalUser.get();
        if (user.getOtp().equals(otp)) {
            user.setVerified(true);
            user.setOtp(null); // Clear OTP
            userRepository.save(user);
            return ResponseEntity.ok("OTP Verified. You can now login.");
        } else {
            return ResponseEntity.badRequest().body("Invalid OTP.");
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        Optional<UserEntity> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        UserEntity user = optionalUser.get();
        if (!user.isVerified()) {
            return ResponseEntity.badRequest().body("Please verify your email via OTP before login.");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtService.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(token));
    }
}
=======
package com.advisor.controller;

import com.advisor.dto.AuthRequest;
import com.advisor.dto.AuthResponse;
import com.advisor.dto.RegisterRequest;
import com.advisor.entity.UserEntity;
import com.advisor.enums.Role;
import com.advisor.repository.UserRepository;
import com.advisor.security.JwtService;
import com.advisor.service.EmailService;
import com.advisor.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository = null;
    private final JwtService jwtService = null;
    private final EmailService emailService = null;
    private final AuthenticationManager authenticationManager = null;
    private final UserDetailsServiceImpl userDetailsService = null;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        // Generate OTP
        int otp = String.format("%06d", new Random().nextInt(999999));

        UserEntity user = new UserEntity();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // password should be encoded in service layer
        user.setOtp(otp);
        user.setVerified(false);
        user.setRole(Role.USER);

        userRepository.save(user);

        // Send OTP via email
        emailService.sendOtpEmail(user.getEmail(), otp);

        return ResponseEntity.ok("User registered successfully. Please verify OTP sent to your email.");
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        Optional<UserEntity> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        UserEntity user = optionalUser.get();
        if (user.getOtp().equals(otp)) {
            user.setVerified(true);
            user.setOtp(null); // Clear OTP
            userRepository.save(user);
            return ResponseEntity.ok("OTP Verified. You can now login.");
        } else {
            return ResponseEntity.badRequest().body("Invalid OTP.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        Optional<UserEntity> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        UserEntity user = optionalUser.get();
        if (!user.isVerified()) {
            return ResponseEntity.badRequest().body("Please verify your email via OTP before login.");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtService.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(token));
    }
}
>>>>>>> 9c3495dfddaf30f5f49bcae2a62b9d6f7d0a15ca
