import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

 const singup=({setIsAuthenticated})=> {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { authenticate: signup, error, isLoading } = useAuth("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
    const user = await signup({ name, email, password });
    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };



  return { signup, error, isLoading };
}