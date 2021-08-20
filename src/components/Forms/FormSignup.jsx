import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { withUser } from '../Auth/withUser';
import apiHandler from '../../api/apiHandler';

const initialState = {
  canSubmit: false,
  feedback: null,
};

const devState= {
  firstName: "Jean",
  lastName:"D'eau",
  email: "email@email.com",
  password: "1234@azer",
  phoneNumber: '123456789',
  graduationYear: 2020,
  location: 'Paris',
  type: 'webdev'

}

class FormSignup extends Component {
  state = { ...devState };

  handleChange = (event) => {
    const value =
      event.target.type === 'file' ? event.target.files[0] : event.target.value;

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

  handlePassword = (e) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const value = e.target.value;
    const passed = regex.test(value);

    if (!passed) {
      e.target.style.boxShadow = 'inset 0px 0px 2px 3px red';
      this.setState({
        password: value,
        feedback: {
          error: 'Please provide 8 characters, a number and a punctuation.',
        },
      });
    } else {
      e.target.style.boxShadow = 'inset 0px 0px 2px 3px #21C078';

      this.setState({
        password: value,
        feedback: { message: 'Your password is safe!' },
      });
    }
  };

  handleConfirm = (e) => {
    if (this.state.password === e.target.value) {
      e.target.style.boxShadow = 'inset 0px 0px 2px 3px #21C078';
      this.setState({
        canSubmit: true,
        feedback: { message: 'Ready to Sign Up !' },
      });
    } else {
      e.target.style.boxShadow = 'inset 0px 0px 2px 3px red';
      this.setState({
        canSubmit: false,
        feedback: { error: 'Your passwords are not matching' },
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
      <form onSubmit={this.handleSubmit}>
        <h2>Signup</h2>

        <div>
          <label htmlFor="firstName">Firstname: </label>
          <input type="text" id="firstName" name="firstName" required value={devState.firstName}/>
        </div>

        <div>
          <label htmlFor="lastName">Lastname: </label>
          <input type="text" id="lastName" name="lastName" value={devState.lastName}/>
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input
            onChange={this.handleChange}
            value={this.state.email}
            type="email"
            id="email"
            name="email"
            required
            value={devState.email}
          />
        </div>

        <div>
          <label htmlFor="tel">Phone number: </label>
          <input type="tel" id="tel" name="tel" value={devState.phoneNumber}/>
        </div>

        <div>
          <label htmlFor="graduation">Graduation year: </label>
          <input
            type="number"
            id="graduation"
            name="graduation"
            min="2013"
            max="2022"
            value={devState.graduationYear}
          />
        </div>

        <div>
          <label htmlFor="location">
            <select name="location" id="location" value={devState.location}>
              <option value="-1">Please select a Campus</option>
              <option value="Paris">Paris</option>
              <option value="Madrid">Madrid</option>
              <option value="Amsterdam">Amsterdam</option>
              <option value="Barcelona">Barcelona</option>
              <option value="Berlin">Berlin</option>
              <option value="Miami">Miami</option>
              <option value="SaoPaulo">Sao Paulo</option>
              <option value="Lisbon">Lisbon</option>
              <option value="MexicoCity">Mexico City</option>
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="type">
            Select your work field:
            <select name="type" id="type" required value={devState.type}>
              <option value="-1">Please select your field of work</option>
              <option value="webdev">Web Development</option>
              <option value="design">UI / UX</option>
              <option value="dataAnalyst">Data Analyst</option>
              <option value="cyberSecurity">Cyber Security</option>
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            onChange={this.handlePassword}
            value={this.state.password}
            type="password"
            id="password"
            name="password"
            value={devState.password}
          />
        </div>

        <div>
          <label htmlFor="password">Confirmation: </label>
          <input
            onChange={this.handleConfirm}
            type="password"
            id="confirmations"
            name="confirmation"
            value={devState.password}
          />
        </div>
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
          <button>Sign up</button>
        ) : (
          <button disabled>Sign up</button>
        )}
      </form>
    );
  }
}

export default withRouter(withUser(FormSignup));
