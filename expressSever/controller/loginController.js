"use strict";

const express = require("express");

const loginService = require("../service/loginService");
const appConfig = require("../config/config");

/** user info chk  */
const loginChk = async (req, res) => {
  const userToken = await loginService.loginChk(req);
    console.log(userToken);

  if (userToken) {
        res.cookie("refreshToken", userToken.refreshToken, {
          httpOnly: true,
          secure: appConfig.httpYn,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

    res.status(200).json(userToken);
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