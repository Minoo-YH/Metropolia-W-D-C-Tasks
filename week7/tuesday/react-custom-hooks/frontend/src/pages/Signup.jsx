import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = await signup({ name, email, password });
    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };


  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Email address:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Sign up</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
