import React, { useEffect,useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { AppConfig } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../provider/loginProvider";


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
    <div>
      <p>Login Page</p>
        <input type="text" name="userId" placeholder="enter your name" onChange={loginChange} />
        <input type="password" name="password" onChange={loginChange} />
        <button onClick={loginProcess} >login</button>
    </div>
  );
};

export default UserLogin;
