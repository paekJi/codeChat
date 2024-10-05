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
const loginRouter = require("./router/loginRoute.js");
const chatRouter = require("./router/chatRoute.js");



/** database / socket connect  */
require("./socket/socket.js")(io);
require("./db/mongoDB")();

console.log(appConfig.httpYn);

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
app.use("/api", loginRouter);
app.use("/api/chat",chatRouter);


/**  client routing */
app.use(express.static(path.join(__dirname, "../expressFront/public")));

app.get("*",(req, res)=>{
  res.sendFile(path.join(__dirname, "../expressFront/public/index.html"));
})

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
