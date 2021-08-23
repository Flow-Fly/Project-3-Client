import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { withUser } from '../Auth/withUser';
import apiHandler from '../../api/apiHandler';
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import Button from '../Base/Button/Button';
import './FormSign.css';
import utils from '../../utils/helpers';
import google from '../../assets/auth/btn_google_signin_light_normal_web@2x.png';
import github from '../../assets/auth/github-btn.png'

const initialState = {
  canSubmit: '',
  passwordSafe: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
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
  constructor(props) {
    super(props)
    this.state = {...initialState}
    this.textInput = React.createRef()
    this.focusTextInput = this.focusTextInput.bind(this)
  }
  
  focusTextInput() {
    this.textInput.current.focus()
  }

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
        this.props.history.push('/signin');
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
          <Form className="form" onSubmit={this.handleSubmit}>
            <FormGroup className="form-group">
              <Label className="label" htmlFor="firstName" hidden>
                First name:
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
              <Label className="label" htmlFor="lastName" hidden>
                Last name:
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
              <Label className="label" htmlFor="email" hidden>
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
              <Label className="label" htmlFor="password" hidden>
                Password:
              </Label>

              {this.state.password === '' ? (
                <Input
                  className="input"
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handlePassword}
                  type="password"
                  placeholder="Password: "
                  required
                  autoComplete="new-password"
                  ref={this.textInput}
                  onClick={this.focusTextInput}
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
                    placeholder="Password: "
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
                    placeholder="Password: "
                    required
                    invalid
                    autoComplete="new-password"
                    autoFocus
                  />
                  <FormFeedback invalid='true'>
                    Your password must contain atleast 8 characters, a number
                    and a punctuation.
                  </FormFeedback>
                </>
              )}
            </FormGroup>
            <FormGroup className="form-group">
              <Label className="label" htmlFor="confirmation" hidden>
                Confirm your password:
              </Label>
              {this.state.confirmation === '' ? (
                <Input
                  className="input"
                  id="confirmation"
                  name="confirmation"
                  value={this.state.confirmation}
                  onChange={this.handleConfirm}
                  type="password"
                  onFocus={event => event.target.placeholder = ''}
                  onBlur={event => event.target.placeholder = 'Confirm you password: '}
                  placeholder= 'Confirm your password: '
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
                    placeholder="Confirm you password: "
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
                    placeholder="Confirm you password: "
                    required
                    invalid
                    autoFocus
                  />
                  <FormFeedback invalid='true'>
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
