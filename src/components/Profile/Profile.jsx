import React, { Component } from 'react';
import Avatar from '../Base/Avatar/Avatar';
import './Profile.css';

export class Profile extends Component {
  //     user:
  // email: "florian.aube@gmail.com"
  // firstName: "Florian"
  // googleId: "110662071932272418064"
  // graduationYear: 2021
  // lastName: "Hgnaeqjhr"
  // location: "Paris"
  // phoneNumber: "009765432"
  // profileImg: "https://res.cloudinary.com/daxrpce1b/image/upload/v1629717124/oujg0f38rvtfa8ac8xrp.png"
  // type: "Web Dev"
  // __v: 0
  // _id: "6122850fda614b0e349eaa71"

  render() {
    const user = this.props.user;
    return (
      <React.Fragment>
        <div className="backdrop">
          <div className="profile-container">
            <Avatar url={user.profileImg} size="big" />
            <div className="close">X</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
