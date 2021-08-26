import React, { Component } from 'react';
import Button from '../Base/Button/Button';
import apiHandler from '../../api/apiHandler';
import './FormArticle.css';
import { Form, FormGroup, Label, Input } from 'reactstrap';

//Form component to be used either for creating an article or editing it
export class FormArticle extends Component {
  state = {
    //This action prop needs to come from the parent element if you set Create it will create new post, if edit then it will update one
    action: this.props.action,
    idToUpdate:
      this.props.displayedPost !== null &&
      this.props.displayedPost !== undefined
        ? this.props.displayedPost._id
        : '',
    title:
      this.props.displayedPost !== null &&
      this.props.displayedPost !== undefined
        ? this.props.displayedPost.title
        : '',
    content:
      this.props.displayedPost !== null &&
      this.props.displayedPost !== undefined
        ? this.props.displayedPost.content
        : '',
    type:
      this.props.displayedPost !== null &&
      this.props.displayedPost !== undefined
        ? this.props.displayedPost.type
        : 'Web Dev',
    link:
      this.props.displayedPost !== null &&
      this.props.displayedPost !== undefined
        ? this.props.displayedPost.link
        : '',
    image: '',
  };

  handleCreate = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('content', this.state.content);
    formData.append('type', this.state.type);
    formData.append('link', this.state.link);
    formData.append('image', this.state.image);

    apiHandler
      .createNewPost(formData)
      .then((createdPost) => {
        this.props.handlePostCreated(createdPost);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleUpdate = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('content', this.state.content);
    formData.append('type', this.state.type);
    formData.append('link', this.state.link);
    formData.append('image', this.state.image);
    apiHandler
      .updateOnePost(this.state.idToUpdate, formData)
      .then((updatedPost) => {
        this.props.handlePostUpdated(updatedPost);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  closePostForm = (event) => {
    event.preventDefault();
    this.props.closePostForm();
  };

  //To handle input change on the form
  handleChange = (event) => {
    let key = event.target.name;
    let value =
      event.target.type === 'file' ? event.target.files[0] : event.target.value;

    this.setState({
      [key]: value,
    });
  };

  render() {
    return (
      <div className="articleForm-container">
        <Button className="closeFormButton" onClick={this.closePostForm}>
          x
        </Button>
        {this.state.action === 'create' ? (
          <h3 className="formTitle">Create new Post</h3>
        ) : this.state.action === 'edit' ? (
          <h3 className="formTitle">Update Post</h3>
        ) : null}
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
              placeholder="Title of your Post..."
            />
          </FormGroup>

          <FormGroup className="form-group">
            <Label className="label" htmlFor="content">
              Description
            </Label>
            <Input
              type="textarea"
              className="input"
              rows="5"
              cols="33"
              id="content"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              placeholder="Title of your Post..."
            />
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
              <option value="Web Dev">Web Dev</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="All">All</option>
            </Input>
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
            <Label className="custom-upload label" htmlFor="image">
              Upload image
            </Label>
            <Input
              className="input"
              id="image"
              type="file"
              name="image"
              onChange={this.handleChange}
            />
          </FormGroup>

          {this.state.action === 'create' ? (
            <Button onClick={this.handleCreate}>Create Post</Button>
          ) : this.state.action === 'edit' ? (
            <Button onClick={this.handleUpdate}>Submit Changes</Button>
          ) : (
            <div>bumm</div>
          )}
        </Form>
      </div>
    );
  }
}

export default FormArticle;
