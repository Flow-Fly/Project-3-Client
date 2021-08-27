import React, { Component } from 'react';
import FeedJobCard from '../Job/FeedJobCard';
import './FeedJobContent.css';
import FormJob from '../FormJob/FormJob';
import '../FormJob/FormJob.css';
import { withUser } from '../Auth/withUser';

export class FeedJobContent extends Component {
  state = {
    searchedJob: null,
    allJobs: null,
    showJobDetails: {},
  };

  // If there is a is a selected job in URL, isolate it.
  componentDidMount() {
    if (this.props.searchingJobs && this.props.jobs.length !== 0) {
      let str = this.props.path.substring(1);

      const searchedJob = this.props.jobs.filter(
        (e) => e._id.toString() === str
      );
      let allJobs = this.props.jobs.filter((e) => e._id.toString() !== str);
      this.setState({
        searchedJob: searchedJob[0],
        allJobs: allJobs,
      });
    }
  }
  // If the URL changed (new job selected), isolate it.
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.searchingJob && this.props.jobs.length !== 0) {
        let str = this.props.path.substring(1);

        const searchedJob = this.props.jobs.filter(
          (e) => e._id.toString() === str
        );
        let allJobs = this.props.jobs.filter((e) => e._id.toString() !== str);
        this.setState({
          searchedJob: searchedJob[0],
          allJobs: allJobs,
        });
      }
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
    if (this.state.allJobs === []) {
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

        {/* Isolated Job card */}
        {this.props.searchingJob && this.state.searchedJob && (
          <FeedJobCard
            key={this.state.searchedJob._id}
            job={this.state.searchedJob}
            showJobForm={this.props.showJobForm}
            handleEditStart={() => {
              this.props.handleEditStart(this.state.searchedJob);
            }}
            handleJobDelete={() => {
              this.props.handleJobDelete(this.state.searchedJob._id);
            }}
            clickOnProfile={this.props.clickOnProfile}
            userID={this.props.context.user._id}
            user={this.props.user}
            color="yellow"
          />
        )}

        {/* Rest of the job cards */}
        {this.props.searchingJob &&
          this.state.searchedJob &&
          this.state.allJobs.map((job) => {
            return (
              <FeedJobCard
                key={job._id}
                job={job}
                showJobForm={this.props.showJobForm}
                handleEditStart={() => {
                  this.props.handleEditStart(job);
                }}
                handleJobDelete={() => {
                  this.props.handleJobDelete(job);
                }}
                clickOnProfile={this.props.clickOnProfile}
                userID={this.props.context.user._id}
                user={this.props.user}
              />
            );
          })}

        {/* No selected job card, normal display */}
        {!this.state.allJobs && this.props.jobs.map((job) => {
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
