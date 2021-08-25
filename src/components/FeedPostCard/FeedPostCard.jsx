
import './FeedPostCard.css';
import Avatar from '../Base/Avatar/Avatar';
import { Link } from 'react-router-dom'
import apiHandler from "../../api/apiHandler"
import React, { useState } from 'react';

function FeedPostCard(props) {
  console.log('IN CARD: ', props)
  let post = props.post;
  //let favourited =post.creator.favouritePosts.includes(post._id);
  const [favouritedState, setFavourite] = useState(post.creator.favouritePosts.includes(post._id));
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
  function addToFavourites() {
    apiHandler.addFavouritePost(postId)
      .then((dbRes)=>setFavourite(true))
      .catch((error)=>{console.log(error)})
  }
  function removeFromFavourites() {
    apiHandler.deleteFavouritePost(postId)
      .then((dbRes)=>{setFavourite(false);})
      .catch((error)=>{console.log(error)})
    
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
        <div className="publishLinks">
        {ownPost === true && (
          <div >
            <a onClick={editCard} href="#">
              Edit
            </a>
            <a onClick={deleteCard} href="#">
              Delete
            </a>
          </div>
        )}
        {
          favouritedState === false ?(
            <a onClick={addToFavourites} href="#">
              Add to favourite
            </a>
          ) :
          (
            <a onClick={removeFromFavourites} href="#">
              Remove from Favourites
            </a>
          )
        }
        </div>

      </div>
      {post.title !== null && post.title !== undefined && post.title !== '' ? (
        <Link to={`/post/#${postId}`}><div className="postCardTitle">{post.title}</div></Link>
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
