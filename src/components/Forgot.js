import React, { useState } from "react";
import axios from "axios";

function Forgot() {

    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    // ✅ SEND OTP
    const sendOtp = async () => {
        console.log("👉 Send OTP clicked");

        try {
            const res = await axios.post(
                "http://localhost:8080/send-otp",
                null,
                {
                    params: { username }
                }
            );

            setMessage(res.data);

        } catch (err) {
            console.error(err);
            setMessage("Failed to send OTP");
        }
    };

    // ✅ RESET PASSWORD
    const resetPassword = async () => {
        console.log("👉 Reset Password clicked");

        try {
            const res = await axios.post(
                "http://localhost:8080/reset-password",
                null,
                {
                    params: { username, otp, newPassword }
                }
            );

            setMessage(res.data);

        } catch (err) {
            console.error(err);
            setMessage("Failed to reset password");
        }
    };

    return (
        <div>
            <h2>🔑 Forgot Password</h2>

            <input
                placeholder="Enter Email"
                onChange={(e) => setUsername(e.target.value)}
            />
            <br /><br />

            <button onClick={() => console.log("BUTTON WORKING")}>
                Send OTP
            </button>

            <br /><br />

            <input
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
            />
            <br /><br />

            <input
                type="password"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <br /><br />

            <button type="button" onClick={resetPassword}>
                Reset Password
            </button>

            <p>{message}</p>
        </div>
    );
}

export default Forgot;