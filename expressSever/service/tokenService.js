"use strict";

require("dotenv").config();

const jwt = require("jsonwebtoken");
const logger = require("../service/loginService");

//access token issue
const makeAccessToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_KEY, { expiresIn: "2m" });
  console.log(token);
  return token;
};

// refresh token issue
const makeRefreshToken = (userId) => {
  const refreshToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_KEY, {
    algorithm: "HS256",
    expiresIn: "10m",
  });
  console.log(refreshToken);
  return refreshToken;
};

// refresh token verification
const refreshTokenVerify = async (token, userId) => {
  const sql = (email) => {
    return `select token from token where Email = '${email}';`;
  };
  try {
    // db에서 refresh token 가져오기(DB에 userID로 조회)
    const result = await getConnection(sql(userId));

    //받은 refreshToken과 DB에서 조회한 값이 일치하는지 확인
    if (token === result["row"][0].token) {
      try {
        jwt.verify(token, JWT_KEY);
        return true;

        // refreshToken 검증 에러
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
    // DB 에러
  } catch (err) {
    console.log(err);
    return false;
  }
};

// access token verification
const accessTokenVerify = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    return {
      ok: true,
      id: decoded.id,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

module.exports = {
  makeAccessToken,
  makeRefreshToken,
  refreshTokenVerify,
  accessTokenVerify,
};
