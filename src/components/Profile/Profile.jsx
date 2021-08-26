import React, { Component } from 'react';
import Avatar from '../Base/Avatar/Avatar';
import './Profile.css';
import Button from '../Base/Button/Button';
import { withUser } from '../Auth/withUser';
//import FavouriteList from '../FavouriteList/FavouriteList';

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
  async componentDidMount() {}

  editCard = (post) => {
    this.props.showForm('edit', post);
  };

  deleteCard = (postId) => {
    this.props.deletePost(postId);
  };

  render() {
    const user = this.props.user;
    // const name =
    //   this.props.context.user._id === user._id ? 'Your' : user.firstName;
    //   const owner = this.props.context.user._id === user._id
    return (
      <React.Fragment>
        <div className="backdrop">
          <div className="wrapper-profile">
            <div className="profile-container">
              <div className="main-infos">
                    <div className="profilHeader">
                    <Avatar url={user.profileImg} size="huge" />    
                        <div className="infoDiv">
                          <h5>{user.firstName} {user.lastName}</h5>
                        </div>
                    </div>
                      <div className="profile-content">
                        <div className="infoDiv">
                          <span className="strongSpan">Graduated in:</span> 
                          <span className="infoSpan">{user.graduationYear} </span>
                        </div>
                        <div className="infoDiv">
                          <span className="strongSpan">Location:</span> 
                          <span className="infoSpan">{user.location} </span>
                        </div>
                        <div className="infoDiv">
                          <span className="strongSpan">Field:</span>
                          <span className="infoSpan">{user.type} </span> 
                        </div>
                        <div className="infoDiv">
                          <span className="strongSpan">Email:</span> 
                          <span className="infoSpan">{user.email} </span>
                        </div>
                        <div className="infoDiv">
                          <span className="strongSpan">Phone:</span> 
                          <span className="infoSpan">{user.phoneNumber} </span>
                        </div>
                      </div>
                  <Button className="close" onClick={this.props.close}>
                   X
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withUser(Profile);
