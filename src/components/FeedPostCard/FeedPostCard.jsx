import React, { Component } from 'react';
import './FeedPostCard.css';
import Avatar from '../Base/Avatar/Avatar';
import { Link } from 'react-router-dom';
import apiHandler from '../../api/apiHandler';
import { format } from 'timeago.js';

export class FeedPostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favouritedState: false,
      post: this.props.post,
    };
    this.userID = this.props.userID;
    this.user = this.props.user;
    this.state.postId = this.state.post._id;
    this.state.postUserID = this.state.post.creator
      ? this.state.post.creator._id
      : '';
    this.ownPost = String(this.state.postUserID) === this.userID ? true : false;
    this.firstName = this.state.post.creator
      ? this.state.post.creator.firstName !== undefined
        ? this.state.post.creator.firstName
        : ''
      : '';
    this.lastName = this.state.post.creator
      ? this.state.post.creator.lastName !== undefined
        ? this.state.post.creator.lastName
        : ''
      : '';
    this.userImage = this.state.post.creator
      ? this.state.post.creator.profileImg !== undefined
        ? this.state.post.creator.profileImg
        : ''
      : '';
    this.createdAt = this.state.post.createdAt
      ? format(this.state.post.createdAt)
      : '';
  }

  componentDidMount() {
    if (this.props.user !== null)
      this.setState({
        favouritedState: this.props.user.favouritePosts.includes(
          this.state.post._id
        ),
      });
  }
  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({
        favouritedState: this.props.user.favouritePosts.includes(
          this.state.post._id
        ),
      });
    }

    if (this.props.post !== prevProps.post) {
      this.setState({ post: this.props.post });
    }
  }

  editCard = () => {
    this.props.showForm('edit', this.state.post);
  };

  deleteCard = () => {
    console.log('to delete post ID ' + this.state.postId);
    this.props.onPostDeleted(this.state.postId);
  };

  addToFavourites = () => {
    apiHandler
      .addFavouritePost(this.state.postId)
      .then((dbRes) => {
        // console.log('i got here');
        this.setState({ favouritedState: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  removeFromFavourites = () => {
    apiHandler
      .deleteFavouritePost(this.state.postId)
      .then((dbRes) => this.setState({ favouritedState: false }))
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div
        className={
          'FeedPostCard ' +
          (this.state.favouritedState ? 'favourite' : '') +
          ' ' +
          (this.props.color && 'highlighted')
        }
      >
        <div className="postCardPublish">
          <div className="publishInfos">
            <div className="wrapper-avatar" onClick={this.props.clickOnProfile}>
              <Avatar
                url={this.userImage}
                size="small"
                id={this.state.postUserID}
                type={this.state.post.creator.type}
              />
            </div>
            <div className="publishInfos-title">
              <span className="publishInfos-title-name">
                {this.firstName + ' ' + this.lastName}
              </span>
              <span>{this.createdAt}</span>
            </div>
          </div>

          <div className="publishLinks">
            {this.ownPost === true && (
              <div>
                <span className="postCard" onClick={this.editCard}>
                  Edit
                </span>
                <span className="postCard" onClick={this.deleteCard}>
                  Delete
                </span>
              </div>
            )}

            {this.state.favouritedState === false ? (
              <span
                className="postCard favourites"
                onClick={this.addToFavourites}
              >
                <i className="far fa-star"></i>
              </span>
            ) : (
              <span
                className="postCard favourites"
                onClick={this.removeFromFavourites}
              >
                <i className="fas fa-star"></i>
              </span>
            )}
          </div>
        </div>

        <div className="postCard-body">
          <div className="postCard-body-image">
            {this.state.post.image !== null &&
            this.state.post.image !== undefined &&
            this.state.post.image !== '' ? (
              <img alt="" src={this.state.post.image}></img>
            ) : null}
          </div>

          <div className="postCard-body-content">
            {this.state.post.title !== null &&
            this.state.post.title !== undefined &&
            this.state.post.title !== '' ? (
              <Link to={`/post/#${this.state.postId}`}>
                <div className="postCardTitle">{this.state.post.title}</div>
              </Link>
            ) : null}

            {this.state.post.link !== null &&
            this.state.post.link !== undefined &&
            this.state.post.link !== '' ? (
              <a
                className="postCardLink"
                href={this.state.post.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.state.post.link}
              </a>
            ) : null}

            {this.state.post.content !== null &&
            this.state.post.content !== undefined &&
            this.state.post.content !== '' ? (
              <p>{this.state.post.content}</p>
            ) : null}
          </div>
        </div>

        {this.state.post.type !== null &&
        this.state.post.type !== undefined &&
        this.state.post.type !== '' ? (
          <div
            className={
              'postCardType ' + this.state.post.type.replaceAll(' ', '')
            }
          >
            {this.state.post.type}
          </div>
        ) : null}
      </div>
    );
  }
}

export default FeedPostCard;
