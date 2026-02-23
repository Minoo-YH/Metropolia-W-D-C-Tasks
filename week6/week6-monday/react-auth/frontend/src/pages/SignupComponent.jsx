import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupComponent = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (!email || !password) {
        console.error("Email and password are required");
        return;
      }

      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      
      const data = await response.json().catch(() => null);
      console.log("SIGNUP status:", response.status);
      console.log("SIGNUP body:", data);

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Signup failed:", response.status, data);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>

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

      <button className="signup-button" onClick={handleSignup}>
        Sign Up
      </button>
    </div>
  );
};

export default SignupComponent;
