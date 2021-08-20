import React from "react";
import Button from '../components/Base/Button/Button'
import FormArticle from "../components/FormArticle/FormArticle"
import FormJob from "../components/FormJob/FormJob"
import Feed from "../components/Feed/Feed";

class Home extends React.Component {
  render() {
    return (
      <div>
        
        <h1>Home Page ∆</h1>
        <Feed/>
      </div>
    );
  }
}

export default Home;
