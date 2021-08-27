import React, { Component } from 'react';
import './FeedJobCard.css';
import JobDetailsCard from '../Job/JobDetailsCard';
import Avatar from '../Base/Avatar/Avatar';
import { Link } from 'react-router-dom';
import apiHandler from '../../api/apiHandler';
import { format } from 'timeago.js';

class FeedJobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showJobDetails: false,
      job: this.props.job,
      favouritedState: false,
    };

    this.userId = this.props.userID;
    this.jobId = this.props.job._id;
    this.jobCreatorId = this.state.job.creator
      ? this.state.job.creator._id
      : '';
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
      ? format(this.state.job.createdAt)
      : '...';
  }

  // toggle job details on the jobs list
  showJobDetails = () => {
    this.setState({ showJobDetails: true });
  };

  hideJobDetails = () => {
    this.setState({ showJobDetails: false });
  };

  componentDidMount() {
    if (this.props.user !== null)
      this.setState({
        favouritedState: this.props.user.favouriteJobs.includes(
          this.state.job._id
        ),
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({
        favouritedState: this.props.user.favouriteJobs.includes(
          this.state.job._id
        ),
      });
    }

    if (this.props.job !== prevProps.job) {
      this.setState({ job: this.props.job });
    }
  }

  addToFavourites = () => {
    apiHandler
      .addFavouriteJob(this.jobId)
      .then((dbRes) => {
        console.log(dbRes);
        this.setState({ favouritedState: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  removeFromFavourites = () => {
    apiHandler
      .deleteFavouriteJob(this.jobId)
      .then((dbRes) => this.setState({ favouritedState: false }))
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    //toggle job details
    let details;
    if (!this.state.showJobDetails) {
      details = (
        <p onClick={this.showJobDetails}>
          <span className="flash"> more details </span>
        </p>
      );
    } else {
      details = (
        <JobDetailsCard job={this.state.job} onClose={this.hideJobDetails} />
      );
    }

    return (
      <div
        className={`FeedJobCard ${this.props.color && 'highlighted'}`}
        id={this.jobId}
      >
        <div className="flex-wrapper">
          <div className="job-publish-info-left">
            <div className="wrapper-avatar" onClick={this.props.clickOnProfile}>
              <Avatar
                url={this.userImage}
                size="small"
                id={this.jobCreatorId}
              />
            </div>

            <div className="publishInfo">
              <div className="feed-job-card-publish-flex-wrapper"></div>
              <div className="creator-name">
                {this.firstName + ' ' + this.lastName}
              </div>
              <div>{this.createdAt}</div>
            </div>
          </div>

          <div className="button-edit-delete-wrapper">
            {this.ownJob && (
              <div className="publish-links-wrapper">
                <span
                  onClick={this.props.handleEditStart}
                  className="publishLinks"
                >
                  Edit
                </span>
                <span
                  onClick={this.props.handleJobDelete}
                  className="publishLinks"
                >
                  Delete
                </span>
              </div>
            )}

            {this.state.favouritedState === false ? (
              <span
                className="postCard favourites"
                onClick={this.addToFavourites}
              >
                ☆
              </span>
            ) : (
              <span
                className="postCard favourites"
                onClick={this.removeFromFavourites}
              >
                ★
              </span>
            )}
          </div>
        </div>
        <Link to={`/job/#${this.jobId}`}>
          <h6 className="job-title">{this.props.job.title}</h6>
        </Link>
        <div className="job-content">
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
      </div>
    );
  }
}

export default FeedJobCard;
