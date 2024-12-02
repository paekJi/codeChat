'use strict'

const friendService = require("../service/friendService");



/** get friend list  */
const friendList = async (req, res) => {
    try {
        const friendList = await friendService.friendList(req);
        res.status(200).json({friendList: friendList });

    } catch (error) {
        res.status(401).json({message : "error"});
    }
}


/** search user  */
const searchUser = async (req, res) => {
    try {
        const searchResult =  await friendService.searchUser(req);
        res.status(200).json({searchResult : searchResult});
    } catch (error) {
        res.status(401).json({message : "error"});
    }


}

/** request friend */
const requestFriend = async (req, res) => {
    try {
        const userSession = req.session.userInfo;
        const requestRes =  await friendService.requestFriend(req, userSession._id);
        
        res.status(200).json({message :  requestRes});
    } catch (error) {
        res.status(401).json({message : "error"});
    }
}

/** approve request  */
const approveFriend = () => {
    try {
        
    } catch (error) {
        
    }

}


module.exports = { 
    friendList, 
    searchUser,
    requestFriend, 
    approveFriend
}