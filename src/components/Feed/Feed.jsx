import React, { Component } from 'react';
import FeedPostContent from '../FeedPostContent/FeedPostContent';
import FeedJobContent from '../FeedJobContent/FeedJobContent';
import apiHandler from '../../api/apiHandler';
import './Feed.css';
import Profile from '../Profile/Profile';
import { withUser } from '../Auth/withUser';
//This component handles the Post/Job Tabs and renders the main
// FeedJobContent and FeedPostContent elements
export class Feed extends Component {
  state = {
    toggledTab: 'posts',
    displayProfile: false,
    user: null,
    currentUser:null,
  };

  clickOnProfile = async (e) => {

    const id = e.target.getAttribute('data-id');
    if (!id) return console.log('id: ', id);
    try {
      const profile = await apiHandler.getUser(id);
      console.log(profile);
      let filteredJobs = this.props.jobs.filter(
        (job) => job.creator._id.toString() === profile._id.toString()
      );
      let filteredPosts = this.props.posts.filter(
        (post) => post.creator._id.toString() === profile._id.toString()
      );
      filteredPosts = filteredPosts.length === 0 ? null : filteredPosts;
      filteredJobs = filteredJobs.length === 0 ? null : filteredJobs;

      this.setState({
        displayProfile: true,
        user: profile,
        filteredJobs,
        filteredPosts
      });
    } catch (e) {
      console.error(e);
    }
  };

  closeProfile = () => {
    this.setState({
      displayProfile: false,
      user: null,
    });
  };

  async componentDidMount() {

    try {
      const profile = await apiHandler.getUser(this.props.context.user._id);
      this.setState({
        currentUser: profile,
      });
    } catch (e) {
      console.error(e);
    }

    if (this.props.toJob) {
      this.props.toggleFilterTab('jobs')
    }
  }

  toggleTab = (event) => {
    this.props.toggleFilterTab(event.target.id)
  };

  render() {
   
    return (
      <>
        {this.state.displayProfile && (
          <Profile
            user={this.state.user}
            close={this.closeProfile}
            posts={this.state.filteredPosts}
            jobs={this.state.filteredJobs}
            showForm={this.props.showPostForm}
            deletePost={this.props.onPostDeleted}
          />
        )}
        <div className="feedContainer">
          <div className="feedTabs">
            <div
              onClick={this.toggleTab}
              id="posts"
              className={
                this.props.filterTab === 'posts' ? 'tabs active' : 'tabs left'
              }
            >
              Posts
            </div>
            <div
              onClick={this.toggleTab}
              id="jobs"
              className={
                this.state.filterTab === 'jobs' ? 'tabs active' : 'tabs right'
              }
            >
              Jobs
            </div>
          </div>

          <div className="feedContentWrapper">
            {this.props.filterTab === 'posts' ? (
              <FeedPostContent
                posts={this.props.posts}
                loadPosts={this.props.loadPosts}
                showPostForm={this.props.showPostForm}
                showAddPostForm={this.props.showAddPostForm}
                closePostForm={this.props.closePostForm}
                onPostDeleted={this.props.onPostDeleted}
                clickOnProfile={this.clickOnProfile}
                user={this.state.currentUser}
                path={this.props.path}
                searchingPost={this.props.toPost}
              />
            ) : (
              <FeedJobContent
                jobs={this.props.jobs}
                // loadJobs={this.props.loadJobs}
                showJobForm={this.props.showJobForm}
                showAddJobForm={this.props.showAddJobForm}
                handleJobDelete={this.props.handleJobDelete}
                handleEditStart={this.props.handleEditStart}
                closeJobForm={this.props.closeJobForm}
                clickOnProfile={this.clickOnProfile}
                searchingJob={this.props.toJob}
                user={this.state.currentUser}
                path={this.props.path}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default withUser(Feed);
