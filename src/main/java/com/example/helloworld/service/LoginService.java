package com.example.helloworld.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class LoginService {

    private Map<String, String> users = new HashMap<>();
    private Map<String, String> otpStore = new HashMap<>();
    private Map<String, String> userRoles = new HashMap<>();

    @Autowired
    private EmailService emailService;

    public boolean validateUser(String username, String password) {
        return users.containsKey(username) && users.get(username).equals(password);
    }

    public String registerUser(String username, String password) {

        if (users.containsKey(username)) {
            return "User already exists";
        }

        users.put(username, password);

        // 🔥 FIRST USER = ADMIN
        if (users.size() == 1) {
            userRoles.put(username, "ADMIN");
            return "Admin Registered Successfully ";
        } else {
            userRoles.put(username, "USER");
            return "User Registered Successfully";
        }
    }

    public boolean isAdmin(String username) {
        return "ADMIN".equals(userRoles.get(username));
    }

    public String generateOtp(String username) {

        if (!users.containsKey(username)) {
            return "User not found";
        }

        String otp = String.valueOf(new Random().nextInt(9000) + 1000);
        otpStore.put(username, otp);

        emailService.sendOtp(username, otp);

        return "OTP sent to your email";
    }

    public String resetPassword(String username, String otp, String newPassword) {

        if (!otpStore.containsKey(username)) {
            return "OTP not generated";
        }

        if (otpStore.get(username).equals(otp)) {
            users.put(username, newPassword);
            otpStore.remove(username);
            return "Password reset successful";
        }

        return "Invalid OTP";
    }

    public String getUserRole(String username) {
        return userRoles.get(username);
    }
}