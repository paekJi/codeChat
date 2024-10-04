"use strict";

module.exports = (io) => {
  const chatNameSpace = io.of("/chat");
  let room;
  
  /** chat namespace action */
  chatNameSpace.on("connection", (socket) => {
    /** room join */
    socket.on("cli_roomConnet", (roomInfo) => {
        room = roomInfo;
        socket.join(room._id);
        chatNameSpace.in(room._id).emit("ser_roomJoin", true);
    })

    /** sending message */
    socket.on("cli_sendMessage", (messageInfo) => {
      messageInfo.sendDate = new Date();
      chatNameSpace.in(room._id).emit("ser_sendMessage", messageInfo);
    })

    /**
     *     socket.on("disconnect", () => {
      console.log("User disconnected");

      userList = userList.filter((item) => item !== userNick);
      socket.emit("user list", userList);
    }); 
     */

  })
};
