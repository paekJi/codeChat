"use strict";

const express = require("express");
const router = express.Router();

const friendController = require("../controller/friendController");


router.get("/friendList", friendController.friendList);
router.get("/searchUser", friendController.searchUser);

router.post("/requestFriend", friendController.requestFriend);
router.post("/approveFriend", friendController.approveFriend);





module.exports =  router;