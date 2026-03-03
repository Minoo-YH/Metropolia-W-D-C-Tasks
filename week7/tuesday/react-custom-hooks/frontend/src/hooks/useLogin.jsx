import { useState } from "react";

export default function useLogin() {
  const [error, setError] = useState(null);   
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials) =>{  

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
        return;
      } 
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      return data;
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    } 
  };

  return { login, error, isLoading };
}
    