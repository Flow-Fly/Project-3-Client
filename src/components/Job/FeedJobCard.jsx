import React, { Component } from 'react';
import './FeedJobCard.css';
import JobDetailsCard from '../Job/JobDetailsCard';
import Avatar from '../Base/Avatar/Avatar';
import { Link } from 'react-router-dom';
import apiHandler from "../../api/apiHandler"
import Button from '../Base/Button/Button';

class FeedJobCard extends Component {
  constructor(props){
    super(props);
    this.state={

      showJobDetails: false,
      job:this.props.job,
      favouritedState:false,
    }

    this.userId = this.props.userID;
    this.jobId = this.props.job._id;
    this.jobCreatorId = this.state.job.creator ? this.state.job.creator._id : '';
    this.ownJob = String(this.jobCreatorId) === this.userId ? true : false;
    this.firstName = this.state.job.creator
      ? this.state.job.creator.firstName !== undefined
        ? this.state.job.creator.firstName
        : '...'
      : '...';
      this.lastName = this.state.job.creator
      ? this.state.job.creator.lastName !== undefined
        ? this.state.job.creator.lastName
        : '...'
      : '...';
      this.userImage = this.state.job.creator
      ? this.state.job.creator.profileImg !== undefined
        ? this.state.job.creator.profileImg
        : '...'
      : '...';
      this.createdAt = this.state.job.createdAt
      ? this.state.job.createdAt.replace('T', ' ').slice(0, 16)
      : '...';
  }

  // toggle job details on the jobs list
  showJobDetails = () => {
    this.setState({ showJobDetails: true });
  };

  hideJobDetails = () => {
    this.setState({ showJobDetails: false });
  };

  componentDidMount(){
    if(this.props.user!==null) this.setState({favouritedState:this.props.user.favouriteJobs.includes(this.state.job._id)})
  }

  componentDidUpdate(prevProps){
    if(this.props.user !== prevProps.user){
      this.setState({favouritedState:this.props.user.favouriteJobs.includes(this.state.job._id)})
    }

    if(this.props.job!==prevProps.job){
      this.setState({job:this.props.job})
    }

  }

  addToFavourites=()=> {
    apiHandler.addFavouriteJob(this.jobId)
      .then((dbRes)=>
      {console.log(dbRes);this.setState({favouritedState:true})})
      .catch((error)=>{console.log(error)})
  }
  removeFromFavourites=() =>{
    apiHandler.deleteFavouriteJob(this.jobId)
      .then((dbRes)=>this.setState({favouritedState:false}))
      .catch((error)=>{console.log(error)})
  }

  render() {
    

    //toggle job details
    let details;
    if (!this.state.showJobDetails) {
      details = (
        <p onClick={this.showJobDetails}>
          <span className="flash"> ⌄ </span>
        </p>
      );
    } else {
      details = (
        <JobDetailsCard job={this.state.job} onClose={this.hideJobDetails} />
      );
    }

    return (
      <div className="FeedJobCard" id={this.jobId}>
        <div className="flex-wrapper">
        <div className="wrapper-avatar" onClick={this.props.clickOnProfile}>
            <Avatar url={this.userImage} size="tiny" id={this.jobCreatorId} />
          </div>
          <p className="publishInfo">
            Published by : {this.firstName + ' ' + this.lastName}
            {''} at {''}
            {this.createdAt}
          </p>
          {this.ownJob && (
            <div className="button-edit-delete-wrapper">
              <Button  onClick={this.props.handleEditStart} className="jobCard">Edit</Button>
              <Button  onClick={this.props.handleJobDelete} className="jobCard">Delete</Button>
              {
            this.state.favouritedState === false ?(
              <Button className="postCard favourites" onClick={this.addToFavourites}>☆</Button>
            ) :
            (
              <Button className="postCard favourites" onClick={this.removeFromFavourites}>★</Button>
            )
          }
            </div>
          )}
        </div>
        <Link to={`/job/#${this.jobId}`}>
          <h6 className="job-title">{this.props.job.title}</h6>
        </Link>

        <ul className="job-wrapper" key={this.jobId}>
          <li>
            <span className="bold">{this.props.job.company}</span>
          </li>
          <li>
            {this.props.job.location} |{' '}
            {this.props.job.contractType !== undefined
              ? this.props.job.contractType
              : '...'}{' '}
            | {this.props.job.level}
          </li>
          <li>
            <span className="bold">Remote: </span>
            {this.props.job.remote ? 'yes' : 'no'}
          </li>
          {details}
        </ul>
      </div>
    );
  }
}

export default FeedJobCard;
