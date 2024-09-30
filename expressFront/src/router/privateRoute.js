import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AppConfig } from "../config/config";
import axios from "axios";

const PrivateRoute = () => {
  const [isLogin, setIsLogin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.post(
          AppConfig.serverAddress + "/api/verifyUser",
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setUserId(response.data.userId);
        setIsLogin(true);
      } catch (error) {
        console.error("Verification failed:", error);
        setIsLogin(false);
      } finally {
        setLoading(true);
        console.log("여보세요");
      }
    };

    verifyUser();
  }, [isLogin]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
