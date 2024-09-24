module.exports = (io) => {

  var userList = [];


  io.on("connection", (socket) => {

    var userNick = socket.handshake.query.nickName;
    console.log("connected userList")

    if (!userList.includes(userNick)){
        userList.push(userNick);
        socket.emit("user list", userList);
    }



    // 메시지 수신 처리
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg); // 모든 클라이언트에 메시지 전송
    });

    // 연결 종료 시 이벤트 처리
    socket.on("disconnect", () => {
      console.log("User disconnected");

      userList = userList.filter((item) => item !== userNick);
      socket.emit("user list", userList);
    });
  });
};
