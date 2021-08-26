import React, { Component } from 'react';
import Avatar from '../Base/Avatar/Avatar';
import './Profile.css';
import Button from '../Base/Button/Button';
import { withUser } from '../Auth/withUser';

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
    console.log(this.props);
    const user = this.props.user;
    const name =
      this.props.context.user._id === user._id ? 'Your' : user.firstName;
      const owner = this.props.context.user._id === user._id
    return (
      <React.Fragment>
        <div className="backdrop">
          <div className="wrapper-profile">
            <div className="profile-container">
              <div className="main-infos">
                <Avatar url={user.profileImg} size="big" />
                <h5>
                  {user.firstName} {user.lastName}
                </h5>
              </div>
              <Button className="close" onClick={this.props.close}>
                X
              </Button>

              <div className="profile-content">
                <div className="post-created">
                  <div className="title">
                    <h4>{name} posts:</h4>
                  </div>
                  <div className="content">
                    {this.props.posts ? (
                      this.props.posts.map((post) => {
                        return (
                          <div className="small-card">
                            <p>{post.title}</p>
                            {owner && <p onClick={() => this.editCard(post)}>Edit</p>}
                            {owner && <p onClick={() => this.deleteCard(post._id)}>
                              Delete
                            </p>}
                          </div>
                        );
                      })
                    ) : (
                      <div className="small-card">
                        <p>Go and spread fun!</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="job-created">
                  <div className="title">
                    <h4>{name} created jobs:</h4>
                  </div>
                  <div className="content">
                    {this.props.jobs ? (
                      this.props.jobs.map((job) => {
                        return (
                          <div className="small-card">
                            <p>{job.title}</p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="small-card">
                        <p>Go and recruit your friends!</p>
                      </div>
                    )}
                  </div>
                </div>
                {name === 'Your' && (
                  <div className="saved-list">
                    <div className="title">
                      <h4>{name} saved list:</h4>
                    </div>
                    <div className="content"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withUser(Profile);
