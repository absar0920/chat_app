import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "../styles/chat.css";

import { useCookies } from "react-cookie";

function Chat({ socket }) {
  // State for storing messages
  const [messages, setMessages] = useState([]);

  // Get user's name from cookies
  const [cookies] = useCookies();
  const name = cookies.name;

  // Reference for scrolling to bottom of chat
  const scrollAbleDivRef = useRef(null);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    const chatDiv = scrollAbleDivRef.current;
    chatDiv.scrollTop = chatDiv.scrollHeight;
  });

  // Effect to establish socket connection and listen for incoming messages
  useEffect(() => {
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

          return (
            <li key={index} className={className}>
              <div className="message">{trimmedMessage}</div>
              <div className="extraThings">
                {/* Display sender's name and message time */}
                <span className="name">by: {(message.name) ? message.name : "unknown"}</span>
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
