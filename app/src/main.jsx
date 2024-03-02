import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import io from "socket.io-client";

import App from "./App.jsx";
import CreateRoom from "./routes/createRoom.jsx";
import JoinRoom from "./routes/joinRoom.jsx";
import CustomChat from "./routes/customChat.jsx";
import Landing_page from "./routes/landing_page.jsx";
import Signup from "./routes/signup.jsx";

import "./index.css";

const socket = io("ws://localhost:8001");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing_page />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/worldchat",
    element: <App socket={socket} />,
  },
  {
    path: "/join",
    element: <JoinRoom />,
  },
  {
    path: "/create",
    element: <CreateRoom />,
  },
  {
    path: "/chat/:room",
    element: <CustomChat socket={socket}/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
