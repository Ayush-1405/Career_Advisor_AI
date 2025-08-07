<<<<<<< HEAD
package com.advisor.emailservice;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender = null;

    public void sendOtpEmail(String toEmail, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(toEmail);
            helper.setSubject("Your OTP for Account Verification");
            helper.setText("<p>Hello,</p><p>Your OTP for verifying your account is: <b>" + otp + "</b></p><p>Thank you!</p>", true);

            mailSender.send(message);
            System.out.println("OTP email sent successfully to " + toEmail);
        } catch (MessagingException e) {
            System.out.println("Failed to send OTP email: " + e.getMessage());
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
=======
package com.advisor.emailservice;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender = null;

    public void sendOtpEmail(String toEmail, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(toEmail);
            helper.setSubject("Your OTP for Account Verification");
            helper.setText("<p>Hello,</p><p>Your OTP for verifying your account is: <b>" + otp + "</b></p><p>Thank you!</p>", true);

            mailSender.send(message);
            System.out.println("OTP email sent successfully to " + toEmail);
        } catch (MessagingException e) {
            System.out.println("Failed to send OTP email: " + e.getMessage());
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
>>>>>>> 9c3495dfddaf30f5f49bcae2a62b9d6f7d0a15ca
