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

        console.log(searchResult);
        res.status(200).json({searchResult : searchResult});
    } catch (error) {
        res.status(401).json({message : "error"});
    }


}


const requestFriend = () => {

}

const approveFriend = () => {


}


module.exports = { 
    friendList, 
    searchUser,
    requestFriend, 
    approveFriend
}