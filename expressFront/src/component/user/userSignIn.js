import axios from "axios";
import React, { useState } from "react";
import { AppConfig } from "../../config/config";

const UserSignIn = () => {
  //signin information
  const [signInInfo, setSignInInfo] = useState({
    userId: "",
    userName : "",
    password: "",
  });

  /** signIn process */
  const signInProcess = async (e) => {
    e.preventDefault();
    if (signInInfo.userId && signInInfo.userName && signInInfo.password) {
      try {
        const response = await axios.post(AppConfig.serverAddress + "/api/signIn", signInInfo, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {

         alert("An unknown error occurred");
         console.log(error);
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
    <div>
      <p>회원가입 페이지</p>
      <form onSubmit={signInProcess}>
        <input type="text" name="userId" placeholder="id" onChange={signInChange} />
        <input type="text" name="userName" placeholder="name" onChange={signInChange} />
        <input type="password" name="password" onChange={signInChange} />
        <button type="submit">회원가입 하기</button>
      </form>
    </div>
  );
};

export default UserSignIn;
