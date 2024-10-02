"use strict";

module.exports = (io) => {
  const chatNameSpace = io.of("/chat");
  
  chatNameSpace.on("connection", (socket) => {

    socket.on("cli_roomConnet", (roomInfo) => {
      console.log("방 연결이라면서요 ")
      console.log(roomInfo);
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
