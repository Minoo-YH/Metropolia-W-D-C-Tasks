import { useState } from "react";

export default function useAuth() {
  const [error,setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);
 
  const authenticate = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        setIsLoading(false);
        return null;
      }
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setIsLoading(false);
      return null;
    }
  };

  

  return { user, login, logout };
}