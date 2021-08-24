import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger/Messenger";
import FormEditProfile from "./components/FormEditProfile/FormEditProfile";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <div className="mainPage">
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/messenger" component={Messenger} />
        <ProtectedRoute exact path="/edit" component={FormEditProfile} />
        </div>
      </Switch>
    </div>
  );
}

export default App;
