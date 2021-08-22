import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '../Base/Button/Button';
import './FormSign.css'
import google from '../../assets/auth/btn_google_signin_light_normal_web@2x.png';
import github from '../../assets/auth/github-btn.png'

class FormSignin extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.props.context.setUser(data);
        this.props.history.push('/')
      })
      .catch((error) => {
        console.log(error);
        this.setState({error})
        // Display error message here, if you set the state
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <>
      <div className="form-container">
        <Form className='form' onSubmit={this.handleSubmit}>

          <FormGroup>
            <Label className='label' htmlFor='email'>Email: </Label>
              <Input className='input'
              id='email'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              type='email'
              placeholder='Email'
              required
              />
            
          </FormGroup>
          <FormGroup>
            <Label className='label' htmlFor='password'>Password: </Label>
              <Input className='input'
              id='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              type='password'
              placeholder='Password'
              required
              />
            
          </FormGroup>

          <div className="feedback">
            {this.state.error && "Wrong Credentials"}
          </div>

          <Button>Sign In</Button>
        </Form>
        <div className="passports">
            <a href={process.env.REACT_APP_GOOGLE_CALLBACK}>
              <img src={google} alt="google auth" />
            </a>
            <a href={process.env.REACT_APP_GITHUB_CALLBACK}>
              <img src={github} alt="github auth" />
            </a>
          </div>
      </div>
      
      </>
    );
  }
}

export default withRouter(withUser(FormSignin));
