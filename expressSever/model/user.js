const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name : String,
    password : String,
    profileImg : String,
    createDate : Date
});

const User = mongoose.model("User", userSchema);
module.exports = User;