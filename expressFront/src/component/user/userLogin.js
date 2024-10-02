import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { AppConfig } from "../../config/config";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigator = useNavigate();

  //login information
  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    password: "",
  });

  const [isLogin,  setIsLogin] = useState(false);


  /** login check process */
  const loginProcess = async (e) => {
    e.preventDefault();
    if (loginInfo.userId && loginInfo.password) {
      try {
          const response = await axios.post(AppConfig.serverAddress + "/api/login", loginInfo, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          setIsLogin(true);
      } catch (error) {
        /** user info doesnt exist */
        if(error.response.status == 401){
            alert("로그인 정보를 확인해주세요");
        }else{
            alert("An unknown error occurred");
        }
        
      }
    }
  };

  
  /** login imformation change action */
  const loginChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  useEffect(()=> {
    if(isLogin){
      navigator("/chatRoomList");
    }
  },[isLogin])

  return (
    <div>
      <p>Login Page</p>
      <form onSubmit={loginProcess}>
        <input type="text" name="userId" placeholder="enter your name" onChange={loginChange} />
        <input type="password" name="password" onChange={loginChange} />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default UserLogin;
