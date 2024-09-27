"use strict";

const jwt = require("jsonwebtoken");
const logger = require("../service/loginService");
const appConfig = require("../config/config");

//access token issue
const makeAccessToken = (userId) => {
  const token = jwt.sign({ userId }, appConfig.tokenKey, { expiresIn: "2m" });
  return token;
};

// refresh token issue
const makeRefreshToken = (userId) => {
  const refreshToken = jwt.sign({ userId }, appConfig.tokenKey, {
    algorithm: "HS256",
    expiresIn: "10m",
  });
  return refreshToken;
};

// refresh token verification
const refreshTokenVerify = async (token, userId) => {

};

// access token verification
const accessTokenVerify = (token) => {

};

module.exports = {
  makeAccessToken,
  makeRefreshToken,
  refreshTokenVerify,
  accessTokenVerify,
};
