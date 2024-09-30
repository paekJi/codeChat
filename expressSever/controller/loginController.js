"use strict";

const express = require("express");

const loginService = require("../service/loginService");
const tokenService =  require("../service/tokenService");

const appConfig = require("../config/config");

/** user info chk  */
const loginChk = async (req, res) => {
  const userToken = await loginService.loginChk(req);
  if (userToken) {
        console.log( "httpYn" , appConfig.httpYn);
        res.cookie("accesstoken", userToken.accessToken, {
            httpOnly: true,
            secure: appConfig.httpYn,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        // console.log("쿠키 : ", req.cookies);

        res.cookie("refreshToken", userToken.refreshToken, {
          httpOnly: true,
          secure: appConfig.httpYn,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

    res.status(200).json({message: "ok" });
  } else {
    res.status(401).json({message : "error"});
  }
};

/** user sign in */
const SignIn = (req, res) => {   
    if(loginService.SignIn(req)){
        res.status(200);
    }else{
        res.status(401);
    }
}


/** verify user token  */
const verificationUser = (req, res) => {
    try {
      const verifyAccess = tokenService.verifyToken(req.cookies.accessToken, "access");
      console.log("쿠키 : ", req.cookies);
      console.log("verifyAcess : " , verifyAccess );


      // vaild access token
      if (verifyAccess.ok) {
        res.status(200).json({ userId: verifyAccess.userId });
      } else {
        const verifyRefresh = tokenService.verifyToken(req.cookies.accessToken, "refresh");
        // console.log("token : ", req.cookies.accessToken);
        console.log("verifyRefresh : ", verifyRefresh);
        
        // vaild refresh token
        if (verifyRefresh.ok) {
          res.cookie("accesstoken", makeNewToken(verifyRefresh.userId), {
            httpOnly: true,
            secure: appConfig.httpYn,
            maxAge: 30 * 24 * 60 * 60 * 1000,
          });

          res.status(200).json({ userId: verifyRefresh.userId });

          // expired token
        } else {
          res.status(401).json({ message: "error" });
        }
      }
    } catch (error) {  
        console.log(error);
        res.status(401).json({message : "error"});
    }
   
};


module.exports = {
  loginChk,
  SignIn,
  verificationUser,
};