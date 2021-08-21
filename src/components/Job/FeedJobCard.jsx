import React, { Component } from 'react';
import './FeedJobCard.css';
import JobDetailsCard from '../Job/JobDetailsCard';
import Button from '../Base/Button/Button';
import FormJob from '../FormJob/FormJob.jsx';

class FeedJobCard extends Component {
  state = {
    showJobDetails: false,
    showJobForm: false,
  };

  // toggle job details on the jobs list
  showJobDetails = () => {
    this.setState({ showJobDetails: !this.state.showJobDetails });
  };

  cancelEdit = () => {
    this.setState({ showJobForm: false });
  };

  startEdit = () => {
    this.setState({ showJobForm: true });
  };

  render() {
    if (this.state.showJobForm) {
      return (
        <div className="FeedJobCard">
          <h6>
            {this.props.job.title}
            <Button onClick={this.cancelEdit}>Cancel</Button>
          </h6>
          <FormJob
            action="edit"
            job={this.props.job}
            onSubmit={this.props.onJobUpdate}
          />
        </div>
      );
    }

    let details;

    if (!this.state.showJobDetails) {
      details = (
        <p
          onClick={this.showJobDetails}
          style={{ textAlign: 'right', fontSize: '0.6em' }}
        >
          More details
        </p>
      );
    } else {
      details = <JobDetailsCard job={this.props.job} />;
    }

    return (
      <div className="FeedJobCard">
        <h6>
          {this.props.job.title}
          <Button onClick={this.startEdit}>Edit</Button>
          <Button onClick={this.props.onDelete}>Delete</Button>
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
