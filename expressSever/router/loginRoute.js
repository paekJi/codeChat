"use strict";

const express = require("express");
const router = express.Router();


const userController = require("../controller/loginController");

router.post("/login", userController.loginChk);
router.post("/signIn", userController.SignIn);

module.exports =  router;