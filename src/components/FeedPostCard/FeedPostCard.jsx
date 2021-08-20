import React from 'react'
import "./FeedPostCard.css"

function FeedPostCard(props) {
    let post = props.post;
    console.log(`post`, post)

    return (
        <div className={"FeedPostCard "+post.type}>
            <div className="postCardType">{post.type}</div>
            
            <div>{post.title}</div>
            <p>{post.content}</p>
            <a href={post.link}>{post.link}</a>
            <img src={post.image}></img>
            <div>Published by: {post.creator.firstName + " " + post.creator.lastName} at {post.createdAt}</div>
        </div>
    )
}

export default FeedPostCard
