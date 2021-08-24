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
    let details;

    if (!this.state.showJobDetails) {
      details = (
        <p
          onClick={this.showJobDetails}
          style={{ textAlign: 'center', fontSize: '0.6em' }}
        >
          More details
        </p>
      );
    } else {
      details = (
        <JobDetailsCard job={this.props.job} onClose={this.hideJobDetails} />
      );
    }

    return (
      <div className="FeedJobCard">
        <div className="flex-wrapper">
          <Avatar
            ulr={this.props.job.creator?.profileImg}
            size="tiny"
            alt="avatar"
          />
          <p>
            Published by : {''} at {''}
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
