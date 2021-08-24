import React, { Component } from 'react';
import FeedPostContent from '../FeedPostContent/FeedPostContent';
import FeedJobContent from '../FeedJobContent/FeedJobContent';
import apiHandler from '../../api/apiHandler';
import './Feed.css';
import Profile from '../../pages/Profile';
//This component handles the Post/Job Tabs and renders the main
// FeedJobContent and FeedPostContent elements
export class Feed extends Component {
  state = {
    toggledTab: 'posts',
    displayProfile: false,
    user: null,
  };

  clickOnProfile = async (e) => {
    const id = e.target.getAttribute('data-id');
    try {
      const profile = await apiHandler.getUser(id);
      this.setState({
        displayProfile: true,
        user: profile,
      });
    } catch (e) {
      console.error(e);
    }
  };

  toggleTab = (event) => {
    this.setState({ toggledTab: event.target.id });
  };

  render() {
    return (
      <>
        {this.state.displayProfile && <Profile user={this.state.user} />}
        <div className="feedContainer">
          <div className="feedTabs">
            <div
              onClick={this.toggleTab}
              id="posts"
              className={
                this.state.toggledTab === 'posts' ? 'tabs active' : 'tabs left'
              }
            >
              Posts
            </div>
            <div
              onClick={this.toggleTab}
              id="jobs"
              className={
                this.state.toggledTab === 'jobs' ? 'tabs active' : 'tabs right'
              }
            >
              Jobs
            </div>
          </div>

          <div className="feedContentWrapper">
            {this.state.toggledTab === 'posts' ? (
              <FeedPostContent
                posts={this.props.posts}
                loadPosts={this.props.loadPosts}
                showPostForm={this.props.showPostForm}
                onPostDeleted={this.props.onPostDeleted}
                clickOnProfile={this.clickOnProfile}
              />
            ) : (
              <FeedJobContent
                jobs={this.props.jobs}
                // loadJobs={this.props.loadJobs}
                showJobForm={this.props.showJobForm}
                handleJobDelete={this.props.handleJobDelete}
                handleEditStart={this.props.handleEditStart}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Feed;
