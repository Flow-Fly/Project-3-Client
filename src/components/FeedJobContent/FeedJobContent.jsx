import React, { Component } from 'react';
import FeedJobCard from '../Job/FeedJobCard';
import apiHandler from '../../api/apiHandler';

export class FeedJobContent extends Component {
  state = {
    jobs: [],
  };

  async componentDidMount() {
    try {
      let jobsInfo = await apiHandler.getJobs();
      this.setState({ jobs: jobsInfo });
    } catch (error) {
      console.log(error);
    }
  }
  componentWillUnmount() {
    console.log(' FeedJobContent component unmounting');
  }

  render() {
    if (this.state.jobsInfo === []) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {this.state.jobs.map((job) => {
          return <FeedJobCard key={job._id} job={job} />;
        })}
        {/* <p>Job Content</p> */}
      </div>
    );
  }
}

export default FeedJobContent;
