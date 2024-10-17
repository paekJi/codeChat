"use strict";

const mongoose = require("mongoose");
const roomSchema = mongoose.Schema({
    name : String,
    comment : String,
    host : String,
    constraint : Boolean,
    password : String,
    users : [{ userId : String, joinDate : Date }], 
    createDate : Date
});

const Room = mongoose.model("room", roomSchema);
module.exports = Room;
