import React, { useEffect, useRef, useState } from "react";
import SlideFromLeft from "../components/Slide";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import "../styles/customChat.css";

const CustomChat = ({ socket }) => {
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const scrollAbleDivRef = useRef(null);
  const [cookies, setCookie] = useCookies();
  const emailFromCookies = cookies.email;
  const passwordFromCookies = cookies.password;

  // Redirect to login page if email or password is missing
  if (!emailFromCookies || !passwordFromCookies) {
    window.location.href = "/login";
  }

  const name = cookies.name;

  useEffect(() => {
    // Function to handle incoming messages
    const handleMessageForRoom = (message) => {
      if (params.room === message.room) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    // Attach event listener for incoming messages
    socket.on("messageForRoom", handleMessageForRoom);

    // Clean-up function to remove event listener when component unmounts
    return () => {
      socket.off("messageForRoom", handleMessageForRoom);
    };
  }, [socket, params.room]);

  // Scroll to the bottom of the chat window
  useEffect(() => {
    const chatDiv = scrollAbleDivRef.current;
    chatDiv.scrollTop = chatDiv.scrollHeight;
  });

  // Function to handle sending a message
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
      document.querySelector("input").value = "";
    }
  };

  useEffect(() => {
    // Emit 'joinRoom' event when component mounts to join the specified room
    socket.emit("joinRoom", { room: params.room, email: emailFromCookies });
  }, [socket, params.room]);

  // Function to update the rooms list in cookies
  async function updateRoom() {
    const headers = {
      "Content-Type": "application/json",
    };

    let body = {
      email: emailFromCookies,
      roomToJoin: params.room,
    };

    body = JSON.stringify(body);

    const res = await fetch("http://localhost:8001/api/update_rooms", {
      method: "POST",
      headers: headers,
      body: body,
    });

    const dataFromUpdateRoom = await res.json();

    if (dataFromUpdateRoom.status === 200) {
      let rooms = dataFromUpdateRoom.details.rooms;
      rooms = rooms.join("|");
      setCookie("rooms", rooms, { path: "/chat" });
    }
  }

  // Call the updateRoom function
  updateRoom();

  return (
    <>
      {/* Navbar component */}
      <div className="Navbar">
        <SlideFromLeft />
        <div className="roomThing">Room Joined: {params.room}</div>
      </div>

      {/* Chat messages */}
      <div className="ChatMessages" ref={scrollAbleDivRef}>
        <ul className="messagesList">
          {messages.map((message, index) => {
            const isMine = message.id === socket.id;
            const className = isMine ? "mine" : "";
            const trimmedMessage = message.message;
            return (
              <li key={index} className={className}>
                <div className="message">{trimmedMessage}</div>
                <div className="extraThings">
                  <span className="name">by: {message.name}</span>
                  <span className="date">{message.time}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Input form for sending messages */}
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
