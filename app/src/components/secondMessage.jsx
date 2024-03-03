import React, { useState } from "react";
import io from "socket.io-client";
import "../styles/sendMessage.css";

import { useCookies } from "react-cookie";



const SecondMessage = ({ socket }) => {
  // const [inputValue, setInputValue] = useState("");
  const [cookies] = useCookies();

  const name = cookies.name;



  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    if (document.querySelector("input").value) {
      socket.emit("message", {
        name: name,
        time: new Date(),
        id: socket.id,
        message: document.querySelector("input").value,
      });
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
