import React, { Component } from 'react';
import '../Job/JobDetailsCard.css';

export class JobDetailsCard extends Component {
  render() {
    return (
      <div>
        <ul key={this.props.job._id}>
          <li>{this.props.job.description}</li>
          <li>{this.props.job.technologies}</li>
          <li>Remote: {this.props.job.remote}</li>
          <li>Job shared by: {this.props.job.creator?.email}</li>
          <li>Job link: {this.props.job.link}</li>
        </ul>
      </div>
    );
  }
}

export default JobDetailsCard;
