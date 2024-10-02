"use strict";

const express = require("express");
const logger = require("../config/winston").logger;
const chatService = require("../service/chatService");


/** get chat room list */
const roomList = async (req, res) => {
    const roomList = await chatService.roomList(req);

    if(roomList){
        res.status(200).json({roomList : roomList});
    }else{
        res.status(200).json({roomList : null});
    }
}

/**add new room  */
const addRoom = async (req, res) => {
    const newRoom = await chatService.addRoom(req);
    if(newRoom){
        res.status(200).json({newRoom : newRoom});
    }else{
        res.status(401).json({newRoom : null});
    }
}

/** remove room - no one in the room  */
const removeRoom = async (req, res) => {
    const processResult = await chatService.removeRoom(req);
    if(processResult){
        res.status(200).json({message : "ok"});
    }else{
        res.status(401).json({message : "error"});
    }

}


module.exports = {
    roomList,
    addRoom,
    removeRoom
}