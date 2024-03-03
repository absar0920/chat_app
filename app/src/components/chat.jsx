import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "../styles/chat.css";

import { useCookies } from "react-cookie";

function Chat({ socket }) {
  const [messages, setMessages] = useState([]);

  const [cookies] = useCookies();

  const name = cookies.name;

  const scrollAbleDivRef = useRef(null);

  useEffect(() => {
    const chatDiv = scrollAbleDivRef.current;
    chatDiv.scrollTop = chatDiv.scrollHeight;
  });

  useEffect(() => {
    // Establish socket connection when component mounts

    // Listen for incoming messages from the server
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="ChatMessages" ref={scrollAbleDivRef}>
      <ul className="messagesList">
        {messages.map((message, index) => {
          // Check if the second part of the message matches the socket ID
          const isMine = message.id == socket.id;

          // Dynamically assign the className based on the condition
          const className = isMine ? "mine" : "";

          // Remove the socket ID from the message
          const trimmedMessage = message.message;
          console.log(trimmedMessage);
          return (
            <li key={index} className={className}>
              <div className="message">{trimmedMessage}</div>
              <div className="extraThings">
                <span className="name">by : {(message.name) ? message.name: "unknown"}</span>
                <span className="date">{message.time}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Chat;
