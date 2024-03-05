import React from "react";

import Chat from "./components/chat";
import SecondMessage from "./components/secondMessage";
import SlideFromLeft from "./components/Slide";
import "./App.css";

function App({ socket }) {
  return (
    <>
      {/* Navbar */}
      <div className="navbar">
        <div className="slideDiv">
          <SlideFromLeft />
        </div>
        <div className="mainText">Let's Chat</div>
      </div>
      {/* Chat Area */}
      <div className="chatArea">
        <Chat socket={socket} /> {/* Main chat component */}
        <SecondMessage socket={socket} /> {/* Secondary message component */}
      </div>
    </>
  );
}

export default App;
