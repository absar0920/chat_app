import React from "react";

// import Room from "./components/Room";
import Chat from "./components/chat";
import SecondMessage from "./components/secondMessage";
import SlideFromLeft from "./components/Slide";
import "./App.css";

function App({ socket }) {
  return (
    <>
      <div className="navbar">
        <div className="slideDiv">
          <SlideFromLeft />
        </div>
        <div className="mainText">Let's Chat</div>
      </div>
      <div className="chatArea">
        <Chat socket={socket} />
        <SecondMessage socket={socket} />
      </div>
      {/* <Room /> */}
    </>
  );
}

export default App;
