import React from 'react';
import { NavLink } from 'react-router-dom';
import { withUser } from '../components/Auth/withUser';
import { withRouter } from 'react-router';
import apiHandler from '../api/apiHandler';
import logo from '../Images/logo.png';


import "../styles/NavMain.css";
import Avatar from "./Base/Avatar/Avatar";
import { withMessenger } from "./MessengerCtx/withMessenger";

const NavMain = (props) => {
  const { context } = props;

  const notifications = () => {
    const id = props.context.user._id
    const notifications = 
      props.messengerContext.rooms
        .filter(room => room.notifications?.includes(id))
        .length
    
    return notifications
  }

  function handleLogout() {

    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
        return window.location = "/"
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="NavMain">
      <div className="nav-content">
        <NavLink className="logoLink" exact to="/">
          <img id="logo" src={logo} alt="logo"></img>
        </NavLink>
        <ul className="nav-list">
          {context.isLoggedIn && (
            <React.Fragment>
              <li>
                <NavLink to="/profile">
                  {context.user && (
                    <Avatar url={context.user.profileImg} size="tiny" />
                  )}
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
      </div>
    </nav>
  );
};

export default withRouter(withUser(withMessenger(NavMain)));
