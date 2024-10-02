'use strict'

const express = require("express");
const Room = require("../model/room");
const logger = require("../config/winston").logger;


/** get chat room list */
const roomList = async () => {
    try {
        const roomList = await Room.find().lean();
        return roomList;
    } catch (error) {
        logger.error(error);
        return null;
    }
}

/**add new room  */
const addRoom  = async (req) => {
    try {
        const {name, comment, host, constraint, password} =  req.body;
        const newRoom = new Room({
            name,
            comment,
            host,
            constraint,
            password,
            users: [{ userId: host, joinDate: new Date() }],
            createDate: new Date()
        });
        const savedRoom = await newRoom.save();
        logger.info(`new room added : ${savedRoom}`);
        return savedRoom;
    } catch (error) {
        return null;
    }
}

/** remove room - no one in the room  */
const removeRoom = async (req) => {
    let processResult = false;
    try {
        await Room.deleteOne({_id : req.body.roomId});
        processResult = true;
    } catch (error) {
        logger.info(error);
    }
    return processResult;
}

/** update room  */



module.exports = {
    roomList,
    addRoom,
    removeRoom
  };