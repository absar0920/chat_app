import React, { useEffect, useRef, useState } from "react";
import SlideFromLeft from "../components/Slide";
import { useParams } from "react-router";

import "../styles/customChat.css";

const CustomChat = ({ socket }) => {
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const scrollAbleDivRef = useRef(null);

  useEffect(() => {
    // Function to handle incoming messages
    const handleMessageForRoom = (message) => {
      console.log(message, "m");
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // Attach event listener for incoming messages
    socket.on("messageForRoom", (message) => {
      console.log("Getting");

      handleMessageForRoom(message);
      console.log(messages);
    });

    // Clean-up function to remove event listener when component unmounts
    return () => {
      //   socket.off("messageForRoom", handleMessageForRoom);
      console.log("Returning");
    };
  }, [socket]);

  // Scroll to the bottom of the chat window
  useEffect(() => {
    const chatDiv = scrollAbleDivRef.current;
    chatDiv.scrollTop = chatDiv.scrollHeight;
  });

  const handleClick = () => {
    const inputMessage = document.querySelector("input").value;
    if (inputMessage) {
      socket.emit("chatMessageForRoom", {
        room: params.room,
        id: socket.id,
        message: inputMessage,
      });
      console.log(params.room, socket.id, inputMessage);
      document.querySelector("input").value = "";
    }
  };

  useEffect(() => {
    socket.emit("joinRoom", params.room);
  }, [socket, params.room]);

  return (
    <>
      <div className="Navbar">
        <SlideFromLeft />
        <div className="roomThing">Room Joined : {params.room}</div>
      </div>

      <div className="ChatMessages" ref={scrollAbleDivRef}>
        <ul className="messagesList">
          {messages.map((message, index) => {
            const isMine = message.id === socket.id;
            const className = isMine ? "mine" : "";
            const trimmedMessage = message.message;
            console.log(trimmedMessage);
            return (
              <li key={index} className={className}>
                {trimmedMessage}
              </li>
            );
          })}
        </ul>
      </div>
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
    </>
  );
};

export default CustomChat;
