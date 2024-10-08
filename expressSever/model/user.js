"use strict";

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: String,
  userName : String,
  password: String,
  profileImg: String,
  refreshToken : String,
  tokenUpdate : Date,
  createDate: Date,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
