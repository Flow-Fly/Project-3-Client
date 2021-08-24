import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./components/Auth/UserProvider";
import MessengerProvider from "./components/MessengerCtx/MessengerProvider"
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./styles/reset.css";
import "./styles/global.css";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <MessengerProvider>
        <App />
      </MessengerProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
