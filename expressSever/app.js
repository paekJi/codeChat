"use strict";

const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const app = express();
const PORT = 3000;

const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// 클라이언트 애플리케이션을 제공할 디렉토리 설정
app.use(express.static(path.join(__dirname, "../expressFront/public")));

//라우팅
app.get("*",(req, res)=>{
 res.sendFile(path.join(__dirname, "../expressFront/public/index.html"));
})


// 클라이언트 연결 시 이벤트 처리
io.on("connection", (socket) => {

   const ipAddress = socket.handshake.address;
    console.log(ipAddress);

  // 메시지 수신 처리
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // 모든 클라이언트에 메시지 전송
  });

  // 연결 종료 시 이벤트 처리
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
