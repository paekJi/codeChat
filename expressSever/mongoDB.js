"use strict";

const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb://localhost:27017/test")
    .then(() => {
      console.log("mongoDB is connected");
    });
};
