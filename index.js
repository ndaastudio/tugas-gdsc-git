const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  const totalViews = io.engine.clientsCount;
  io.emit("totalViews", totalViews);

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const totalViews = io.engine.clientsCount;
    io.emit("totalViews", totalViews);
  });
});

server.listen(3001, () => {
  console.log("Server aktif!");
  console.log("http://localhost:3001");
});
