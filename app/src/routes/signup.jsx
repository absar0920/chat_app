import React from "react";
import { Link } from "react-router-dom";

import SlideFromLeft from "../components/Slide";

const Signup = () => {
  return (
    <>
      <div className="navBar">
        <SlideFromLeft />
      </div>
      <div className="mainSignUpArea">
        <h3 className="getStartedHeading">Let's Get You Started</h3>
        <form
          className="formForSignup"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="nameDiv">
            <label htmlFor="name">
              <span className="nameSpan">Your Name: </span>
              <input
                type="text"
                id="name"
                placeholder="Enter Your Name"
                required
              />
            </label>
          </div>
          <div className="emailDiv">
            <label htmlFor="email">
              <span className="emailSpan">Enter Your Email: </span>
              <input
                type="text"
                id="email"
                placeholder="Enter Your Email"
                required
              />
            </label>
          </div>
          <div className="passwordDiv">
            <label htmlFor="password">
              <span className="passwordSpan">Enter Your Password</span>
              <input
                type="password"
                id="password"
                placeholder="Enter Your Password"
              />
            </label>
          </div>
          <div className="submitDiv">
            <input type="submit" value="Sign Up" />
            <button className="loginasAnonymousUser">
              Login As Anonymous User
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
