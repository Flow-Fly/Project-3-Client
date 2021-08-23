import React from 'react'
import "./FeedPostCard.css"
import Avatar from '../Base/Avatar/Avatar'

function FeedPostCard(props) {
    let post = props.post;
    let userID=props.userID;
    let postUserID = post.creator ? post.creator._id : "";
    let ownPost=(String(postUserID)===userID ? true : false)
    let firstName = post.creator? post.creator.firstName!==undefined? post.creator.firstName : "" :"";
    let lastName = post.creator ? post.creator.lastName !==undefined? post.creator.lastName : "":"";
    let userImage = post.creator ? post.creator.profileImg !==undefined? post.creator.profileImg : "":"";
    let createdAt = post.createdAt? post.createdAt.replace("T", " ").slice(0,16) : "";

    return (
        <div className={"FeedPostCard "+post.type.replaceAll(' ',"")}>
            <div className="postCardPublish">
                <div className="publishInfos">
                <Avatar url={userImage} size='tiny' />Published by: {firstName + " " + lastName} at {createdAt}
                </div>
                {ownPost===true && <div className="publishLinks">
                <a href="#">Edit</a>
                <a href="#">Delete</a>
                </div>}
                
            </div>
            {(post.title!==null &&post.title!==undefined &&post.title!=="")? <div>{post.title}</div> : null }
            {(post.content!==null &&post.content!==undefined &&post.content!=="")? <p>{post.content}</p> : null }
            <img alt="" src={post.image}></img>
            {(post.link!==null &&post.link!==undefined &&post.link!=="")? <a href={post.link}>{post.link}</a> : null }
            {(post.type!==null &&post.type!==undefined &&post.type!=="")?<div className="postCardType">{post.type}</div> : null }
        </div>
    )
}

export default FeedPostCard
