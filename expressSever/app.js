"use strict";

/** import start */
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const app = express();
const PORT = 3000;
const mongo = require("./mongoDB")();
const cookieParser = require("cookie-parser");


const server = http.createServer(app);
const io = socketIo(server);

require("./socket/socket.js")(io);


const loginRouter = require("./router/loginRoute.js");

/** import end */
app.use(cors());
app.use(express.json());
app.use(cookieParser());


/** server routing */
app.use("/api", loginRouter);


/**  client routing */
app.use(express.static(path.join(__dirname, "../expressFront/public")));

app.get("*",(req, res)=>{
 res.sendFile(path.join(__dirname, "../expressFront/public/index.html"));
})



server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
