import React, { Component } from 'react';
import axios from 'axios';

export class JobsList extends Component {
  state = {
    jobs: [],
  };

  componentDidMount() {
    axios
      .get('http://localhost:4000/jobs')
      .then((res) => {
        this.setState({
          jobs: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.jobs.map((job) => {
          return <div key={job._id}>{job.title}</div>;
        })}
      </div>
    );
  }
}

export default JobsList;
