import React, { Component } from 'react';
import FeedJobCard from '../Job/FeedJobCard';
import apiHandler from '../../api/apiHandler';
import Button from '../Base/Button/Button';
import './FeedJobContent.css';
import FormJob from '../FormJob/FormJob';
import '../FormJob/FormJob.css';

export class FeedJobContent extends Component {
  state = {
    showAddJobForm: false,
    showJobDetails: {},
  };

  componentDidMount() {}

  //toggle add job form
  // showAddJobForm = (event) => {
  //   event.preventDefault();
  //   this.setState({ showAddJobForm: !this.state.showAddJobForm });
  // };
  showJobForm = (event) => {
    event.preventDefault();
    this.props.showJobForm('create');
  };

  handleJobCreate = (job) => {
    console.log(`Creating ${job}.`);

    this.setState({
      jobs: [job, ...this.state.jobs],
      showAddJobForm: false,
    });
  };

  handleJobUpdate = (jobId, updatedJob) => {
    const jobs = [...this.state.jobs].map((job) =>
      job._id === jobId ? updatedJob : job
    );

    this.setState({ jobs });
  };

  handleJobDelete = (jobId) => {
    apiHandler
      .deleteJob(jobId)
      .then(() => {
        this.setState({
          jobs: this.state.jobs.filter((job) => job._id !== jobId),
        });
      })
      .catch((err) => console.log(err));
  };

  async componentWillUnmount() {
    console.log(' FeedJobContent component unmounting');
  }

  render() {
    console.log('rendered');
    if (this.state.jobsInfo === []) {
      return <div className="FeedJobContent">Loading...</div>;
    }

    return (
      <div className="FeedJobContent">
        {/* <Button onClick={this.showAddJobForm}>Share a job</Button> */}
        <div className="button-create-job-wrapper">
          <Button className="button-create-job" onClick={this.showJobForm}>
            Share a job
          </Button>
        </div>

        {/* toggle add job form */}
        {this.state.showAddJobForm ? (
          <FormJob
            onCreate={this.handleJobCreate}
            action="create"
            className="addJobForm"
          />
        ) : null}

        {this.props.jobs.map((job) => {
          return (
            <FeedJobCard
              key={job._id}
              job={job}
              onJobUpdate={(data) => {
                this.handleJobUpdate(job._id, data);
              }}
              onDelete={() => {
                this.handleJobDelete(job._id);
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default FeedJobContent;
