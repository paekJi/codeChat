import React, { createContext, useEffect, useState } from "react";
import { AppConfig } from "../config/config";
import axios from "axios";

export const UserContext = createContext(null);

const UserProvider = ({children}) => {
    
  const [isLogin, setIsLogin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId ] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          AppConfig.serverAddress + "/api/verifyUser", {
            headers: {
              "Content-Type": "application/json",
            },
              withCredentials: true,
          }
        );
        setUserId(response.data.userId);
        setIsLogin(true);

      } catch (error) {
        setIsLogin(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ isLogin, userId }}>
      {children} 
    </UserContext.Provider>
  );
};

export default UserProvider;