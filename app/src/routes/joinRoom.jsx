import React from "react";
import SlideFromLeft from "../components/Slide";

import "../styles/createRoom.css";
import { useCookies } from "react-cookie";

const JoinRoom = () => {
  const [cookies] = useCookies();

  const name = cookies.name;
  const password = cookies.password;

  if (!name || !password) {
    window.location.href = "/login";
  }

  const handleClick = () => {
    if (document.querySelector("input").value) {
      //   socket.emit("joinRoom", document.querySelector("input").value);
      // alert(`/chat/${document.querySelector("input").value}`);
      window.location.href = `/chat/${document.querySelector("input").value}`;

      // document.querySelector("input").value = "";
    }
  };

  return (
    <>
      <div className="Navbar">
        <SlideFromLeft />
      </div>
      <div className="main">
        <h1 className="createHeading">Join a Room</h1>
        <div className="form cllector">
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
        </div>
      </div>
    </>
  );
};

export default JoinRoom;
