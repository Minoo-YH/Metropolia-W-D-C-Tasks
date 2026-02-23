import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        console.error("Email and password are required");
        return;
      }

      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("STATUS:", response.status);
      const text = await response.text();
      console.log("BODY:", text);
      const data = await response.json().catch(() => null);

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Login failed:", response.status, data);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </label>

      <button className="login-button" onClick={handleLogin}>
        Log In
      </button>
    </div>
  );
};

export default LoginComponent;
