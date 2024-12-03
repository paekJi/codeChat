import axios from "axios";
import React, { useState } from "react";

import { AppConfig } from "../../config/config";
import "../../static/style.css";
import { useNavigate } from "react-router-dom";


const UserSignIn = () => {
  const navigate = useNavigate();

  //signin information
  const [signInInfo, setSignInInfo] = useState({
    userId: "",
    userName : "",
    password: "",
  });

  /** signIn process */
  const signInProcess = async (e) => {
    if (signInInfo.userId && signInInfo.userName && signInInfo.password) {
      try {
        await axios.post(AppConfig.serverAddress + "/api/signIn", signInInfo, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        alert("Account Created Successfully");
        navigate("/login");
      } catch (error) {
         alert("An error occurred. Please try again with a different ID");
        /** user info doesnt exist */
      }
    }
  };

  /** login imformation change action */
  const signInChange = (e) => {
    const { name, value } = e.target;
    setSignInInfo({
      ...signInInfo,
      [name]: value,
    });
  };

  return (
        <div className="flex-box">
            <div>
              <img className="main-logo-black" src={AppConfig.serverAddress + "/img/black_theme_logo.png"}/>
            </div>
            <div className="block-input-container">
                <p className="input-label">ID</p>
                <input  name="userId" onChange={signInChange} className="block-input"  type="text" placeholder="Please enter your id" />
                <p className="input-label">USERNAME</p>
                <input name="userName" onChange={signInChange} className="block-input"  type="text" placeholder="Please enter your NAME" />
                <p className="input-label">PASSWORD</p>
                <input className="block-input" type="password" placeholder="Please enter your password"/>
                <p className="input-label">CONFIRM PASSWOD</p>
                <input className="block-input" name="password" onChange={signInChange} type="password" placeholder="Please enter your password"/>
            </div>

            <div>
                <input onClick={() => window.history.back()} className="main-btn black-letter" type="button" value="BACK"/>
                <input onClick={signInProcess} className="main-btn white-letter" type="button" value="SIGN IN"/>
            </div>
        </div>
  );
};

export default UserSignIn;
