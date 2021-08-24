import React, { Component } from 'react';
import '../Job/JobDetailsCard.css';

// only a part of job details
export class JobDetailsCard extends Component {
  render() {
    return (
      <>
        <li>
          <span className="bold">Technologies: </span>
          {this.props.job.technologies}
        </li>
        <li>
          <span className="bold">Description: </span>
          {this.props.job.description}
        </li>

        <li>
          <span className="bold">Job link: </span>
          <a className="link" href={this.props.job.link}>
            {this.props.job.link}
          </a>
        </li>

        {
          <p onClick={this.props.onClose}>
            <span className="flash"> ˄ </span>
          </p>
        }
      </>
    );
  }
}

export default JobDetailsCard;
