import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '../Base/Button/Button';
import utils from '../../utils/helpers';
import Uploader from '../Base/Uploader/Uploader';
import apiHandler from '../../api/apiHandler'
import Avatar from '../Base/Avatar/Avatar';
import {withUser} from '../Auth/withUser'

const initial = {
    user: {
        firstName: '',
        lastName: '',
        profileImg: '',
        phoneNumber: '',
        graduationYear: 2013,
        location: -1,
        type: -1,
    },
};
export class FormEditProfile extends Component {
  state = { ...initial };

  imageRef = React.createRef()

  componentDidMount() {
    const user = this.props.context.user;
    this.setState({user});
    console.log(this.state.user)
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
    this.setState({ user: {...this.state.user, [key]: value} });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const fd = new FormData();

    for (const key in this.state.user) {
      if (key === "profileImg") continue;
      fd.append(key, this.state.user[key]);
    }

    if (this.imageRef.current.files[0]) {
      fd.append("profileImg", this.imageRef.current.files[0]);
    }
    for (var value of fd.values()) {
        console.log(value);
     }
    apiHandler
      .updateUser(fd)
      .then((data) => {
        this.props.context.setUser(data);
        console.log('updated! ',this.props.context.user)
        // this.setState({
        //   httpResponse: {
        //     status: "success",
        //     message: "Profile successfully updated.",
        //   },
        // });

        // this.timeoutId = setTimeout(() => {
        //   this.setState({ httpResponse: null });
        // }, 2000);
      })
      .catch((error) => {
          console.error(error)
        // this.setState({
        //   httpResponse: {
        //     status: "failure",
        //     message:
        //       "Something bad happened while updating your profile, try again later",
        //   },
        // });

        // this.timeoutId = setTimeout(() => {
        //   this.setState({ httpResponse: null });
        // }, 2000);
      });
}
handleFileSelect = (temporaryURL) => {
    // Get the temporaryURL from the UploadWidget component and
    // set the state so we can have a visual feedback on what the image will look like :)
    this.setState({ tmpUrl: temporaryURL });
  };

  render() {
      //if (this.props.context.isLoading) return <div className="loading">Loading...</div>
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
                value={this.state.user.firstName}
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
                value={this.state.user.lastName}
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
                value={this.state.user.email}
                onChange={this.handleChange}
                type="text"
                placeholder="Email"
                required
              />
            </FormGroup>
            <Avatar url={this.state.tmpUrl || this.state.user.profileImg } size='small'></Avatar>
            <Uploader
              ref={this.imageRef}
              onFileSelect={this.handleFileSelect}
              name="profileImg"
            >
              Change profile picture
            </Uploader>

            <FormGroup className="form-group">
              <Label className="label" htmlFor="phoneNumber">
                Phone number:{' '}
              </Label>
              <Input
                className="input"
                id="phoneNumber"
                name="phoneNumber"
                value={this.state.user.phoneNumber}
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
                value={this.state.user.graduationYear}
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
                value={this.state.user.location}
                onChange={this.handleChange}
              >
                Location:{' '}
              </Label>

              <Input
                name="location"
                id="location"
                type="select"
                name="location"
                value={this.state.user.location}
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
                value={this.state.user.type}
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
                value={this.state.user.type}
                onChange={this.handleChange}
              >
                <option value="-1">Please select your field of work</option>
                <option value="Web Dev">Web Development</option>
                <option value="UI/UX">UI / UX</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Cyber Security">Cyber Security</option>
              </Input>
            </FormGroup>

            <Button>Save Edits</Button>
          </Form>
        </div>
      </>
    );
  }
}

export default withUser(FormEditProfile);
