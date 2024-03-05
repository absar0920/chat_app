import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import SlideFromLeft from "../components/Slide";

import "../styles/signup.css";

const Signup = () => {
  // State to hold error message
  const [errorMessage, setErrorMessage] = useState(null);

  // Hook to access cookies
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  // Function to validate email format
  function validateEmail(email) {
    const regex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  // Check if user is already logged in, if so, redirect to chat
  const emailFromCookies = cookies.email;
  const passwordFromCookies = cookies.password;
  if (emailFromCookies && passwordFromCookies) {
    window.location.href = "/worldchat";
  }

  // Handle form submission
  const handleSignUpSubmit = async () => {
    if (
      document.querySelector("#name").value &&
      document.querySelector("#email").value &&
      document.querySelector("#password").value
    ) {
      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      if (!validateEmail(email) && email) {
        return alert("Please Enter a Valid Email");
      }

      const data = {
        fullName: name, // Corrected key to match server expectation
        email: email,
        password: password,
      };

      const body = JSON.stringify(data);

      const res = await fetch("http://localhost:8001/api/signup", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataOfResponse = await res.json();

      if (dataOfResponse.status === 200) {
        // Set cookies on successful signup
        setCookie("name", name, { path: "/" });
        setCookie("email", email, { path: "/" });
        setCookie("password", password, { path: "/" });
        window.location.href = "/worldchat";
      } else {
        // Clear input fields and display error message on failure
        document.querySelector("#name").value = "";
        document.querySelector("#email").value = "";
        document.querySelector("#password").value = "";
        setErrorMessage(dataOfResponse.message);
      }
    }
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
              <span className="emailSpan">Enter Your Email: *</span>
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
              <span className="passwordSpan">Enter Your Password: *</span>
              <input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                required
              />
            </label>
          </div>
          <div className="submitDiv">
            <input
              type="submit"
              value="Sign Up"
              onClick={handleSignUpSubmit}
            />
            <Link to={"/login"} className="alreadyHaveAnAccount">
              Already Have an account
            </Link>
          </div>
          <div className="errorDiv">
            {errorMessage && <p className="paraOfError">{errorMessage}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
