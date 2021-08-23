import React, { Component } from 'react'
import Button from '../Base/Button/Button'
import apiHandler from '../../api/apiHandler'
import "./FormArticle.css"
import {Form, FormGroup, Label, Input, FormText } from 'reactstrap';

//Form component to be used either for creating an article or editing it
export class FormArticle extends Component {
    
    state={
        //This action prop needs to come from the parent element if you set Create it will create new post, if edit then it will update one
        action:this.props.action,
        idToUpdate:"",
        title:"",
        content:"",
        type:"Web Dev",
        link:"",
        image:"",
    }


    handleCreate=(event)=>{
        event.preventDefault();
        const formData=new FormData();
        formData.append('title',this.state.title)
        formData.append('content',this.state.content)
        formData.append('type',this.state.type)
        formData.append('link',this.state.link)
        formData.append('image',this.state.image)


        apiHandler.createNewPost(formData)
            .then((dbrEs)=>{
                console.log(dbrEs); 
                this.props.loadPosts();
                this.props.closePostForm()})
            .catch((error)=>{console.log(error)})

    }
    handleUpdate=(event)=>{
        event.preventDefault();
        const formData=new FormData();
        console.log("update button clicked")
    }

    closePostForm = (event)=>{
        event.preventDefault();
        this.props.closePostForm();
    }

    //To handle input change on the form
    handleChange=(event)=>{

        let key = event.target.name;
        let value =(event.target.type==="file") ? event.target.files[0] : event.target.value;
  
        this.setState({
            [key]:value,
        })
    }

    render() {
        return (
            <div className='articleForm-container'>
                <Button className="closeFormButton" onClick={this.closePostForm}>X</Button>
                {(this.state.action==="create") ?   <h3 className="formTitle">Create new Post</h3> : 
                    (this.state.action==="edit") ?  <h3 className="formTitle">Update Post</h3> : null}
                <Form className='form' onSubmit={this.handleSubmit} >

                    <FormGroup className='form-group'>
                        <Label className="label" htmlFor="title">Title</Label>
                        <Input  className='input'
                                id="title"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Title of your Post..." />
                    </FormGroup>

                    <FormGroup className='form-group'>
                        <Label className="label" htmlFor="content">Description</Label>
                        <Input  type="textarea"
                                className='input'
                                rows="5" 
                                cols="33"
                                id="content"
                                name="content"
                                value={this.state.content}
                                onChange={this.handleChange}
                                placeholder="Title of your Post..." />
                    </FormGroup>

                    <FormGroup className='form-group'>
                        <Label className="label" htmlFor="Type">Type</Label>
                        <Input  type="select"
                                className='input'
                                id="type"
                                name="type"
                                value={this.state.type}
                                onChange={this.handleChange}>
                            <option value={this.state.type}>{this.state.type}</option>
                            <option value="UI/UX">UI/UX</option>
                            <option value="Data Analyst">Data Analyst</option>
                            <option value="Cyber Security">Cyber Security</option>
                            <option value="All">All</option>
                        </Input>
                    </FormGroup>

                    <FormGroup className='form-group'>
                        <Label className="label" htmlFor="link">Link</Label>
                        <Input  className='input'
                                id="link"
                                name="link"
                                value={this.state.link}
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Link if you want to share" />
                    </FormGroup>


                    <FormGroup className="form-group">
                        <Label className="custom-upload label" htmlFor="image">Upload image</Label>
                        <Input className="input" id="image" type="file" name='image' onChange={this.handleChange}/>
                    </FormGroup>

                    {(this.state.action==="create") ? <Button onClick={this.handleCreate}>Create Post</Button> : 
                    (this.state.action==="edit") ? <Button onClick={this.handleUpdate}>Submit Changes</Button> : <div>bumm</div> }
                    

                </Form>
                
            </div>
        )
    }
}

export default FormArticle
