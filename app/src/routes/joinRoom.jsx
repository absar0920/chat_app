import React from "react";
import SlideFromLeft from "../components/Slide";
import { useCookies } from "react-cookie";
import "../styles/createRoom.css"

const JoinRoom = () => {
  const [cookies] = useCookies();
  const name = cookies.name;
  const password = cookies.password;

  // Redirect to login page if name or password is missing
  if (!name || !password) {
    window.location.href = "/login";
  }

  // Function to handle joining a room
  const handleClick = () => {
    const inputValue = document.querySelector("input").value;
    if (inputValue) {
      window.location.href = `/chat/${inputValue}`;
    }
  };

  return (
    <>
      {/* Navbar component */}
      <div className="Navbar">
        <SlideFromLeft />
      </div>
      {/* Main content */}
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
