import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '../Base/Button/Button';
import './FormSign.css'

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
      })
      .catch((error) => {
        console.log(error);
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
          <Button>Sign In</Button>
        </Form>
      </div>
      
      </>
    );
  }
}

export default withRouter(withUser(FormSignin));
