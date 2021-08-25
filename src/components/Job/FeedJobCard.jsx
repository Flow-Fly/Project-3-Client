import React, { Component } from 'react';
import './FeedJobCard.css';
import JobDetailsCard from '../Job/JobDetailsCard';
import Avatar from '../Base/Avatar/Avatar';
import { Link } from 'react-router-dom';

class FeedJobCard extends Component {
  state = {
    showJobDetails: false,
  };

  // toggle job details on the jobs list
  showJobDetails = () => {
    this.setState({ showJobDetails: true });
  };

  hideJobDetails = () => {
    this.setState({ showJobDetails: false });
  };

  render() {
    const job = this.props.job;
    const userId = this.props.userID;
    const jobId = this.props.job._id;
    const jobCreatorId = job.creator ? job.creator._id : '';
    const ownJob = String(jobCreatorId) === userId ? true : false;
    const firstName = job.creator
      ? job.creator.firstName !== undefined
        ? job.creator.firstName
        : '...'
      : '...';
    const lastName = job.creator
      ? job.creator.lastName !== undefined
        ? job.creator.lastName
        : '...'
      : '...';
    const userImage = job.creator
      ? job.creator.profileImg !== undefined
        ? job.creator.profileImg
        : '...'
      : '...';
    const createdAt = job.createdAt
      ? job.createdAt.replace('T', ' ').slice(0, 16)
      : '...';

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
        <JobDetailsCard job={this.props.job} onClose={this.hideJobDetails} />
      );
    }

    return (
      <div className="FeedJobCard" id={jobId}>
        <div className="flex-wrapper">
          <Avatar
            url={userImage}
            clickOnProfile={this.props.clickOnProfile}
            id={jobCreatorId}
            size="tiny"
            alt="avatar"
          />
          <p className="publishInfo">
            Published by : {firstName + ' ' + lastName}
            {''} at {''}
            {createdAt}
          </p>
          {ownJob && (
            <div className="button-edit-delete-wrapper">
              <button
                className="button-edit-job"
                onClick={this.props.handleEditStart}
              >
                Edit
              </button>
              <button
                className="button-delete-job"
                onClick={this.props.handleJobDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <Link to={`/job/#${jobId}`}>
          <h6 className="job-title">{this.props.job.title}</h6>
        </Link>

        <ul className="job-wrapper" key={jobId}>
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
