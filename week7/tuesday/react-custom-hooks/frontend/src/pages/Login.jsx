import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {authenticate: login, error, isLoading, user} = useAuth("/api/users/login");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const userData = await login({ email, password });
    if (userData) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };

   

  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Email address:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Log in</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
