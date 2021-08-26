import React from 'react';
import { withUser } from '../../Auth/withUser';
import Avatar from '../Avatar/Avatar';
import './SideProfile.css';
import { Link } from 'react-router-dom';
import FavoriteDetails from './FavoriteDetails';

class SideProfile extends React.Component {
  state = {
    displayFavs: false,
  };

  handleDisplayFavs = () => {
    if (this.state.displayFavs) {
        this.setState({displayFavs: !this.state.displayFavs})
    }
  }



  render() {
    const picture = null || this.props.context.user?.profileImg;
    const firstName = null || this.props.context.user?.firstName;
    const lastName = null || this.props.context.user?.lastName;
    const type = null || this.props.context.user?.type;
    const graduationYear = null || this.props.context.user?.graduationYear;
    const location = null || this.props.context.user?.location;
    console.log(this.props.context.user)
    return (
      <>
        <div className="side-profile-container">
          <div className="wrapper-picture-and-name">
            <Avatar url={picture} size="big" />
            <h5>
              {firstName}&nbsp;{lastName}
            </h5>
            {type && <h6>{type}</h6>}
          </div>
          <div className="informations">
            {graduationYear && (
              <p>
                Graduated in: <span>{graduationYear}</span>
              </p>
            )}
            {location && (
              <p>
                From: <span>{location} Campus</span>
              </p>
            )}
          </div>
          <div className={'favorites ' + this.state.displayFavs && 'active'}>
            <div className={"arrow " + this.state.displayFavs && 'active'} onClick={this.handleDisplayFavs}>
              <span>|</span>
              <span>|</span>
            </div>
            {this.state.displayFavs && <FavoriteDetails />}
          </div>
          <div className="edit-link">
            <Link to="/edit">Edit my profile</Link>
          </div>
        </div>
      </>
    );
  }
}

export default withUser(SideProfile);
