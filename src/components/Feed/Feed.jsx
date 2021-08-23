import React, { Component } from 'react';
import FeedPostContent from '../FeedPostContent/FeedPostContent';
import FeedJobContent from '../FeedJobContent/FeedJobContent';
import './Feed.css';

//This component handles the Post/Job Tabs and renders the main
// FeedJobContent and FeedPostContent elements
export class Feed extends Component {
  state = {
    toggledTab: 'posts',
  };

  toggleTab = (event) => {
    this.setState({ toggledTab: event.target.id });
  };

  render() {
    console.log(this.props.jobs);
    return (
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
            <FeedPostContent />
          ) : (
            <FeedJobContent
              jobs={this.props.jobs}
              loadJobs={this.props.loadJobs}
              showJobForm={this.props.showJobForm}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Feed;
