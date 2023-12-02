const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("typing", ([isTyping, userId]) => {
    console.log("message: " + isTyping);
    io.emit("typing", [isTyping, userId]);
    
  socket.on("confess", (text) => {
    console.log("message: " + text);
    io.emit("confess", text);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3001, () => {
  console.log("Server aktif!");
  console.log("http://localhost:3001");
});
