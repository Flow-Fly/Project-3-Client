import React from 'react';
import { withUser } from '../../Auth/withUser';
import Avatar from '../Avatar/Avatar';
import './SideProfile.css';
import { Link } from 'react-router-dom';
import FavoriteDetails from './FavoriteDetails';
import FavouriteList from '../../FavouriteList/FavouriteList';

class SideProfile extends React.Component {
  state = {
    displayFavs: false,
  };

  render() {
    const picture = null || this.props.context.user?.profileImg;
    const firstName = null || this.props.context.user?.firstName;
    const lastName = null || this.props.context.user?.lastName;
    const type = null || this.props.context.user?.type;
    const graduationYear = null || this.props.context.user?.graduationYear;
    const location = null || this.props.context.user?.location;
    const email = null || this.props.context.user?.email;
    const phoneNumber = null || this.props.context.user?.phoneNumber;
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
            {email && (
              <p>
                Email: <span>{email}</span>
              </p>
            )}
            {phoneNumber && (
              <p>
                Phone: <span>{phoneNumber}</span>
              </p>
            )}
          </div>
          <div
            className={'favorites ' + (this.state.displayFavs ? 'active' : '')}
          >
            <div
              className={'arrow ' + (this.state.displayFavs ? 'active' : '')}
              onClick={() =>
                this.setState({ displayFavs: !this.state.displayFavs })
              }
            >
              {this.state.displayFavs ?"⇧" :"⇩"}
            </div>
            {this.state.displayFavs && (
              <>
                <FavouriteList type="Post" />
                <FavouriteList type="Job" />
              </>
            )}
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
