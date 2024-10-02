"use strict";

const express = require("express");
const router = express.Router();

const chatController =  require("../controller/chatController");

router.get("/roomList", chatController.roomList);

router.post("/addRoom", chatController.addRoom);
router.post("/removeRoom", chatController.removeRoom);


module.exports =  router;