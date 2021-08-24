import React, { Component } from 'react';
import Button from '../Base/Button/Button';
import './FormJob.css';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import TechnologyTag from '../Base/TechnologyTag/TechnologyTag';
import apiHandler from '../../api/apiHandler';

//Form component to be used either for creating an article or editing it
export class FormJob extends Component {
  state = {
    //This action prop needs to come from the parent element if you set Create it will create new post, if edit then it will update one
    title: '',
    description: '',
    technologies: [],
    currentTechnology: '',
    location: '',
    remote: false,
    link: '',
    contractType: 'CDI',
    level: 'junior',
    company: '',
    type: 'Web Dev',
  };

  copyStateFromJob() {
    this.setState({
      title: this.props.job.title,
      description: this.props.job.description,
      technologies: this.props.job.technologies,
      currentTechnology: this.props.job.currentTechnology,
      location: this.props.job.location,
      remote: this.props.job.remote,
      link: this.props.job.link,
      contractType: this.props.job.contractType,
      level: this.props.job.level,
      company: this.props.job.company,
      type: this.props.job.type,
    });
  }

  componentDidMount() {
    if (this.props.job) {
      this.copyStateFromJob();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.job &&
      (!prevProps.job || prevProps.job._id !== this.props.job._id)
    ) {
      this.copyStateFromJob();
    }
  }

  //handle input change on the form
  handleChange = (event) => {
    let key = event.target.name;
    let value =
      event.target.type === 'file'
        ? event.target.files[0]
        : event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    this.setState({
      [key]: value,
    });
  };

  //handle form data submit
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('handleSubmit', this.state.title);

    if (this.props.job) {
      apiHandler
        .updateJob(this.props.job._id, this.state)
        .then((data) => {
          console.log('Editd', data);
          //called apihandler here => job already updated
          this.props.onJobUpdated(data);
        })
        .catch((err) => console.log(err));
    } else {
      apiHandler
        .addJob(this.state)
        .then((data) => {
          console.log('Created', data);
          //called apihandler here => so job already created
          this.props.onJobCreated(data);
          // this.props.closeJobForm();
        })
        .catch((err) => console.log(err));
    }
  };

  // close job form by click on the x
  closeJobForm = (event) => {
    event.preventDefault();
    this.props.closeJobForm();
  };

  //techno tags
  technoLogiesPressed = (event) => {
    
    let str = this.state.currentTechnology.replaceAll(' ', '');
    if (event.key === 'Enter' && str !== '') {
      let technologiesTemp = [...this.state.technologies];
      technologiesTemp.push(event.target.value);
      this.setState({
        technologies: technologiesTemp,
        currentTechnology: '',
      });
    }
  };

  removeTechnology = (index) => {
    let technologiesTemp = [...this.state.technologies];
    technologiesTemp.splice(index, 1);
    this.setState({ technologies: technologiesTemp });
  };

  render() {
    return (
      <div className="jobForm-container">
        <Button onClick={this.closeJobForm}>x</Button>
        <Form className="form" onSubmit={this.handleSubmit}>
          <FormGroup className="form-group">
            <Label className="label" htmlFor="title">
              Title
            </Label>
            <Input
              className="input"
              id="title"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              type="text"
              placeholder="Title of your Job..."
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Label className="label" htmlFor="descritpion">
              Description
            </Label>
            <Input
              type="textarea"
              className="input"
              rows="5"
              cols="33"
              id="description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              placeholder="Description of the job"
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Label className="label" htmlFor="currentTechnology">
              Technologies
            </Label>
            <div id="technologyWrapper">
              <Input
                className="input"
                id="currentTechnology"
                name="currentTechnology"
                value={this.state.currentTechnology}
                onChange={this.handleChange}
                onKeyPress={this.technoLogiesPressed}
                type="text"
                placeholder="Technologies...Press enter after each one"
              ></Input>
              <div id="TechnologyTagsDiv">
                {this.state.technologies.map((technology, index) => {
                  return (
                    <TechnologyTag
                      key={index}
                      technology={technology}
                      remove={() => {
                        this.removeTechnology(index);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </FormGroup>
          <FormGroup className="form-group">
            <Label className="label" htmlFor="location">
              Location
            </Label>
            <Input
              className="input"
              id="location"
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
              type="text"
              placeholder="Location of the job"
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Label className="label" htmlFor="remote">
              Remote
            </Label>
            <Input
              className="input"
              id="remote"
              name="remote"
              value={this.state.remote}
              onChange={this.handleChange}
              type="checkbox"
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Label className="label" htmlFor="link">
              Link
            </Label>
            <Input
              className="input"
              id="link"
              name="link"
              value={this.state.link}
              onChange={this.handleChange}
              type="text"
              placeholder="Link if you want to share"
            />
          </FormGroup>
          <FormGroup className="form-group">
            <Label className="label" htmlFor="contractType">
              Contract Type
            </Label>
            <Input
              type="select"
              className="input"
              id="contractType"
              name="contractType"
              value={this.state.contractType}
              onChange={this.handleChange}
            >
              <option value={this.state.type}>{this.state.type}</option>
              <option value="CDI">CDI</option>
              <option value="Part-time">Part-time</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </Input>
          </FormGroup>
          <FormGroup className="form-group">
            <Label className="label" htmlFor="level">
              Level
            </Label>
            <Input
              type="select"
              className="input"
              id="level"
              name="level"
              value={this.state.level}
              onChange={this.handleChange}
            >
              <option value={this.state.level}>{this.state.level}</option>
              <option value="experienced">experienced</option>
              <option value="senior">senior</option>
              <option value="expert">expert</option>
            </Input>
          </FormGroup>
          <FormGroup className="form-group">
            <Label className="label" htmlFor="Type">
              Type
            </Label>
            <Input
              type="select"
              className="input"
              id="type"
              name="type"
              value={this.state.type}
              onChange={this.handleChange}
            >
              <option value={this.state.type}>{this.state.type}</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="All">All</option>
            </Input>
          </FormGroup>
          {this.props.action === 'create' && <Button>Create Job</Button>}
          {this.props.action === 'edit' && <Button>Submit changes</Button>}
        </Form>
      </div>
    );
  }
}

export default FormJob;
