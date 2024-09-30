'use strct'
const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../model/user");
const tokenService = require("../service/tokenService");
const logger = require("../config/winston").logger;

/* login info compare */
const loginChk = async (req) => {
    try {
        const { userId, password } = req.body;
        const user = await User.findOne({ userId });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) { 
                //token save 
                const userToken = {
                    accessToken : tokenService.makeAccessToken(userId),
                    refreshToken : tokenService.makeRefreshToken(userId),
                }
                await User.updateOne({ userId: userId }, { refreshToken: userToken.refreshToken, tokenUpdate: new Date() });
                logger.info(`user login : ${user}`);
                return userToken;
            }
        }else{
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}


/** user sign in */
const SignIn = async (req) => {
    let processResult = false;
    try{
        const { userId, password } = req.body;
        //make hash
        const hashedpass = await hashedPassword(password);

        // save user
        const newUser = new User({ userId, password: hashedpass, createDate: new Date() });
        await newUser.save();
        logger.info("user sign in : ", newUser );
        processResult = true;
    }catch(error){
        logger.error(error);
        console.log(error)
    }

    return processResult;
}



const hashedPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};


module.exports = {
  loginChk,
  SignIn
};