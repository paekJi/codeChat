"use strict";

const jwt = require("jsonwebtoken");
const appConfig = require("../config/config");

//access token issue
const makeAccessToken = (userId) => {
  const token = jwt.sign({ userId }, appConfig.accessKey, { expiresIn: "2m" });
  return token;
};

// refresh token issue
const makeRefreshToken = (userId) => {
  const refreshToken = jwt.sign({ userId }, appConfig.refreshKey, {
    algorithm: "HS256",
    expiresIn: "10m",
  });
  return refreshToken;
};


// verify token
const verifyToken = (token, type) => {
    try {
    const decoded = jwt.verify(token, type === 'access' ? appConfig.accessKey :  appConfig.refreshKey);
    return {
      ok: true,
      userId: decoded.userId,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
}


module.exports = {
  makeAccessToken,
  makeRefreshToken,
  verifyToken
};
