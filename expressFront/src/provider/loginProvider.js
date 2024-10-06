import React, { createContext, useEffect, useState } from "react";
import { AppConfig } from "../config/config";
import axios from "axios";

export const UserContext = createContext(null);

const UserProvider = ({children}) => {

  const [isLogin, setIsLogin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const sessionUserInfo = async() => {
      try {
        const response =  await axios.get( AppConfig.serverAddress + "/api/userInfo",{
          withCredentials: true, 
        })
        
        if(response.data.userInfo){
          setUserInfo(response.data.userInfo);
          setIsLogin(true);
        }else{
          setIsLogin(false);
        }
      } catch (error) {
          setIsLogin(false);
          alert("오류가 발생했습니다. ");
      }finally{
        setLoading(false)
      }
    
    } 
    sessionUserInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ setIsLogin, setUserInfo, isLogin, userInfo }}>
      {children} 
    </UserContext.Provider>
  );
};

export default UserProvider;
