import React, { useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:8080");

const Room = () => {
  const [roomValue, setRoomValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const joinRoom = () => {
    if (roomValue.trim() !== "") {
      socket.emit("joinRoom", roomValue);
      setRoomValue("");
      console.log("Message sent:", roomValue);
    }
  };
  const handleChange = (e) => {
    setRoomValue(e.target.value);
  };

  socket.on("message", (data) => {
    const { roomName, message } = data;
    console.log(`Message received from user ${socket.id} in room ${roomName}: ${message}`);
    io.to(roomName).emit("message", message );
  });

  return (
    <div>
      <h1>Room: {roomValue}</h1>
      <input
        type="text"
        name="message"
        id="room"
        value={roomValue}
        onChange={handleChange}
      />
      <button onClick={joinRoom}>Join Room</button>
      <br />
    </div>
  );
};

export default Room;
