import React, { useEffect,useContext } from "react";
import { useState } from "react";
import axios from "axios";

import { AppConfig } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../provider/loginProvider";
import "../../static/style.css";


const UserLogin = () => {
 const navigate = useNavigate();
 const { setIsLogin, setUserInfo } = useContext(UserContext);
  //login information
  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    password: "",
  });

  /** login check process */
  const loginProcess = async () => {
    if (loginInfo.userId && loginInfo.password) {
      try {
          const response = await axios.post(AppConfig.serverAddress + "/api/login", loginInfo, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          
          /**after login, setting context Info */
          if (response.data.userInfo) {
            setIsLogin(true);
            setUserInfo(response.data.userInfo);
            navigate("/chatRoomList");
          } else {
            setIsLogin(false);
          }


      } catch (error) {
        console.log(error);
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

  return (
      <div className="flex-box">
          <div>
              <img className="main-logo-black" src={AppConfig.serverAddress + "/img/black_theme_logo.png"}/>
          </div>
          <div className="block-input-container">
              <input className="block-input" name="userId" onChange={loginChange}  type="text" placeholder="Please enter your id" />
              <input className="block-input" name="password" onChange={loginChange} type="password" placeholder="Please enter your password"/>
          </div>

          <div>
              <input onClick={loginProcess} className="main-btn black-letter" type="button" value="Login"/>
              <input className="main-btn white-letter" type="button" value="Sign In"/>
          </div>
      </div>
  );
};

export default UserLogin;
