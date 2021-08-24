import React from 'react';
import './FeedPostCard.css';
import Avatar from '../Base/Avatar/Avatar';

function FeedPostCard(props) {
  let post = props.post;
  let userID = props.userID;
  let postId = post._id;
  let postUserID = post.creator ? post.creator._id : '';
  let ownPost = String(postUserID) === userID ? true : false;
  let firstName = post.creator
    ? post.creator.firstName !== undefined
      ? post.creator.firstName
      : ''
    : '';
  let lastName = post.creator
    ? post.creator.lastName !== undefined
      ? post.creator.lastName
      : ''
    : '';
  let userImage = post.creator
    ? post.creator.profileImg !== undefined
      ? post.creator.profileImg
      : ''
    : '';
  let createdAt = post.createdAt
    ? post.createdAt.replace('T', ' ').slice(0, 16)
    : '';

  function editCard() {
    props.showForm('edit', post);
  }

  function deleteCard() {
    props.onPostDeleted(postId);
  }

  return (
    <div className={'FeedPostCard ' + post.type.replaceAll(' ', '')}>
      <div className="postCardPublish">
        <div className="publishInfos">
          <div className="wrapper-avatar" onClick={props.clickOnProfile}>
            <Avatar url={userImage} size="tiny" id={postUserID} />
          </div>
          Published by: {firstName + ' ' + lastName} at {createdAt}
        </div>
        {ownPost === true && (
          <div className="publishLinks">
            <a onClick={editCard} href="#">
              Edit
            </a>
            <a onClick={deleteCard} href="#">
              Delete
            </a>
          </div>
        )}
      </div>
      {post.title !== null && post.title !== undefined && post.title !== '' ? (
        <div className="postCardTitle">{post.title}</div>
      ) : null}
      {post.content !== null &&
      post.content !== undefined &&
      post.content !== '' ? (
        <p>{post.content}</p>
      ) : null}
      {post.image !== null && post.image !== undefined && post.image !== '' ? (
        <img alt="" src={post.image}></img>
      ) : null}

      {post.link !== null && post.link !== undefined && post.link !== '' ? (
        <a className="postCardLink" href={post.link}>
          {post.link}
        </a>
      ) : null}
      {post.type !== null && post.type !== undefined && post.type !== '' ? (
        <div className="postCardType">{post.type}</div>
      ) : null}
    </div>
  );
}

export default FeedPostCard;
