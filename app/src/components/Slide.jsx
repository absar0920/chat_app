import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Link, NavLink } from "react-router-dom";

import { useCookies } from "react-cookie";

import "../styles/slide.css";

function SlideFromLeft() {
  const [isVisible, setIsVisible] = useState(false);
  // const [roomsFromCookies, setRoomsFromCookies] = useState([]);

  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const name = cookies.name;
  let rooms = cookies.rooms;
  let roomArray = String(rooms).split("|");

  const handleLogoutClick = () => {
    removeCookie("name", { path: "/" });
    removeCookie("email", { path: "/" });
    removeCookie("password", { path: "/" });
    removeCookie("rooms", { path: "/" });

    window.location.href = "/";
  };

  const gotoHome = () => {
    return (
      <div className="goToHome">
        <NavLink to={"/"} className={"NavLinkForgoToHome"} id="Hello">
          <button id="buttonForGoToHome" className="goToHomeButton">
            Home
          </button>
        </NavLink>
      </div>
    );
  };

  const goToHomeWithName = (name) => {
    return (
      <div className="goToHomeWithName">
        <NavLink to={"/"} className={"NavLinkForgoToHomeWithName"} id="Hello">
          <button
            id="buttonForGoToHomeWithName"
            className="goToHomeButtonWithName"
          >
            Hi {name}
          </button>
        </NavLink>
      </div>
    );
  };

  return (
    <div>
      <button
        id="buttonForHamburgerButton"
        className="hamburgerOnButton"
        onClick={() => setIsVisible(!isVisible)}
      >
        <svg
          style={{ width: "26px", height: "28px", margin: "-8px" }}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="800px"
          height="800px"
          viewBox="0 0 12 12"
          enableBackground="new 0 0 12 12"
          id="Слой_1"
          version="1.1"
          xmlSpace="preserve"
        >
          <g>
            <rect fill="#1D1D1B" height="1" width="11" x="0.5" y="5.5" />
            <rect fill="#1D1D1B" height="1" width="11" x="0.5" y="2.5" />
            <rect fill="#1D1D1B" height="1" width="11" x="0.5" y="8.5" />
          </g>
        </svg>
      </button>
      <CSSTransition
        in={isVisible}
        timeout={500}
        classNames="slide-from-left"
        unmountOnExit
      >
        <div className="slide-from-left">
          <div className="hamburgerDiv">
            <div className="navForHamBurger">
              <div className="profile">
                {name ? goToHomeWithName(name) : gotoHome()}
              </div>
              <div className="backLogo">
                <button
                  id="buttonForBacklogo"
                  onClick={() => {
                    setIsVisible(!isVisible);
                  }}
                  className=""
                >
                  <svg
                    viewBox="0 0 12 12"
                    enableBackground="new 0 0 12 12"
                    id="Слой_1"
                    version="1.1"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    fill="#000000"
                    transform="matrix(1, 0, 0, -1, 0, 0)"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <polygon
                        fill="#1D1D1B"
                        points="12,0.7070313 11.2929688,0 6,5.2929688 0.7070313,0 0,0.7070313 5.2929688,6 0,11.2929688 0.7070313,12 6,6.7070313 11.2929688,12 12,11.2929688 6.7070313,6 "
                      ></polygon>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
            <div className="worldChat">
              <NavLink
                className={`worldChatBtn ${(e) =>
                  e.isActive ? "blue" : "else"}`}
                // id={(e) => {
                //   e.isActive ? "blue" : "else";
                // }}
                id="Hello1"
                to="/worldchat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#fff"
                    d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"
                  ></path>
                  <path
                    fill="#cfd8dc"
                    d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"
                  ></path>
                  <path
                    fill="#40c351"
                    d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"
                  ></path>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                World Chat
              </NavLink>
            </div>
            <div className="joinARoom">
              <NavLink
                to="/join"
                className={`joinRoom ${(e) => (e.isActive ? "blue" : "else")}`}
                // id={(e) => {
                //   e.isActive ? "blue" : "else";
                // }}
                id="Hello2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#4caf50"
                    d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
                  ></path>
                  <path fill="#fff" d="M21,14h6v20h-6V14z"></path>
                  <path fill="#fff" d="M14,21h20v6H14V21z"></path>
                </svg>
                Join a Room
              </NavLink>
            </div>
            <div className="createARoom">
              <NavLink
                className={`createRoom ${(e) =>
                  e.isActive ? "blue" : "else"}`}
                to="/create"
                // id={`${(e) => {
                //   e.isActive ? "blue" : "else";
                // }} hello`}
                id="Hello3"
              >
                Create A Room
              </NavLink>
            </div>
            <div className="logoutDiv">
              {name && (
                <button
                  id="buttonForLogout"
                  className="logoutButton"
                  onClick={handleLogoutClick}
                >
                  LOG OUT
                </button>
              )}
            </div>
            <div className="roomsDiv">
              {window.location.href.includes("/chat") &&
                roomArray.length >= 1 && (
                  <div className="headingForRooms">
                    Your Rooms:
                    {roomArray.map((room) => (
                      <button key={room} className="room">
                        <Link to={`/chat/${room}`}>{room}</Link>
                      </button>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default SlideFromLeft;
