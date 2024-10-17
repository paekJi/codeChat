"use strict";

const User = require("../model/user");


/** get friend list  */
const friendList = async (req) => {
    try {
        const friendList = await User.findOne({ _id : req.session.userInfo._id })
                                .populate("friend", "_id userId userName profileImg");

        return friendList;
    } catch (error) {
        console.log(error);
        return null;
    }
}

 /** Search for users by keyword except that user */
const searchUser = async (req) => {
    try{
        const searchWord =  req.query.searchWord;
        const userList =  await User.find({ userId: { $regex: searchWord, $options: "i" },
                                            _id : {$ne : req.session.userInfo._id } })
                                    .select("_id userId userName profileImg"); 

        return userList;
    }catch(error){
        console.log(error);
        return null;        
    }


}

/** request friend */
const requestFriend = async (req) => {
    try {
        // const 
    } catch (error) {
        
    }
}

const approveFriend = () => {


}


module.exports = { 
    friendList, 
    searchUser,
    requestFriend, 
    approveFriend
}