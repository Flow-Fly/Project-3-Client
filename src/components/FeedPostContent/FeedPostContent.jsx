import React, { Component } from 'react'
import FeedPostCard from '../FeedPostCard/FeedPostCard'
import apiHandler from '../../api/apiHandler'
import "./FeedPostContent.css"
import Button from '../Base/Button/Button'
import { withUser } from '../Auth/withUser';

export class FeedPostContent extends Component {


    async componentDidMount(){

        
    }
    componentWillUnmount(){

    }

    createNewButton=(event)=>{
        event.preventDefault();
        this.props.showPostForm('create');
    }


    render() {
        if (this.props.posts===[]) return <div className="FeedPostContent">
                <h4>Loading</h4>
        </div>

        return (
            <div className="FeedPostContent">
            <Button className='createPostButton' onClick={this.createNewButton}>Create post</Button>
                {this.props.posts.map((post)=>{
                    return <FeedPostCard showForm={this.props.showPostForm} onPostDeleted={this.props.onPostDeleted} refreshPost={this.props.loadPosts} key={post._id} post={post} userID={this.props.context.user._id} />
                })}
            </div>
        )
    }
}

export default withUser(FeedPostContent)
