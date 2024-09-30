"use strict";

const express = require("express");
const router = express.Router();


const userController = require("../controller/loginController");

router.post("/login", userController.loginChk);
router.post("/signIn", userController.SignIn);
router.post("/verifyUser", userController.verificationUser);

module.exports =  router;