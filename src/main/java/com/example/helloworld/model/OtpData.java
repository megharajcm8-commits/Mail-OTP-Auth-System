package com.example.helloworld.model;

public class OtpData {

    private String otp;
    private long expiryTime;
    private int attempts;

    // Constructor
    public OtpData(String otp, long expiryTime) {
        this.otp = otp;
        this.expiryTime = expiryTime;
        this.attempts = 0;
    }

    // Getters
    public String getOtp() {
        return otp;
    }

    public long getExpiryTime() {
        return expiryTime;
    }

    public int getAttempts() {
        return attempts;
    }

    // Increment attempts
    public void incrementAttempts() {
        this.attempts++;
    }
}