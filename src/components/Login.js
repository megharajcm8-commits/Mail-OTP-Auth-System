import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [mode, setMode] = useState("login"); // login | signup | forgot

    // ✅ LOGIN
    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:8080/login", null, {
                params: { username, password }
            });

            setMessage(res.data);

            if (res.data.toLowerCase().includes("success")) {
                navigate("/dashboard");
            }

        } catch (err) {
            console.error(err);

            if (err.response && err.response.data) {
                setMessage(err.response.data);
            } else {
                setMessage("Server not reachable");
            }
        }
    };

    // ✅ SIGNUP
    const handleSignup = async () => {
        try {
            const res = await axios.post("http://localhost:8080/signup", null, {
                params: { username, password }
            });

            setMessage(res.data);
        } catch (err) {
            console.error(err);
            setMessage("Signup failed");
        }
    };

    // ✅ SEND OTP (EMAIL)
    const sendOtp = async () => {
        try {
            const res = await axios.post("http://localhost:8080/send-otp", null, {
                params: { username }
            });

            setMessage(res.data);
        } catch (err) {
            console.error(err);
            setMessage("Failed to send OTP");
        }
    };

    // ✅ RESET PASSWORD
    const resetPassword = async () => {
        try {
            const res = await axios.post("http://localhost:8080/reset-password", null, {
                params: { username, otp, newPassword }
            });

            setMessage(res.data);
        } catch (err) {
            console.error(err);
            setMessage("Reset failed");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100"
            style={{
                backgroundImage: "url('https://source.unsplash.com/1600x900/?technology')",
                backgroundSize: "cover"
            }}
        >
            <div className="card p-4 shadow" style={{ width: "350px", borderRadius: "15px" }}>

                <h3 className="text-center mb-3">
                    {mode === "login" && "🔐 Login"}
                    {mode === "signup" && "📝 Signup"}
                    {mode === "forgot" && "🔑 Reset Password"}
                </h3>

                {/* EMAIL */}
                <input
                    className="form-control mb-2"
                    placeholder="Email"
                    onChange={(e) => setUsername(e.target.value)}
                />

                {/* PASSWORD */}
                {(mode === "login" || mode === "signup") && (
                    <input
                        className="form-control mb-2"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                )}

                {/* FORGOT PASSWORD */}
                {mode === "forgot" && (
                    <>
                        <button className="btn btn-warning w-100 mb-2" onClick={sendOtp}>
                            Send OTP
                        </button>

                        <input
                            className="form-control mb-2"
                            placeholder="Enter OTP"
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        <input
                            className="form-control mb-2"
                            type="password"
                            placeholder="New Password"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </>
                )}

                {/* BUTTONS */}
                {mode === "login" && (
                    <button className="btn btn-primary w-100 mb-2" onClick={handleLogin}>
                        Login
                    </button>
                )}

                {mode === "signup" && (
                    <button className="btn btn-success w-100 mb-2" onClick={handleSignup}>
                        Signup
                    </button>
                )}

                {mode === "forgot" && (
                    <button className="btn btn-danger w-100 mb-2" onClick={resetPassword}>
                        Reset Password
                    </button>
                )}

                {/* SWITCH LINKS */}
                <div className="text-center">
                    {mode !== "login" && (
                        <p style={{ cursor: "pointer", color: "blue" }} onClick={() => setMode("login")}>
                            Back to Login
                        </p>
                    )}

                    {mode === "login" && (
                        <>
                            <p style={{ cursor: "pointer", color: "blue" }} onClick={() => setMode("signup")}>
                                New User? Signup
                            </p>
                            <p style={{ cursor: "pointer", color: "red" }} onClick={() => setMode("forgot")}>
                                Forgot Password?
                            </p>
                        </>
                    )}
                </div>

                <p className="text-center text-success">{message}</p>
            </div>
        </div>
    );
}

export default Login;