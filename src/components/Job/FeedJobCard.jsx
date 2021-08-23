import React, { Component } from 'react';
import './FeedJobCard.css';
import JobDetailsCard from '../Job/JobDetailsCard';
// import Button from '../Base/Button/Button';
import FormJob from '../FormJob/FormJob';

class FeedJobCard extends Component {
  state = {
    showJobDetails: false,
    showJobForm: false,
  };

  // toggle job details on the jobs list
  showJobDetails = () => {
    this.setState({ showJobDetails: true });
  };

  hideJobDetails = () => {
    this.setState({ showJobDetails: false });
  };

  //show jobForm, action = "edit"
  cancelEdit = () => {
    this.setState({ showJobForm: false });
  };

  startEdit = () => {
    this.setState({ showJobForm: true });
  };

  onJobUpdate = (data) => {
    this.setState({ showJobForm: false });
    this.props.onJobUpdate(data);
  };

  render() {
    if (this.state.showJobForm) {
      return (
        <div className="FeedJobCard">
          <h6>
            {this.props.job.title}
            <button
              className="button-cancel-edit-job"
              onClick={this.cancelEdit}
            >
              Cancel
            </button>
          </h6>
          <FormJob
            action="edit"
            job={this.props.job}
            onUpdate={this.onJobUpdate}
          />
        </div>
      );
    }

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
        <h6>
          {this.props.job.title}
          <button className="button-edit-job" onClick={this.startEdit}>
            Edit
          </button>
          <button className="button-delete-job" onClick={this.props.onDelete}>
            Delete
          </button>
        </h6>
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
