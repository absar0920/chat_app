import React, { useState } from "react";
import io from "socket.io-client";
import "../styles/sendMessage.css";

import { useCookies } from "react-cookie";

const SecondMessage = ({ socket }) => {
  const [cookies] = useCookies();
  const name = cookies.name;

  const handleClick = () => {
    // Retrieve input value
    const inputValue = document.querySelector("input").value;
    
    if (inputValue) {
      // Emit message to the server
      socket.emit("message", {
        name: name,
        time: new Date(),
        id: socket.id,
        message: inputValue,
      });
      
      // Clear input field
      document.querySelector("input").value = "";
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="sendMessage"
    >
      <input type="text" name="message" id="message" />
      <button className="btn" onClick={handleClick}>
        Send
      </button>
    </form>
  );
};

export default SecondMessage;
