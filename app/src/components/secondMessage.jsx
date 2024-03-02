import React, { useState } from "react";
import io from "socket.io-client";
import "../styles/sendMessage.css"

const SecondMessage = ({socket}) => {
  // const [inputValue, setInputValue] = useState("");
  

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    if (document.querySelector("input").value) {
      socket.emit("message", `${socket.id} ${document.querySelector("input").value}`);
      document.querySelector("input").value = ""
    }
  };

  return (
    <form onSubmit={(e)=>{e.preventDefault()}} className="sendMessage">
      <input
        type="text"
        name="message"
        id="message"
      />
      <button className="btn" onClick={handleClick}>
        Send
      </button>
    </form>
  );
};

export default SecondMessage;
