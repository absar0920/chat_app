import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import SlideFromLeft from "../components/Slide";

import "../styles/login.css";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();

  function validateEmail(email) {
    const regex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  const emailFromCookies = cookies.email;
  const passwordFromCookies = cookies.password;
  if (emailFromCookies && passwordFromCookies) {
    window.location.href = "/worldchat";
  }

  const handleLoginSubmit = async () => {
    if (
      document.querySelector("#email").value &&
      document.querySelector("#password").value
    ) {
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      if (!validateEmail(email) && email) {
        return alert("Please Enter a Valid Email");
      }

      const data = {
        email: email,
        password: password,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const body = JSON.stringify(data);

      const res = await fetch("http://localhost:8001/api/login", {
        method: "POST",
        body: body,
        headers: headers,
      });
      const dataOfResponse = await res.json();

      if (dataOfResponse.status === 200) {
        const rooms = dataOfResponse.details.rooms;
        const roomString = rooms.join("|");
        setCookie("name", dataOfResponse.details.name, { path: "/" });
        setCookie("email", dataOfResponse.details.email, { path: "/" });
        setCookie("password", dataOfResponse.details.password, { path: "/" });
        setCookie("rooms", roomString, { path: "/chat" });
        window.location.href = "/worldchat";
      } else {
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
      <div className="mainLoginArea">
        <h3 className="comingBackHeading">Coming Back......</h3>
        <form
          className="formForLogin"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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
              value="Login"
              onClick={handleLoginSubmit}
            />
            <Link to={"/signup"} className="alreadyHaveAnAccount">
              don't have an account? Sign up
            </Link>
          </div>
          <div className="errorMessageDiv">
            {errorMessage && <p className="errorPara">{errorMessage}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
