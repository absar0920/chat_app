import React from "react";
import { useCookies } from "react-cookie";
import SlideFromLeft from "../components/Slide";
import "../styles/createRoom.css";

function CreateRoom() {
  const [cookies] = useCookies();
  const name = cookies.name;
  const password = cookies.password;

  // Redirect to login page if name or password is missing
  if (!name || !password) {
    window.location.href = "/login";
  }

  // Function to handle the button click event
  const handleClick = () => {
    if (document.querySelector("input").value) {
      // Redirect to the chat room with the specified room name
      window.location.href = `/chat/${document.querySelector("input").value}`;
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
        <h1 className="createHeading">Create a New Room</h1>
        <div className="form cllector">
          {/* Form to input the room name */}
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
}

export default CreateRoom;
