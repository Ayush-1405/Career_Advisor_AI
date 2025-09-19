package com.advisor.service;

import com.advisor.entity.PasswordResetToken;
import com.advisor.entity.User;
import com.advisor.repository.PasswordResetTokenRepository;
import com.advisor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService {
  private static final Duration TOKEN_TTL = Duration.ofMinutes(30);

  private final PasswordResetTokenRepository tokenRepository;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final EmailService emailService;

  public void sendResetEmail(String email, String baseResetUrl) {
    Optional<User> userOpt = userRepository.findByEmail(email);
    if (userOpt.isEmpty()) {
      return; // do not reveal if email exists
    }
    User user = userOpt.get();

    // Invalidate previous tokens
    tokenRepository.deleteByUser_Id(user.getId());

    String token = UUID.randomUUID().toString().replace("-", "");
    PasswordResetToken prt = new PasswordResetToken();
    prt.setToken(token);
    prt.setUser(user);
    prt.setExpiresAt(Instant.now().plus(TOKEN_TTL));
    tokenRepository.save(prt);

    String link = baseResetUrl + "?token=" + token + "&email=" + user.getEmail();
    String body = "Hi " + user.getName() + ",\n\n" +
        "We received a request to reset your password. If you made this request, click the link below to reset it.\n\n" +
        link + "\n\n" +
        "If you didn't request a password reset, you can ignore this email.";

    emailService.sendPlainText(user.getEmail(), "Password Reset", body);
  }

  public boolean validateToken(String token, String email) {
    Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
    if (tokenOpt.isEmpty()) return false;
    PasswordResetToken prt = tokenOpt.get();
    return !prt.isUsed() && prt.getUser().getEmail().equalsIgnoreCase(email) && prt.getExpiresAt().isAfter(Instant.now());
  }

  public boolean resetPassword(String token, String email, String newPassword) {
    Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
    if (tokenOpt.isEmpty()) return false;
    PasswordResetToken prt = tokenOpt.get();
    if (prt.isUsed() || !prt.getUser().getEmail().equalsIgnoreCase(email) || prt.getExpiresAt().isBefore(Instant.now())) {
      return false;
    }
    User user = prt.getUser();
    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);

    prt.setUsed(true);
    tokenRepository.save(prt);
    return true;
  }
}











