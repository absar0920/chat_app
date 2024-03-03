const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" },
});

require("./db/connect");

// Models:
const Users = require("./models/signup");

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

  socket.on("joinRoom", async (data) => {
    console.log("Joined Room", data.room);
    socket.join(data.room);

    const dataOfUserAboutRooms = await Users.findOne({ email: data.email });
    const rooms = dataOfUserAboutRooms.rooms;
    const isAlreadyHave = rooms.find((room) => room == data.room);
    if (!isAlreadyHave) {
      rooms.push(data.room)
    }
    console.log(dataOfUserAboutRooms);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    // You may want to handle removing the user from any rooms they were in
  });
});

app.use(cors());
app.use(bodyParser.json());

app.post("/api/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res
        .status(404)
        .send({ status: 404, message: "Please Fill out all Details" });
    }

    const isAlreadyAUser = await Users.findOne({ email });
    console.log(isAlreadyAUser);
    if (isAlreadyAUser) {
      return res
        .status(401)
        .send({ status: 401, message: "User Already Exists" });
    }
    try {
      const newUser = new Users({
        name: fullName,
        email: email,
        password: password,
        rooms: [],
      });
      newUser.save();
      return res
        .status(200)
        .send({ status: 200, message: "Everything Went Ok" });
    } catch (err) {
      console.log("Error", err);
      return res
        .status(501)
        .send({ status: 501, message: "An Internal Error Occured." });
    }
  } catch (error) {
    console.log("Error At signup", error);
    return res
      .status(504)
      .send({ status: 504, message: "An Internal Error Occured." });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    res
      .status(404)
      .send({ status: 404, message: "Please Fill out all details" });
  }

  const user = await Users.findOne({ email: email });

  if (!user) {
    return res
      .status(401)
      .send({ status: 301, message: "Email or password is incorrect" });
  } else {
    const storedEmail = user.email;
    const storedPassword = user.password;

    if (email == storedEmail && password == storedPassword) {
      res.status(200).send({
        status: 200,
        message: "User is logged In",
        details: {
          name: user.name,
          email: user.email,
          password: user.password,
          rooms: user.rooms,
        },
      });
    } else {
      res
        .status(301)
        .send({ status: 301, message: "Email or password is incorrect" });
    }
  }
});

const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
