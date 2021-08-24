import React, { Component } from 'react';
import './FeedJobCard.css';
import JobDetailsCard from '../Job/JobDetailsCard';
import Avatar from '../Base/Avatar/Avatar';

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
      details = <p onClick={this.showJobDetails}>⌄</p>;
    } else {
      details = (
        <JobDetailsCard job={this.props.job} onClose={this.hideJobDetails} />
      );
    }

    return (
      <div className="FeedJobCard">
        <div className="flex-wrapper">
          <Avatar
            url={userImage}
            clickOnProfile={this.props.clickOnProfile}
            id={jobCreatorId}
            size="tiny"
            alt="avatar"
          />
          <p>
            Published by : {firstName + ' ' + lastName}
            {''} at {''}
            {createdAt}
          </p>
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
        </div>
        <h6>{this.props.job.title}</h6>
        <ul key={this.props.job._id}>
          <li>
            <b>{this.props.job.company}</b>
          </li>
          <li>
            {this.props.job.location} |{' '}
            {this.props.job.contractType !== undefined
              ? this.props.job.contractType
              : '...'}{' '}
            | {this.props.job.level}
          </li>
          {details}
        </ul>
      </div>
    );
  }
}

export default FeedJobCard;
