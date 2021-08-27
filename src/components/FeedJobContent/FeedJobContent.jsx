import React, { Component } from 'react';
import FeedJobCard from '../Job/FeedJobCard';
import './FeedJobContent.css';
import FormJob from '../FormJob/FormJob';
import '../FormJob/FormJob.css';
import { withUser } from '../Auth/withUser';

export class FeedJobContent extends Component {
  state = {
    showJobDetails: {},
  };

  componentDidMount() {
    if (this.props.searchingJob) {
      //TODO
    }
  }

  //toggle job form
  showJobForm = (event) => {
    event.preventDefault();
    if (this.props.showAddJobForm) return this.props.closeJobForm();

    this.props.showJobForm('create');
  };

  async componentWillUnmount() {
    console.log(' FeedJobContent component unmounting');
  }

  render() {
    if (this.props.jobsInfo === []) {
      return <div className="FeedJobContent">Loading...</div>;
    }

    return (
      <div className="FeedJobContent">
        <div className="button-create-job-wrapper">
          <button className="button-create-job" onClick={this.showJobForm}>
            Share a job
          </button>
        </div>

        {this.state.showJobForm && (
          <FormJob action="create" className="addJobForm" />
        )}

        {this.props.jobs.map((job) => {
          return (
            <FeedJobCard
              key={job._id}
              job={job}
              showJobForm={this.props.showJobForm}
              handleEditStart={() => {
                this.props.handleEditStart(job);
              }}
              handleJobDelete={() => {
                this.props.handleJobDelete(job._id);
              }}
              clickOnProfile={this.props.clickOnProfile}
              userID={this.props.context.user._id}
              user={this.props.user}
            />
          );
        })}
      </div>
    );
  }
}

export default withUser(FeedJobContent);
