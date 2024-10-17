"use strict";

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId : {type : String, required: true},
  userName :{type : String, required: true},
  password: {type : String, required: true},
  profileImg: {type : String},
  friend :  [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  refreshToken :  {type : String},
  tokenUpdate : {type : Date},
  createDate: {type : Date , default : new Date()},
});

const User = mongoose.model("User", userSchema);
module.exports = User;
