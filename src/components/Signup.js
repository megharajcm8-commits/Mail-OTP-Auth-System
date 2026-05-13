import React, { useState } from "react";
import axios from "axios";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async () => {
        const res = await axios.get(
            `http://localhost:8080/signup?username=${username}&password=${password}`
        );
        setMessage(res.data);
    };

    return (
        <div>
            <h2>Signup</h2>

            <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <br />

            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <br />

            <button onClick={handleSignup}>Signup</button>

            <p>{message}</p>
        </div>
    );
}

export default Signup;