import React, { Component } from 'react';
import './FeedPostCard.css';
import Avatar from '../Base/Avatar/Avatar';
import { Link } from 'react-router-dom'
import apiHandler from "../../api/apiHandler"
import Button from '../Base/Button/Button';


export class  FeedPostCard extends Component {

  constructor(props) {
    super(props);
    this.state={
      favouritedState:false,
      post:this.props.post,
    };
    this.userID = this.props.userID;
    this.user=this.props.user;
    this.postId = this.state.post._id;
    this.postUserID = this.state.post.creator ? this.state.post.creator._id : '';
    this.ownPost = String(this.postUserID) === this.userID ? true : false;
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
    ? this.state.post.createdAt.replace('T', ' ').slice(0, 16)
    : '';
  }



  componentDidMount(){
    if(this.props.user!==null) this.setState({favouritedState:this.props.user.favouritePosts.includes(this.state.post._id)})
  }
  componentDidUpdate(prevProps){
    if(this.props.user !== prevProps.user){
      this.setState({favouritedState:this.props.user.favouritePosts.includes(this.state.post._id)})
    }

    if(this.props.post!==prevProps.post){
      this.setState({post:this.props.post})
    }

  }
  
  

  editCard=()=> {
    this.props.showForm('edit', this.state.post);
  }

  deleteCard=()=> {
    console.log("to delete post ID "+this.postId)
    this.props.onPostDeleted(this.postId);
  }

  addToFavourites=()=> {
    apiHandler.addFavouritePost(this.postId)
      .then((dbRes)=>
      {console.log("i got here");this.setState({favouritedState:true})})
      .catch((error)=>{console.log(error)})
  }
  removeFromFavourites=() =>{
    apiHandler.deleteFavouritePost(this.postId)
      .then((dbRes)=>this.setState({favouritedState:false}))
      .catch((error)=>{console.log(error)})
  }

  render(){

    return (
      <div className={'FeedPostCard'+" "+ (this.state.favouritedState?'favourite':"") +" "+ (this.props.color && "highlighted")  } >
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
              <Button className="postCard" onClick={this.editCard}>Edit</Button>
              <Button className="postCard" onClick={this.deleteCard}>Delete</Button>
            </div>
          )}
          {
            this.state.favouritedState === false ?(
              <Button className="postCard favourites" onClick={this.addToFavourites}>☆</Button>
            ) :
            (
              <Button className="postCard favourites" onClick={this.removeFromFavourites}>★</Button>
            )
          }
          </div>
  
        </div>
        {this.state.post.title !== null && this.state.post.title !== undefined && this.state.post.title !== '' ? (
          <Link to={`/post/#${this.postId}`}><div className="postCardTitle">{this.state.post.title}</div></Link>
        ) : null}
        {this.state.post.content !== null &&
        this.state.post.content !== undefined &&
        this.state.post.content !== '' ? (
          <p>{this.state.post.content}</p>
        ) : null}
        {this.state.post.image !== null && this.state.post.image !== undefined && this.state.post.image !== '' ? (
          <img alt="" src={this.state.post.image}></img>
        ) : null}
  
        {this.state.post.link !== null && this.state.post.link !== undefined && this.state.post.link !== '' ? (
          <a className="postCardLink" href={this.state.post.link}>
            {this.state.post.link}
          </a>
        ) : null}
        {this.state.post.type !== null && this.state.post.type !== undefined && this.state.post.type !== '' ? (
          <div className={"postCardType"+" "+this.state.post.type.replaceAll(' ', '')}>{this.state.post.type}</div>
        ) : null}
      </div>
    );

  }
  
  
}

export default FeedPostCard;
