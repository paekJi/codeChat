"use strict";

const express = require("express");

const loginService = require("../service/loginService");
const appConfig = require("../config/config");

/** user info chk  */
const loginChk = async (req, res) => {
  const userToken = await loginService.loginChk(req);
  if (userToken) {
        res.cookie("refreshToken", userToken.refeshToken, {
          httpOnly: true,
          secure: appConfig.httpYn,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
    res.status(200).json({accessToken : userToken.accessToken});
  } else {
    res.status(401).json({message : "error"});
  }
};

/** user sign in */
const SignIn = (req, res) => {   
    if(loginService.SignIn(res)){
        res.status(200);
    }else{
        res.status(401);
    }

}

module.exports = {
  loginChk,
  SignIn,
};