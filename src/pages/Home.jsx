import React from "react";
import Button from '../components/Base/Button/Button'
import FormArticle from "../components/FormArticle/FormArticle"

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home Page ∆</h1>
        <FormArticle action="create"/>
      </div>
    );
  }
}

export default Home;
