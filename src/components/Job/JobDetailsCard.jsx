import React, { Component } from 'react';
import '../Job/JobDetailsCard.css';

// only a part of job details
export class JobDetailsCard extends Component {
  render() {
    return (
      <>
        <ul key={this.props.job._id}>
          <li>Description: {this.props.job.description}</li>
          <li>Technologies: {this.props.job.technologies}</li>
          <li>Remote: {this.props.job.remote}</li>
          <li>Job link: {this.props.job.link}</li>
        </ul>

        {<p onClick={this.props.onClose}>˄</p>}
      </>
    );
  }
}

export default JobDetailsCard;
