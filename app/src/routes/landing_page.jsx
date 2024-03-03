import React from "react";

import SlideFromLeft from "../components/Slide";

import { Link } from "react-router-dom";

import "../styles/landing_page.css";

const Landing_page = () => {
  return (
    <>
      <div className="navBar">
        <div className="slider">
          <SlideFromLeft />
        </div>
        <div className="textThing">Chating....</div>
      </div>
      <div className="main">
        <div className="mainText">
          <p className="paraAboveButton">
            <span className="textHeight">D</span>iscover seamless communication
            with our intuitive chat app. Effortlessly connect, share, and stay
            organized. Join us and experience the future of messaging.
          </p>
          <button className="getStartedButton">
            <Link to={"/signup"} className="linkTagForGetStarted">Get Started</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Landing_page;
