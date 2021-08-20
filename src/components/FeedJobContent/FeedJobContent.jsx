import React, { Component } from 'react';
import FeedJobCard from '../Job/FeedJobCard';
import apiHandler from '../../api/apiHandler';
import Button from '../Base/Button/Button';
import './FeedJobContent.css';

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
      return <div className="FeedJobContent">Loading...</div>;
    }

    return (
      <div className="FeedJobContent">
        <Button>Share a job</Button>
        {this.state.jobs.map((job) => {
          return <FeedJobCard key={job._id} job={job} />;
        })}
      </div>
    );
  }
}

export default FeedJobContent;
