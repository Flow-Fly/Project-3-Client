import React from "react";
import Button from '../components/Base/Button/Button'
import FormArticle from "../components/FormArticle/FormArticle"
import FormJob from "../components/FormJob/FormJob"
import Feed from "../components/Feed/Feed";
import KUTE from 'kute.js';
import ProtectedRoute from "../components/ProtectedRoute";
import {withUser} from '../components/Auth/withUser';
import "../styles/Home.css"
import Avatar from "../components/Base/Avatar/Avatar";
import logo from "../Images/logo.png"
import {Link} from 'react-router-dom'

class Home extends React.Component {


  blob1Ref = React.createRef()
  blob2Ref = React.createRef()

  componentDidMount(){


  }

  componentDidUpdate(){

    if (this.props.context.isLoggedIn===false) {

      const tween = KUTE.fromTo(
        this.blob1Ref.current,
        {path: this.blob1Ref.current},
        {path: this.blob2Ref.current},
        {repeat:999, duration:3000, yoyo:true}
      )
     tween.start();
    }

  }

  render() {
    if (this.props.context.isLoading) {
      return null;
    } 
    
    else if (this.props.context.isLoggedIn) {
      //rendered if you are logged in
      return <div className="homePageBody">
        
        <Feed></Feed>

      </div>;
    } 
    
    else {
      


      //To be rendered if you are not logged in, hence this is landing page
      return <div className="homePageBody">
      <section id="mainBlobSection">
      <svg id="visual" viewBox="0 0 500 500" width="500" height="500" version="1.1">
      
      <g transform="translate(245.0942304748632 251.85796980537125)">
        <path ref={this.blob1Ref} d="M130.3 -177.5C162.6 -155.8 178.3 -109.4 187.9 -64.7C197.5 -19.9 201 23.3 191 64.5C181 105.8 157.5 145.1 123.4 165.3C89.3 185.5 44.7 186.5 -1.9 189.1C-48.4 191.6 -96.8 195.7 -129.3 175C-161.8 154.3 -178.4 108.8 -184.5 65.7C-190.5 22.6 -186.1 -18.2 -175 -58.3C-164 -98.4 -146.4 -137.8 -116.1 -160.1C-85.8 -182.4 -42.9 -187.7 3 -191.9C49 -196.1 98 -199.2 130.3 -177.5" 
        fill="#10729c"></path></g>
      <g transform="translate(247.56402926342417 258.2278953128172)">
        <path ref={this.blob2Ref} style={{visibility:"hidden"}} d="M118 -161.2C155.2 -135.3 189.4 -104 203.4 -65.1C217.5 -26.2 211.5 20.3 198.7 66.1C185.9 111.9 166.4 157.1 132.2 177.2C98 197.3 49 192.4 2.6 188.8C-43.7 185.1 -87.4 182.8 -123.7 163.3C-160 143.9 -188.9 107.3 -200.5 66.4C-212.1 25.4 -206.4 -19.9 -190.9 -60.4C-175.5 -100.9 -150.4 -136.6 -116.9 -163.7C-83.5 -190.9 -41.7 -209.4 -0.7 -208.5C40.4 -207.6 80.7 -187.1 118 -161.2" 
        fill="#10729c"></path></g>
        </svg>

        <div className="homeFloating">
        <img alt="logoFloating" src={logo}></img>
        <div className="floatingButtons">
          <Link to="/signin" className="LinkButton">Log in</Link>
          <Link to="/signup" className="LinkButton">Sign up</Link>
        </div>
      </div>
        </section>


    </div> 
    }
  }
}

export default withUser(Home);


