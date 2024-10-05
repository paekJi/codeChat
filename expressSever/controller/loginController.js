"use strict";

const express = require("express");

const loginService = require("../service/loginService");
const tokenService =  require("../service/tokenService");

const appConfig = require("../config/config");
const logger = require("../config/winston").logger;

/** user info chk  */
const loginChk = async (req, res) => {
  const userToken = await loginService.loginChk(req);
  if (userToken) {
        res.cookie("accessToken", userToken.accessToken, {
            httpOnly: true,
            secure: appConfig.httpYn,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.cookie("refreshToken", userToken.refreshToken, {
          httpOnly: true,
          secure: appConfig.httpYn,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        
    req.session.userInfo = userToken.userInfo;

   

    res.status(200).json({message: userToken.userInfo });
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


/** session userInfo */
const userSession = (req, res) => {
  console.log("세션 ",req.session.userInfo );
  try {
    if (req.session.userInfo) {
      res.status(200).json({userInfo : req.session.userInfo}); 
    }else{
      res.status(403).json({message : "Unauthenticated"});
    }
  } catch (error) {
    res.status(401).json({message : error});
  }
}

/** verify user token  */
const verificationUser = (req, res) => {
    try {
      const verifyAccess = tokenService.verifyToken(req.cookies.accessToken, "access");
    
      // vaild access token
      if (verifyAccess.ok) {
        res.status(200).json({ userId: verifyAccess.userId });

      } else {
        const verifyRefresh = tokenService.verifyToken(req.cookies.refreshToken, "refresh");
        
        // vaild refresh token
        if (verifyRefresh.ok) {
          res.cookie("accesstoken", tokenService.makeAccessToken(verifyRefresh.userId), {
            httpOnly: true,
            secure: appConfig.httpYn,
            maxAge: 30 * 24 * 60 * 60 * 1000,
          });
          
          res.status(200).json({ userId: verifyRefresh.userId });
          // expired token
        } else {
          res.status(200).json({ userId: null });
        }
      }
    } catch (error) {  
        logger.info(error);
        res.status(401).json({message : "error"});
    }
   
};


module.exports = {
  loginChk,
  SignIn,
  verificationUser,
  userSession
};