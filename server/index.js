const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (message) => {
    console.log(message);
    // Emit the received message back to all connected clients
    io.sockets.emit("message", message);
  });

  socket.on("chatMessageForRoom", (data) => {
    console.log(data);
    // Emit the message to all clients in the specified room
    io.to(data.room).emit("messageForRoom", data);
  });

  socket.on("joinRoom", (room) => {
    console.log("Joined Room", room)
    socket.join(room);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    // You may want to handle removing the user from any rooms they were in
  });
});

const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
