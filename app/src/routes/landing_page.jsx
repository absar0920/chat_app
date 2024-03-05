import React from "react";
import SlideFromLeft from "../components/Slide";
import { Link } from "react-router-dom";
import "../styles/landing_page.css";

const LandingPage = () => {
  return (
    <>
      {/* Navbar */}
      <div className="navBar">
        <div className="slider">
          <SlideFromLeft />
        </div>
        <div className="textThing">Chating....</div>
      </div>
      {/* Main content */}
      <div className="main">
        <div className="mainText">
          <p className="paraAboveButton">
            <span className="textHeight">D</span>iscover seamless communication
            with our intuitive chat app. Effortlessly connect, share, and stay
            organized. Join us and experience the future of messaging.
          </p>
          {/* Button to navigate to signup page */}
          <button className="getStartedButton">
            <Link to={"/signup"} className="linkTagForGetStarted">Get Started</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
