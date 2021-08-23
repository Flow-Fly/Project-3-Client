import React from 'react';
// import Button from '../components/Base/Button/Button';
// import FormArticle from "../components/FormArticle/FormArticle"
// import FormJob from "../components/FormJob/FormJob"
import SideProfile from '../components/Base/SideProfile/SideProfile'
import Feed from '../components/Feed/Feed';


class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home Page ∆</h1>
        <SideProfile />
        <Feed />
      </div>
    );
  }
}

export default Home;
