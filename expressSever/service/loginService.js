'use strct'
const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../model/user");
const tokenService = require("../service/tokenService");
const logger = require("../config/winston");

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
                    refeshToken : tokenService.makeRefreshToken(userId),
                }
                await User.updateOne({ userId: userId }, { refreshToken: userToken.refeshToken, tokenUpdate: new Date() });
                
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

        processResult = true;

        console.log("이보세요");
    }catch(error){
        // logger.error(error);
        console.log(error)
    }

    return processResult;
}


const makeNewToken = (req) => {
    
    

}


const hashedPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};


module.exports = {
  loginChk,
  SignIn,
  makeNewToken,
};