import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { withUser } from '../Auth/withUser';
import apiHandler from '../../api/apiHandler';
import { Form, FormGroup, Input, FormFeedback } from 'reactstrap';
import Button from '../Base/Button/Button';
import './FormSign.css';
import utils from '../../utils/helpers';
import google from '../../assets/auth/btn_google_signin_light_normal_web@2x.png';
import github from '../../assets/auth/github-btn.png';
import logo from '../../Images/logo.png';

const initialState = {
  canSubmit: '',
  passwordSafe: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmation: '',
};

class FormSignup extends Component {
  state = { ...initialState };

  handleChange = (event) => {
    let value = null;
    // titleMe capitalize every first letter of every word, accounting '-'...
    if (event.target.name === 'firstName' || event.target.name === 'lastName') {
      value = utils.titleMe(event.target.value);
    } else {
      value = event.target.value;
    }

    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then(() => {
        this.props.goToSignin()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  Make sure the User provide a secure enough password
  handlePassword = (e) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const value = e.target.value;
    const passed = regex.test(value);

    if (!passed) {
      e.target.style.boxShadow = 'inset 0px 0px 2px 3px red';
      this.setState({
        password: value,
        passwordSafe: false,
      });
    } else {
      e.target.style.boxShadow = 'inset 0px 0px 2px 3px #21C078';
      this.setState({
        password: value,
        passwordSafe: true,
      });
    }
  };

  // Make sure the password and the confirmation are equals, display a non disabled button
  handleConfirm = (e) => {
    if (this.state.password === e.target.value && this.state.passwordSafe) {
      e.target.style.boxShadow = 'inset 0px 0px 2px 3px #21C078';
      this.setState({
        canSubmit: true,
        confirmation: e.target.value,
      });
    } else {
      e.target.style.boxShadow = 'inset 0px 0px 2px 3px red';
      this.setState({
        canSubmit: false,
        confirmation: e.target.value,
      });
    }
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <div className="form-container">
          <span
            className="form-close"
            onClick={() => this.props.resetDisplayBlob()}
          ></span>
          <img id="signLogo" alt="signLogo" src={logo}></img>
          <Form className="form" onSubmit={this.handleSubmit}>
            <FormGroup className="form-group">
              <Input
                className="input"
                id="firstName"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'First Name: ')}
                placeholder="First Name: "
                type="text"
                required
              />
            </FormGroup>
            <FormGroup className="form-group">
              <Input
                className="input"
                id="lastName"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'Last Name: ')}
                placeholder="Last Name: "
                type="text"
                required
              />
            </FormGroup>
            <FormGroup className="form-group">
              <Input
                className="input"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'Email: ')}
                placeholder="Email: "
                type="text"
                required
              />
            </FormGroup>

            <FormGroup className="form-group">
              {this.state.password === '' ? (
                <Input
                  className="input"
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handlePassword}
                  type="password"
                  onFocus={(e) => (e.target.placeholder = '')}
                  onBlur={(e) => (e.target.placeholder = 'Password: ')}
                  placeholder="Password: "
                  required
                  autoComplete="new-password"
                />
              ) : this.state.passwordSafe ? (
                <>
                  <Input
                    className="input"
                    id="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handlePassword}
                    type="password"
                    onFocus={(e) => (e.target.placeholder = '')}
                    onBlur={(e) => (e.target.placeholder = 'Password: ')}
                    required
                    valid
                    autoFocus
                  />
                  <FormFeedback valid>Your password is safe!</FormFeedback>
                </>
              ) : (
                <>
                  <Input
                    className="input"
                    id="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handlePassword}
                    type="password"
                    onFocus={(e) => (e.target.placeholder = '')}
                    onBlur={(e) => (e.target.placeholder = 'Password: ')}
                    required
                    invalid
                    autoComplete="new-password"
                    autoFocus
                  />
                  <FormFeedback invalid="true">
                    Your password must contain atleast 8 characters, a number
                    and a punctuation.
                  </FormFeedback>
                </>
              )}
            </FormGroup>
            <FormGroup className="form-group">
              {this.state.confirmation === '' ? (
                <Input
                  className="input"
                  id="confirmation"
                  name="confirmation"
                  value={this.state.confirmation}
                  onChange={this.handleConfirm}
                  type="password"
                  onFocus={(event) => (event.target.placeholder = '')}
                  onBlur={(event) =>
                    (event.target.placeholder = 'Confirm you password: ')
                  }
                  placeholder="Confirm your password: "
                  required
                />
              ) : this.state.canSubmit ? (
                <>
                  <Input
                    className="input"
                    id="confirmation"
                    name="confirmation"
                    value={this.state.confirmation}
                    onChange={this.handleConfirm}
                    type="password"
                    onFocus={(event) => (event.target.placeholder = '')}
                    onBlur={(event) =>
                      (event.target.placeholder = 'Confirm you password: ')
                    }
                    required
                    valid
                    autoFocus
                  />
                  <FormFeedback valid>Ready to register!</FormFeedback>
                </>
              ) : (
                <>
                  <Input
                    className="input"
                    id="confirmation"
                    name="confirmation"
                    value={this.state.confirmation}
                    onChange={this.handleConfirm}
                    type="password"
                    onFocus={(event) => (event.target.placeholder = '')}
                    onBlur={(event) =>
                      (event.target.placeholder = 'Confirm you password: ')
                    }
                    required
                    invalid
                    autoFocus
                  />
                  <FormFeedback invalid="true">
                    Your passwords are not matching
                  </FormFeedback>
                </>
              )}
            </FormGroup>
            {/* Display some feedback to the user when needed */}
            <div className="feedback"></div>
            <FormFeedback>Let's see</FormFeedback>
            {this.state.canSubmit ? (
              <Button>Sign up</Button>
            ) : (
              <Button disabled>Sign up</Button>
            )}
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

export default withRouter(withUser(FormSignup));
