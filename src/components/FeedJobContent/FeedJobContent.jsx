import React, { Component } from 'react';
import FeedJobCard from '../Job/FeedJobCard';
import apiHandler from '../../api/apiHandler';
import Button from '../Base/Button/Button';
import './FeedJobContent.css';
import FormJob from '../FormJob/FormJob';

export class FeedJobContent extends Component {
  state = {
    jobs: [],
    displayAddJobForm: false,
    displayJobDetails: {},
  };

  async componentDidMount() {
    try {
      let jobsInfo = await apiHandler.getJobs();
      this.setState({ jobs: jobsInfo });
    } catch (error) {
      console.log(error);
    }
  }

  //toggle add job form //ugly as hell, better go to a new page
  showAddJobForm = (event) => {
    event.preventDefault();
    this.setState({ displayAddJobForm: !this.state.displayAddJobForm });
  };

  handleJobCreate = (job) => {
    console.log(`Creating ${job}.`);

    this.setState({
      jobs: [job, ...this.state.jobs],
      displayAddJobForm: false,
    });
  };

  handleJobUpdate = (jobId, updatedJob) => {
    const jobs = [...this.state.jobs].map((job) =>
      job._id === jobId ? updatedJob : job
    );

    this.setState({ jobs });
  };

  handleDelete = (jobId) => {
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
    if (this.state.jobsInfo === []) {
      return <div className="FeedJobContent">Loading...</div>;
    }

    return (
      <div className="FeedJobContent">
        <Button onClick={this.showAddJobForm}>Share a job</Button>
        {/* toggle add job form */}
        {this.state.displayAddJobForm ? (
          <FormJob
            onCreate={this.handleJobCreate}
            action="create"
            className="addJobForm"
          />
        ) : null}

        {this.state.jobs.map((job) => {
          return (
            <FeedJobCard
              key={job._id}
              job={job}
              onJobUpdate={(data) => {
                this.handleJobUpdate(job._id, data);
              }}
              onDelete={() => {
                this.handleDelete(job._id);
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default FeedJobContent;
