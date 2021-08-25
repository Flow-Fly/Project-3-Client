import React, { Component } from 'react';
import FeedPostCard from '../FeedPostCard/FeedPostCard';
import './FeedPostContent.css';
// import Button from '../Base/Button/Button';
import { withUser } from '../Auth/withUser';

export class FeedPostContent extends Component {
  state = {
    searchedPost:null,
    allPosts:null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.searchingPost && this.props.posts.length !== 0) {
        let str = this.props.path.substring(1);

        const searchedPost = this.props.posts.filter(
          (e) => e._id.toString() === str
        );
        let allPosts = this.props.posts.filter((e) => e._id.toString() !== str);
        this.setState({
          searchedPost: searchedPost[0],
          allPosts: allPosts,
        });
      }
    }
  }

  createNewButton = (event) => {
    event.preventDefault();
    this.props.showPostForm('create');
  };

  render() {
    if (this.state.allPosts === [])
      return (
        <div className="FeedPostContent">
          <h4>Loading</h4>
        </div>
      );

    return (
      <div className="FeedPostContent">
        <button className="button-create-post" onClick={this.createNewButton}>
          Create post
        </button>
        {this.props.searchingPost && this.state.searchedPost && (
          <FeedPostCard
            key={this.state.searchedPost._id}
            showForm={this.props.showPostForm}
            onPostDeleted={this.props.onPostDeleted}
            refreshPost={this.props.loadPosts}
            post={this.state.searchedPost}
            clickOnProfile={this.props.clickOnProfile}
            userID={this.props.context.user._id}
            color='yellow'
            user={this.props.user}
          />
        )}

        {this.props.searchingPost &&
          this.state.searchedPost &&
          this.state.allPosts.map((post) => {
            return (
              <FeedPostCard
                key={post._id}
                showForm={this.props.showPostForm}
                onPostDeleted={this.props.onPostDeleted}
                refreshPost={this.props.loadPosts}
                post={post}
                clickOnProfile={this.props.clickOnProfile}
                userID={this.props.context.user._id}
                user={this.props.user}
              />
            );
          })}

        {!this.state.allPosts &&
          this.props.posts.map((post) => {
            return (
              <FeedPostCard
                key={post._id}
                showForm={this.props.showPostForm}
                onPostDeleted={this.props.onPostDeleted}
                refreshPost={this.props.loadPosts}
                post={post}
                clickOnProfile={this.props.clickOnProfile}
                userID={this.props.context.user._id}
                user={this.props.user}
              />
            );
          })}
      </div>
    );
  }
}

export default withUser(FeedPostContent);
