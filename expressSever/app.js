"use strict";

/** import start */
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const app = express();
const PORT = 3000;
const cookieParser = require("cookie-parser");
const session = require('express-session');

const server = http.createServer(app);
const io = socketIo(server);

const appConfig = require("./config/config.js")
const sequelize = require("./db/mysqlDB.js");


// const loginRouter = require("./router/loginRoute.js");
// const chatRouter = require("./router/chatRoute.js");
// const friendRouter = require("./router/friendRoute.js");

app.get("/poolTest", async (req, res) => {
  try {
    const [rows] = await mysqlPool.query("SELECT 1"); // 쿼리 테스트
    res.json({ status: "ok", result: rows });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

/**socket connection  */
require("./socket/socket.js")(io);




/** import end */
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use( session({
      resave: false,
      saveUninitialized: true,
      secret: "anyrandomstring",
    })
  );


/** server routing */
// app.use("/api", loginRouter);
// app.use("/api/chat",chatRouter);
// app.use("/api/friend", friendRouter);


/**  client routing */
app.use(express.static(path.join(__dirname, "../expressFront/public")));

app.get("*",(req, res)=>{
  res.sendFile(path.join(__dirname, "../expressFront/public/index.html"));
})


/** server start */
sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful');
    // 서버 시작 코드 작성
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT} port`);
    });
  })
  .catch(error => {
    console.error('Database connection failed:', error);
    process.exit(1); // 오류 발생 시 서버 종료
  });