import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { withUser } from '../Auth/withUser';
import apiHandler from '../../api/apiHandler';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '../Base/Button/Button';
import './FormSignup.css';

const initialState = {
  canSubmit: false,
  passwordSafe: false,
  feedback: null,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phoneNumber: '',
  graduationYear: '',
  location: '',
  type: '',
  confirmation: '',
};

// const devState= {
//   firstName: "Jean",
//   lastName:"D'eau",
//   email: "email@email.com",
//   password: "1234@azer",
//   phoneNumber: '123456789',
//   graduationYear: 2020,
//   location: 'Paris',
//   type: 'webdev'

// }

class FormSignup extends Component {
  state = { ...initialState };

  handleChange = (event) => {
    let value =
      event.target.type === 'file' ? event.target.files[0] : event.target.value;

    const key = event.target.name;
    if (key === 'graduationYear') value = Number(value);
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    apiHandler
      .signup(this.state)
      .then(() => {
        this.props.history.push('/signin');
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        feedback: {
          error: 'Please provide a strong password',
        },
      });
    } else {
      e.target.style.boxShadow = 'inset 0px 0px 2px 3px #21C078';

      this.setState({
        password: value,
        passwordSafe: true,
        feedback: { message: 'Your password is safe!' },
      });
    }
  };

  handleConfirm = (e) => {
    if (this.state.password === e.target.value && this.state.passwordSafe) {
      e.target.style.boxShadow = 'inset 0px 0px 2px 3px #21C078';
      this.setState({
        canSubmit: true,
        feedback: { message: 'Ready to Sign Up !' },
        confirmation: e.target.value,
      });
    } else {
      e.target.style.boxShadow = 'inset 0px 0px 2px 3px red';
      this.setState({
        canSubmit: false,
        feedback: { error: 'Your passwords are not matching' },
        confirmation: e.target.value,
      });
    }
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }
    let color = null;
    if (this.state.feedback) {
      color = this.state.feedback.message ? 'green' : 'red';
    }

    return (
      <>
        <div className="form-container">
          <Form className="form" onSubmit={this.handleSubmit}>
            <FormGroup className="form-group">
              <Label className="label" htmlFor="firstName">
                First name
              </Label>
              <Input
                className="input"
                id="firstName"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                type="text"
                placeholder="First Name"
                required
              />
            </FormGroup>
            <FormGroup className="form-group">
              <Label className="label" htmlFor="lastName">
                Last name
              </Label>
              <Input
                className="input"
                id="lastName"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
                type="text"
                placeholder="Last Name"
                required
              />
            </FormGroup>
            <FormGroup className="form-group">
              <Label className="label" htmlFor="email">
                Email:
              </Label>
              <Input
                className="input"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                type="text"
                placeholder="Email"
                required
              />
            </FormGroup>
            {/* <FormGroup className="form-group">
                  <Label className="label" htmlFor="phoneNumber">
                    Phone number:{' '}
                  </Label>
                  <Input
                    className="input"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={this.handleChange}
                    type="tel"
                    placeholder="Phone number"
                  />
                </FormGroup>
       
                <FormGroup className="form-group">
                  <Label className="label" htmlFor="graduationYear">
                    Graduation year:{' '}
                  </Label>
                  <Input
                    className="input"
                    id="graduationYear"
                    name="graduationYear"
                    value={this.state.graduationYear}
                    onChange={this.handleChange}
                    type="number"
                    placeholder="Graduation year"
                    min="2013"
                    max="2022"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Label
                    className="label"
                    htmlFor="location"
                    value={this.state.location}
                    onChange={this.handleChange}
                  >
                    Location:{' '}
                  </Label>

                  <Input
                    name="location"
                    id="location"
                    type="select"
                    name="location"
                    value={this.state.location}
                    onChange={this.handleChange}
                  >
                    <option value="-1" disabled>
                      Please select a Campus
                    </option>
                    <option value="Paris">Paris</option>
                    <option value="Madrid">Madrid</option>
                    <option value="Amsterdam">Amsterdam</option>
                    <option value="Barcelona">Barcelona</option>
                    <option value="Berlin">Berlin</option>
                    <option value="Miami">Miami</option>
                    <option value="Sao Paulo">Sao Paulo</option>
                    <option value="Lisbon">Lisbon</option>
                    <option value="Mexico City">Mexico City</option>
                  </Input>
                </FormGroup>

                <FormGroup className="form-group">
                  <Label
                    className="label"
                    htmlFor="type"
                    value={this.state.type}
                    onChange={this.handleChange}
                  >
                    Field of work:{' '}
                  </Label>

                  <Input
                    name="type"
                    id="type"
                    type="select"
                    required
                    name="type"
                    value={this.state.type}
                    onChange={this.handleChange}
                  >
                    <option value="-1">Please select your field of work</option>
                    <option value="Web Dev">Web Development</option>
                    <option value="UI/UX">UI / UX</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Cyber Security">Cyber Security</option>
                  </Input>
                </FormGroup> */}

            <FormGroup className="form-group">
              <Label className="label" htmlFor="password">
                Password:
              </Label>
              <Input
                className="input"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handlePassword}
                type="password"
                placeholder="Password: "
                required
              />
            </FormGroup>
            <FormGroup className="form-group">
              <Label className="label" htmlFor="confirmation">
                Confirm your password
              </Label>
              <Input
                className="input"
                id="confirmation"
                name="confirmation"
                value={this.state.confirmation}
                onChange={this.handleConfirm}
                type="password"
                placeholder="Confirm you password: "
                required
              />
            </FormGroup>

            <div className="feedback">
              {this.state.feedback?.message && (
                <p
                  style={{
                    color: color,
                  }}
                >
                  {this.state.feedback.message}
                </p>
              )}
              {this.state.feedback?.error && (
                <p
                  style={{
                    color: color,
                  }}
                >
                  {this.state.feedback.error}
                </p>
              )}
            </div>
            {this.state.canSubmit ? (
              <Button>Sign up</Button>
            ) : (
              <Button disabled>Sign up</Button>
            )}
          </Form>
        </div>
      </>
    );
  }
}

export default withRouter(withUser(FormSignup));
