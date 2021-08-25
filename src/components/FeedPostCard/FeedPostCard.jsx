import React, { Component } from 'react';
import './FeedPostCard.css';
import Avatar from '../Base/Avatar/Avatar';
import { Link } from 'react-router-dom'
import apiHandler from "../../api/apiHandler"


export class  FeedPostCard extends Component {

  constructor(props) {
    super(props);
    this.state={
      favouritedState:false,
    };
    this.post = this.props.post;
    this.userID = this.props.post.userID;
    this.user=this.props.user;
    this.postId = this.props.post._id;
    this.postUserID = this.props.post.creator ? this.props.post.creator._id : '';
    this.ownPost = String(this.postUserID) === this.userID ? true : false;
    this.firstName = this.post.creator
    ? this.post.creator.firstName !== undefined
      ? this.post.creator.firstName
      : ''
    : '';
    this.lastName = this.post.creator
    ? this.post.creator.lastName !== undefined
      ? this.post.creator.lastName
      : ''
    : '';
    this.userImage = this.post.creator
    ? this.post.creator.profileImg !== undefined
      ? this.post.creator.profileImg
      : ''
    : '';
    this.createdAt = this.post.createdAt
    ? this.post.createdAt.replace('T', ' ').slice(0, 16)
    : '';
  }



  componentDidMount(){
    if(this.props.user!==null) this.setState({favouritedState:this.props.user.favouritePosts.includes(this.post._id)})
  }
  componentDidUpdate(prevProps){
    if(this.props.user !== prevProps.user){
      this.setState({favouritedState:this.props.user.favouritePosts.includes(this.post._id)})
    }
  }
  
  

  editCard=()=> {
    this.props.showForm('edit', this.post);
  }
  deleteCard=()=> {
    this.props.onPostDeleted(this.postId);
  }

  addToFavourites=()=> {
    apiHandler.addFavouritePost(this.postId)
      .then((dbRes)=>this.setState({favouritedState:true}))
      .catch((error)=>{console.log(error)})
  }
  removeFromFavourites=() =>{
    apiHandler.deleteFavouritePost(this.postId)
      .then((dbRes)=>this.setState({favouritedState:false}))
      .catch((error)=>{console.log(error)})
  }

  render(){
    return (
      <div style={this.props.color && {boxShadow: `0 0 .5em .25em ${this.props.color}`}}  className={'FeedPostCard ' + this.post.type.replaceAll(' ', '') +" "+ (this.state.favouritedState?'favourite':"") } >
        <div className="postCardPublish">
          <div className="publishInfos">
            <div className="wrapper-avatar" onClick={this.props.clickOnProfile}>
              <Avatar url={this.userImage} size="tiny" id={this.postUserID} />
            </div>
            Published by: {this.firstName + ' ' + this.lastName} at {this.createdAt}
          </div>
          <div className="publishLinks">
          {this.ownPost === true && (
  
            <div >
              <a onClick={this.editCard} href="#">
                Edit
              </a>
              <a onClick={this.deleteCard} href="#">
                Delete
              </a>
            </div>
          )}
          {
            this.state.favouritedState === false ?(
              <a onClick={this.addToFavourites} href="#">
                Add to favourite
              </a>
            ) :
            (
              <a onClick={this.removeFromFavourites} href="#">
                Remove from Favourites
              </a>
            )
          }
          </div>
  
        </div>
        {this.post.title !== null && this.post.title !== undefined && this.post.title !== '' ? (
          <Link to={`/post/#${this.postId}`}><div className="postCardTitle">{this.post.title}</div></Link>
        ) : null}
        {this.post.content !== null &&
        this.post.content !== undefined &&
        this.post.content !== '' ? (
          <p>{this.post.content}</p>
        ) : null}
        {this.post.image !== null && this.post.image !== undefined && this.post.image !== '' ? (
          <img alt="" src={this.post.image}></img>
        ) : null}
  
        {this.post.link !== null && this.post.link !== undefined && this.post.link !== '' ? (
          <a className="postCardLink" href={this.post.link}>
            {this.post.link}
          </a>
        ) : null}
        {this.post.type !== null && this.post.type !== undefined && this.post.type !== '' ? (
          <div className="postCardType">{this.post.type}</div>
        ) : null}
      </div>
    );

  }
  
  
}

export default FeedPostCard;
