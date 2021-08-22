import React from 'react'
import "./FeedPostCard.css"

function FeedPostCard(props) {
    let post = props.post;
    console.log(`post`, post)
    let firstName = post.firstName? post.firstName : "";
    let lastName = post.lastName? post.lastName : "";
    let createdAt = post.createdAt? post.createdAt.replace("T", " ").slice(0,16) : "";

    return (
        <div className={"FeedPostCard "+post.type.replaceAll(' ',"")}>
            {(post.type!==null &&post.type!==undefined &&post.type!=="")?<div className="postCardType">{post.type}</div> : null }
            {(post.title!==null &&post.title!==undefined &&post.title!=="")? <div>{post.title}</div> : null }
            {(post.content!==null &&post.content!==undefined &&post.content!=="")? <p>{post.content}</p> : null }
            <img alt="" src={post.image}></img>
            {(post.link!==null &&post.link!==undefined &&post.link!=="")? <a href={post.link}>{post.link}</a> : null }
            <div className="postCardPublish">Published by: {firstName + " " + lastName} at {createdAt}</div>
        </div>
    )
}

export default FeedPostCard
