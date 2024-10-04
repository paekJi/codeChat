import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAction } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";

const UserLogin = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

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
        dispatch(userAction.setUser(loginInfo));
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
