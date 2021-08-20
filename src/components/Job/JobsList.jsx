import React, { Component } from 'react';
import JobCard from './JobCard';
import apiHandler from '../../api/apiHandler';

export class JobsList extends Component {
  state = {
    jobs: [],
  };

  componentDidMount() {
    apiHandler
      .getJobs()
      .then((res) => {
        // console.log('mounting');
        console.log(res);
        this.setState({
          jobs: res,
        });
      })
      .catch((err) => console.log(err));
  }

  handleDelete = (jobId) => {
    console.log('click');
    apiHandler.deleteJob(jobId).then(() => {
      const jobs = [...this.state.jobs].filter((job) => job._id !== jobId);
      this.setState({ jobs });
    });
  };

  // onJobSelete = (jobId) => {
  //   const selectedJob = this.state.jobs.find((job) => job._id === jobId);
  //   this.setState({ selectedJob: selectedJob });
  // };

  render() {
    // if (this.state.jobs === undefined) {
    //   return <div>Loading...</div>;
    // } else {
    return (
      <div>
        {this.state.jobs.map((job) => {
          return (
            <div key={job._id}>
              <JobCard
                key={job._id}
                {...job}
                handleDelete={this.deleteJob}
                handleEdit={this.onJobSelete}
              />
              {/* <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.creator}</p> */}
            </div>
          );
        })}
      </div>
    );
    // }
  }
}

export default JobsList;
