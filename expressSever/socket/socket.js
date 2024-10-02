"use strict";

module.exports = (io) => {
  const chatNameSpace = io.of("/chat");
  let room;
  
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


    /*
    socket.on("client-event", (msg) => {
      console.log("received client message ==> " + msg);
      io.emit("server-event", "server message");
    });
    */
  })


  /*
  io.on("connection", (socket) => {
    socket.on("client-event", (msg) => {
      console.log("received client message ==> " + msg);
      io.emit("server-event", "server message");
    });
  }); */

  /*
  io.on("connection", (socket) => {

    var userNick = socket.handshake.query.nickName;


    socket.on("user connect", (userInfo) => {
    });


    // 메시지 수신 처리
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg); // 모든 클라이언트에 메시지 전송
    });

    socket.on("user list", (nickName)=>{
      if (!userList.includes(userNick)) {
        userList.push(userNick);
        socket.emit("user list", userList);
        console.log("userList list :: ", userList);
      }
    })

    // 연결 종료 시 이벤트 처리
    socket.on("disconnect", () => {
      console.log("User disconnected");

      userList = userList.filter((item) => item !== userNick);
      socket.emit("user list", userList);
    }); 



  }); */
};
