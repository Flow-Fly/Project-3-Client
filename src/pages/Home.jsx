import React from 'react';
import SideProfile from '../components/Base/SideProfile/SideProfile';
import Feed from '../components/Feed/Feed';
import FormArticle from '../components/FormArticle/FormArticle';
import FormJob from '../components/FormJob/FormJob';
import KUTE from 'kute.js';
import { withUser } from '../components/Auth/withUser';
import '../styles/Home.css';
import logo from '../Images/logo.png';
// import { Link } from 'react-router-dom';
import apiHandler from '../api/apiHandler';
import { withMessenger } from '../components/MessengerCtx/withMessenger';
import messengerIcon from '../Images/messenger.png';
import '../styles/messengerIcon.css';
import Messenger from './Messenger/Messenger';
//test
import Button from '../components/Base/Button/Button';
import FormSignin from '../components/Forms/FormSignin';
import FormSignup from '../components/Forms/FormSignup';
import FilterJobs from '../components/FilterJobs/FilterJobs';
import FilterPost from '../components/FilterPost/FilterPost';

  class Home extends React.Component {
  state = {
    displayedJob: null,
    jobs: [],
    showAddJobForm: false,
    jobFormAction: 'create',
    jobFormJob: null,
    /////////
    displayedPost: null,
    posts: [],
    showAddPostForm: false,
    postFormAction: 'create',
    //for filters
    originalJobs: [],
    originalPosts: [],
    ////////
    displayMessenger: false,
    displayInblob: null,
    blobStarted: false,
    hashPath:null, //test
    filterTab: 'posts' 
  };

  toggleFilterTab = (id) => {
    this.setState({filterTab: id})
  }

  ////////job related////////////
  // 2 api calls on FormJob(create and update), 1 here(delete)
  //toggle jobForm
  showJobForm = (action) => {
    this.setState({
      showAddJobForm: true,
      jobFormAction: 'create',
      jobFormJob: null,
    });
  };

  closeJobForm = () => {
    this.setState({ showAddJobForm: false });
  };

  //toggle form for job edit
  handleEditStart = (job) => {
    this.setState({
      showAddJobForm: true,
      jobFormAction: 'edit',
      jobFormJob: job,
    });
  };

  //render created job
  handleJobCreated = (createdJob) => {
    this.setState({
      jobs: [createdJob, ...this.state.jobs],
      showAddJobForm: false,
      jobFormAction: 'edit',
      // to clean up job form after
      jobFormJob: null,
      originalJobs: [...this.state.jobs],
    });
  };

  //render updated job
  handleJobUpdated = (updatedJob) => {
    const jobs = [...this.state.jobs].map((job) =>
      job._id === this.state.jobFormJob._id ? updatedJob : job
    );
    this.setState({
      jobs: jobs,
      showAddJobForm: false,
      jobFormAction: 'edit',
      jobFormJob: null,
      originalJobs: [...this.state.jobs],
    });
  };

  //delete job
  handleJobDelete = (jobId) => {
    apiHandler
      .deleteJob(jobId)
      .then(() => {
        this.setState({
          jobs: this.state.jobs.filter((job) => job._id !== jobId),
          originalJobs: [...this.state.jobs],
        });
      })
      .catch((err) => console.log(err));
  };

  //filter jobs
  filterJobs = (filters) => {
    let filteredJobs = [...this.state.originalJobs];

    // Object.entries method combine Object.key & Object.value
    // inside forEach, destruct directly
    Object.entries(filters).forEach(([attribute, values]) => {
      if (values.length > 0) {
        filteredJobs = filteredJobs.filter((job) => {
          return values.includes(job[attribute]);
        });
      }
    });

    this.setState({
      jobs: filteredJobs,
    });
  };

  ////////post related///////////////////
  //Toggle postForm
  showPostForm = (action, post) => {
    console.log("Iam being called")
    this.setState({
      showAddPostForm: true,
      postFormAction: action,
      displayedPost: post,
    });
  };

  closePostForm = () => {
    this.setState({ showAddPostForm: false, displayedPost: null });
  };

  handlePostCreated = (createdPost) => {
    this.setState({
      posts: [createdPost, ...this.state.posts],
      showAddJobForm: false,
      showAddPostForm: false,
      postFormAction: 'create',
    });
  };

  //render updated posts
  handlePostUpdated = (updatedPost) => {

    const refreshedPosts = this.state.posts.map((post) =>{
      if (String(post._id) === String(updatedPost._id))
      {
        console.log("match")
        return updatedPost
      }

      else {
        return post
      }
    }
    );
    this.setState({
      posts: refreshedPosts,
      showAddPostForm: false,
      postFormAction: 'create',
    });
  };

  //delete post
  handlePostDelete = (postId) => {
    apiHandler
      .deleteOnePost(postId)
      .then(() => {
        console.log('delete worked')
        this.setState({
          posts: this.state.posts.filter((post) => post._id !== postId),
        });
      })
      .catch((err) => console.log(err));
  };

  //to filter post via the panel
  handlePostFilter = (filters) => {
    let tempPosts =
      filters.length === 0
        ? [...this.state.originalPosts]
        : this.state.originalPosts.filter((post) => {
            return filters.includes(post.type);
          });

    this.setState({ posts: tempPosts });
  };

  //////////blob related///////
  blob1Ref = React.createRef();
  blob2Ref = React.createRef();

  async componentDidMount() {

    if(!this.props.context.isLoggedIn) return

    try {
      console.log('try')
      let posts = await apiHandler.getAllPost();
      let jobsInfo = await apiHandler.getJobs();
      
      this.setState({
        originalJobs: jobsInfo,
        jobs: jobsInfo,
        posts: posts,
        originalPosts: posts,
        hashPath:this.props.location.hash //test
      });
    } catch (error) {
      console.log(error);
    }
  }

  // loadJobs = async () => {
  //   // console.log('called');
  //   try {
  //     let jobsInfo = await apiHandler.getJobs();
  //     this.setState({ jobs: jobsInfo });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.context.isLoggedIn === false) {
      if (this.state.blobStarted === false) {
        const tween = KUTE.fromTo(
          this.blob1Ref.current,
          { path: this.blob1Ref.current },
          { path: this.blob2Ref.current },
          { repeat: 999, duration: 3000, yoyo: true }
        );
        tween.start();
        this.setState({ blobStarted: true });
      }
    }

    if(this.props.location.hash!==prevProps.location.hash){
      console.log("hash updated")
      this.setState({hashPath:this.props.location.hash})
    }
    
    if(prevProps === this.props) return
    if(!this.props.context.isLoggedIn) return
    try {
      console.log('TRYTRY')
      let posts = await apiHandler.getAllPost();
      let jobsInfo = await apiHandler.getJobs();
      
      this.setState({
        originalJobs: jobsInfo,
        jobs: jobsInfo,
        posts: posts,
        originalPosts: posts,
        hashPath:this.props.location.hash //test
      });
    } catch (error) {
      console.log(error);
    }

  }

  notifications = () => {
    const id = this.props.context.user._id;
    const notifications = this.props.messengerContext.rooms.filter((room) =>
      room.notifications?.includes(id)
    ).length;

    return notifications;
  };

  redirectToSignin = () => {
    this.setState({ displayInblob: 'login' })
  }

  render() {
    // console.log(this.props.location)
    // console.log(this.props.toJob)
    // console.log(window.location.hash)
    if (this.props.context.isLoading) {
      return null;
    } else if (this.props.context.isLoggedIn) {
      //rendered if you are logged in
      return (
        <div className="homePageBody-wrapper">
          <div 
            className="messenger-wrapper"
            tabIndex = "0"
            style={{zIndex: this.state.displayMessenger ? 2 : 0, outline: 'none'}}
            onClick={() => this.state.displayMessenger ? this.setState({displayMessenger: false}) : null}
            onKeyDown={e => {
              return (e.key === 'Escape') && this.state.displayMessenger ? this.setState({displayMessenger: false}) : null
            }}
          >
            <span
              className="messengerIcon"
              onClick={() =>
                this.setState({
                  displayMessenger: !this.state.displayMessenger,
                })
              }
            >
              <img src={messengerIcon} alt="Messenger Icon" />
              {this.notifications() > 0 ? (
                <span className="notifications">
                  {this.notifications()}
                </span>) : ''}
            </span>

            {this.state.displayMessenger && (
              <div onClick={e => e.stopPropagation()}>
                <Messenger
                  onClick={() => this.setState({displayMessenger: !this.state.displayMessenger})}
                />
              </div>
            )}    
          </div>

          <div className="homePageBody">
            {/* //Left SIDE */}
            <div className="sideDiv">
              <SideProfile />
              {this.state.filterTab === 'posts' && 
                  <FilterPost
                    posts={this.state.posts}
                    filterPosts={this.handlePostFilter}
                    originalPosts={this.state.originalPosts}
                />
              }
              {this.state.filterTab === 'jobs' && 
                <FilterJobs
                  jobs={this.state.jobs}
                  originalJobs={this.state.originalJobs}
                  filterJobs={this.filterJobs}
              />
              }
    
            </div>

            {/* Middle=FEED */}
            
            <Feed
              jobs={this.state.jobs}
              // loadJobs={this.loadJobs}
              showAddJobForm={this.state.showAddJobForm}
              posts={this.state.posts}
              loadPosts={this.loadPosts}
              showPostForm={this.showPostForm}
              showJobForm={this.showJobForm}
              showAddPostForm={this.state.showAddPostForm}
              handleJobDelete={this.handleJobDelete}
              handleEditStart={this.handleEditStart}
              onPostDeleted={this.handlePostDelete}
              closePostForm={this.closePostForm}
              closeJobForm={this.closeJobForm}
              toJob={this.props.toJob}
              toPost={this.props.toPost}
              //path={this.props.location.hash}
              path={this.state.hashPath}
              toggleFilterTab={this.toggleFilterTab}
              filterTab={this.state.filterTab}
            ></Feed>

            {/* Right Side */}
            <div className="homeRightSide">
              {this.state.showAddJobForm === true && (
                <FormJob
                  closeJobForm={this.closeJobForm}
                  // loadJobs={this.loadJobs}
                  job={this.state.jobFormJob}
                  action={this.state.jobFormAction}
                  onJobCreated={this.handleJobCreated}
                  onJobUpdated={this.handleJobUpdated}
                />
              )}
              {this.state.showAddPostForm === true && (
                <FormArticle
                  closePostForm={this.closePostForm}
                  action={this.state.postFormAction}
                  displayedPost={this.state.displayedPost}
                  handlePostUpdated={this.handlePostUpdated}
                  handlePostCreated={this.handlePostCreated}
                />
              )}
            </div>
          </div>
        </div>
      );
    } else {
      //To be rendered if you are not logged in, hence this is landing page
      return (
        <div className="homePageBodyBlob">
          <section id="mainBlobSection">
            <svg
              className={
                this.state.displayInblob === 'login'
                  ? 'login'
                  : this.state.displayInblob === 'signup'
                  ? 'signup'
                  : 'landing'
              }
              id="visual"
              viewBox="0 0 500 500"
              width="500"
              height="500"
              version="1.1"
            >
              <g transform="translate(245.0942304748632 251.85796980537125)">
                <path
                  ref={this.blob1Ref}
                  d="M130.3 -177.5C162.6 -155.8 178.3 -109.4 187.9 -64.7C197.5 -19.9 201 23.3 191 64.5C181 105.8 157.5 145.1 123.4 165.3C89.3 185.5 44.7 186.5 -1.9 189.1C-48.4 191.6 -96.8 195.7 -129.3 175C-161.8 154.3 -178.4 108.8 -184.5 65.7C-190.5 22.6 -186.1 -18.2 -175 -58.3C-164 -98.4 -146.4 -137.8 -116.1 -160.1C-85.8 -182.4 -42.9 -187.7 3 -191.9C49 -196.1 98 -199.2 130.3 -177.5"
                  fill="#00567A"
                ></path>
              </g>
              <g transform="translate(247.56402926342417 258.2278953128172)">
                <path
                  ref={this.blob2Ref}
                  style={{ visibility: 'hidden' }}
                  d="M118 -161.2C155.2 -135.3 189.4 -104 203.4 -65.1C217.5 -26.2 211.5 20.3 198.7 66.1C185.9 111.9 166.4 157.1 132.2 177.2C98 197.3 49 192.4 2.6 188.8C-43.7 185.1 -87.4 182.8 -123.7 163.3C-160 143.9 -188.9 107.3 -200.5 66.4C-212.1 25.4 -206.4 -19.9 -190.9 -60.4C-175.5 -100.9 -150.4 -136.6 -116.9 -163.7C-83.5 -190.9 -41.7 -209.4 -0.7 -208.5C40.4 -207.6 80.7 -187.1 118 -161.2"
                  fill="#00567A"
                ></path>
              </g>
            </svg>

            <div className="homeFloating">
              {this.state.displayInblob === 'login' ? (
                <FormSignin
                  resetDisplayBlob={() =>
                    this.setState({ displayInblob: null })
                  }
                />
              ) : this.state.displayInblob === 'signup' ? (
                <FormSignup goToSignin={this.redirectToSignin}
                  resetDisplayBlob={() =>
                    this.setState({ displayInblob: null })
                  }
                />
              ) : (
                <div className="floatingLogoSection">
                  <img alt="logoFloating" src={logo}></img>
                  <div className="floatingButtons">
                    <Button style={{width: 85, margin: '.8rem'}}
                      onClick={() => this.setState({ displayInblob: 'login' })}
                    >
                      Log in
                    </Button>
                    <Button style={{width: 85, margin: '.8rem'}}
                      onClick={() => this.setState({ displayInblob: 'signup' })}
                    >
                      Sign up
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      );
    }
  }
}

export default withUser(withMessenger(Home));
