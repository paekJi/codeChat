import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { AppConfig } from "../../config/config";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  //login information
  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    password: "",
  });


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
          navigate("/chat");
      } catch (error) {
        /** user info doesnt exist */
        if(error.response.status == 401){
            alert(error.response.data.message);
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
