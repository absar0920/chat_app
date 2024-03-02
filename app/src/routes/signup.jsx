import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import SlideFromLeft from "../components/Slide";

const Signup = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  function validateEmail(email) {
    const regex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  const handleSignUpSubmit = async () => {
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    if (!validateEmail(email) && email) {
      return alert("Please Enter a Valid Email");
    }
    setCookie("name", name, { path: "/" });
    email ? setCookie("email", email, { path: "/" }) : "";

    window.location.href = "/worldchat";
  };
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
              <span className="nameSpan">Your Name: *</span>
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
              <input type="text" id="email" placeholder="Enter Your Email" />
            </label>
          </div>
          <div className="passwordDiv">
            <label htmlFor="password">
              <span className="passwordSpan">Enter Your Password *</span>
              <input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                required
              />
            </label>
          </div>
          <div className="submitDiv">
            <input type="submit" value="Sign Up" onClick={handleSignUpSubmit} />
            {/* <button className="loginasAnonymousUser">
              Login As Anonymous User
            </button> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
