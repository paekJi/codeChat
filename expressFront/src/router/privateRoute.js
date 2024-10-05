import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { AppConfig } from "../config/config";

const PrivateRoute = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogin, setIsLogin] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const sessionUserInfo = async() => {
      try {
        const response =  await axios.get( AppConfig.serverAddress + "/api/userInfo",{
          withCredentials: true, // 쿠키를 포함하여 요청
        })
        setIsLogin(true);
        setUserInfo(true);
        setLoading(false);
        console.log("차차사")
      } catch (error) {
        console.log(error);
        if(error.response.status == 403){
          setIsLogin(false);
          setLoading(false);
        }else{
          alert("오류가 발생했습니다. ");
        }
      }
    
    } 
    sessionUserInfo();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
