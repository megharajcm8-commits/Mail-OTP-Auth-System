package com.example.helloworld.controller;

import com.example.helloworld.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // React connection
public class HelloWorldController {

    @Autowired
    private LoginService loginService;

    // =========================
    // ✅ SIGNUP
    // =========================
    @PostMapping("/signup")
    public String signup(@RequestParam String username,
            @RequestParam String password) {

        return loginService.registerUser(username, password);
    }

    // =========================
    // ✅ LOGIN
    // =========================
    @PostMapping("/login")
    public String login(@RequestParam String username,
            @RequestParam String password) {

        boolean isValid = loginService.validateUser(username, password);

        return isValid ? "Login Success" : "Invalid Credentials";
    }

    // =========================
    // 🔥 SEND OTP (EMAIL)
    // =========================
    @PostMapping("/send-otp")
    public String sendOtp(@RequestParam String username) {

        return loginService.generateOtp(username);
    }

    // =========================
    // 🔥 RESET PASSWORD
    // =========================
    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam String username,
            @RequestParam String otp,
            @RequestParam String newPassword) {

        return loginService.resetPassword(username, otp, newPassword);
    }

    // 🔥 ADMIN ONLY API
    @GetMapping("/admin")
    public String adminAccess(@RequestParam String username) {

        if (loginService.isAdmin(username)) {
            return "Welcome Admin 🚀";
        } else {
            return "Access Denied ❌";
        }
    }

    // 👤 USER API
    @GetMapping("/user")
    public String userAccess(@RequestParam String username) {

        if (loginService.getUserRole(username) != null) {
            return "Welcome User ✅";
        } else {
            return "User not found ❌";
        }
    }

    // =========================
    // 🔧 OPTIONAL: HEALTH CHECK
    // =========================
    @GetMapping("/")
    public String home() {
        return "Backend is running 🚀";
    }
}