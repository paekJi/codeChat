import React from "react";
import { useState } from "react";
import axios from "axios";
import { AppConfig } from "../../config/config";

const UserLogin = () => {

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

          console.log(response);
          
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
