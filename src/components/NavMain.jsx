import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import { withRouter } from "react-router";
import apiHandler from "../api/apiHandler";
import logo  from "../Images/logo.png"


import "../styles/NavMain.css";
import Avatar from "./Base/Avatar/Avatar";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
        props.history.push('/')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="NavMain">
      <NavLink exact to="/">
        <img id="logo" src={logo} alt="logo"></img>
      </NavLink>
      <ul className="nav-list">
        {context.isLoggedIn && (
          <React.Fragment>  
            <li>
              <NavLink className="messengerNav" to="/messenger">
                Messenger
                <span className="notifications">3</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                {context.user && 
                <Avatar url={context.user.profileImg} size='tiny' />
                }
              </NavLink>
            </li>
            <li>
              <p onClick={handleLogout}>Logout</p>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/signin">Log in</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Create account</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withRouter(withUser(NavMain));
