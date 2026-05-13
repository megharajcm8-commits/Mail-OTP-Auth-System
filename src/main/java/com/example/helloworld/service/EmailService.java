package com.example.helloworld.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtp(String toEmail, String otp) {

        try {
            System.out.println("📤 Sending OTP to: " + toEmail);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("🔐 Password Reset OTP");
            message.setText("Your OTP is: " + otp);

            mailSender.send(message);

            System.out.println("✅ Email sent successfully");

        } catch (Exception e) {
            System.out.println("❌ Failed to send email");
            e.printStackTrace(); // VERY IMPORTANT for debugging
        }
    }
}