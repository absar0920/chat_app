import React, { useEffect, useRef, useState } from "react";
import SlideFromLeft from "../components/Slide";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";

import "../styles/customChat.css";

const CustomChat = ({ socket }) => {
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const scrollAbleDivRef = useRef(null);

  const [cookies, setCookie, remove] = useCookies();

  const emailFromCookies = cookies.email;
  const passwordFromCookies = cookies.password;
  if (!emailFromCookies || !passwordFromCookies) {
    window.location.href = "/login";
  }

  const name = cookies.name;
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
        name: name,
        time: new Date(),
        room: params.room,
        id: socket.id,
        message: inputMessage,
      });
      console.log(params.room, socket.id, inputMessage);
      document.querySelector("input").value = "";
    }
  };

  useEffect(() => {
    socket.emit("joinRoom", {room: params.room, email: emailFromCookies});
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
                <div className="message">{trimmedMessage}</div>
                <div className="extraThings">
                  <span className="name">by : {message.name}</span>
                  <span className="date">{message.time}</span>
                </div>
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
