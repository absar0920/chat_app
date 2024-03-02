import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "../styles/chat.css";

function Chat({ socket }) {
  const [messages, setMessages] = useState([]);

  const scrollAbleDivRef = useRef(null);

	useEffect(()=>{
  const chatDiv = scrollAbleDivRef.current;;
  chatDiv.scrollTop = chatDiv.scrollHeight
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
//if (document.querySelector("li")){

  
 // document.querySelectorAll("li")[-1].scrollIntoView({ behavior: 'smooth', block: 'end' });
//}
  return (
    <div className="ChatMessages" ref={scrollAbleDivRef}>
      <ul className="messagesList">
        {messages.map((message, index) => {
          // Check if the second part of the message matches the socket ID
          const isMine = message.split(" ")[0] == socket.id;

          // Dynamically assign the className based on the condition
          const className = isMine ? "mine" : "";

          // Remove the socket ID from the message
          const trimmedMessage = message.split(' ').slice(1).join(' ');
          console.log(trimmedMessage)
          return (
            <li key={index} className={className}>
              {trimmedMessage}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Chat;
