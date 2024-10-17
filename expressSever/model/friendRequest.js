"use strict";

const mongoose = require("mongoose");

const friendRequestSchema = mongoose.Schema({
    requester : {type : String, required: true},
    receiver: {type : String, required: true},
    state : {type : String, default : "N"},
    regdate :{type : Date , default : new Date()}
});

const friendRequest = mongoose.model("friend_request", friendRequestSchema);
module.exports = friendRequest;
