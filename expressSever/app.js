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


//client routing 
app.use(express.static(path.join(__dirname, "../expressFront/public")));

app.get("*",(req, res)=>{
 res.sendFile(path.join(__dirname, "../expressFront/public/index.html"));
})

//socket 
require("./socket.js")(io);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
