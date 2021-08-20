import React from 'react';
import Button from '../components/Base/Button/Button';
// import FormArticle from '../components/FormArticle/FormArticle';
import FormJob from '../components/FormJob/FormJob';
import JobsList from '../components/Job/JobsList';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home Page ∆</h1>
        {/* <FormArticle action="create" /> */}
        <FormJob action="create" />
        <JobsList />
      </div>
    );
  }
}

export default Home;
