const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
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

// Socket.io event handling for real-time communication
io.on("connection", (socket) => {
  // Socket events for real-time communication

  socket.on("message", (message) => {
    // Log received message
    console.log(message);
    // Emit the received message back to all connected clients
    io.sockets.emit("message", message);
  });

  socket.on("chatMessageForRoom", (data) => {
    console.log(data)
    // Emit the message to all clients in the specified room
    io.emit("messageForRoom", data);
  });

  socket.on("disconnect", () => {
    // Handle user disconnection
    console.log("User disconnected");
  });
});

app.use(cors());
app.use(bodyParser.json());

// User signup endpoint
app.post("/api/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log(req.body);

    if (!fullName || !email || !password) {
      return res
        .status(404)
        .send({ status: 404, message: "Please Fill out all Details" });
    }

    const isAlreadyAUser = await Users.findOne({ email });
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
        .send({ status: 501, message: "An Internal Error Occurred." });
    }
  } catch (error) {
    console.log("Error At signup", error);
    return res
      .status(504)
      .send({ status: 504, message: "An Internal Error Occurred." });
  }
});

// User login endpoint
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

// Update user's rooms endpoint
app.post("/api/update_rooms", async (req, res) => {
  const { email, roomToJoin } = req.body;
  console.log(email, roomToJoin);
  const dataOfUserFromFind = await Users.findOne({ email: email });
  console.log(dataOfUserFromFind);

  if (!dataOfUserFromFind) {
    return res.status(404).send({ status: 404, message: "Invalid Email" });
  }

  const isAlreadyHave = dataOfUserFromFind.rooms.find(
    (room) => room == roomToJoin
  );
  if (!isAlreadyHave) {
    const rooms = dataOfUserFromFind.rooms;
    rooms.push(roomToJoin);
    await Users.findOneAndUpdate(
      { email: email },
      { $set: { rooms: rooms } },
      { new: true }
    );
    const details = await Users.findOne({ email: email });
    return res
      .status(200)
      .send({ status: 200, message: "Everything Went Good", details: details });
  } else {
    return res.status(303).send({ status: 303, message: "Already A member" });
  }
});

const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
