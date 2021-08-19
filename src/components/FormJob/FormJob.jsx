import React, { Component } from 'react'
import Button from '../Base/Button/Button'
import apiHandler from '../../api/apiHandler'
import "./FormJob.css"
import {Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import TechnologyTag from '../Base/TechnologyTag/TechnologyTag'

//Form component to be used either for creating an article or editing it
export class FormJob extends Component {
    
    state={
        //This action prop needs to come from the parent element if you set Create it will create new post, if edit then it will update one
        action:this.props.action,
        idToUpdate:"",
        title:"",
        description:"",
        technologies:[""],
        currentTechnology:"",
        location:"",
        remote:false,
        link:"",
        contractType:"CDI",
        level:"junior",
        company:"",
        type:"Web Dev",
    }


    handleCreate=(event)=>{
        event.preventDefault();
        const formData=new FormData();
        console.log("create button clicked")
    }
    handleUpdate=(event)=>{
        event.preventDefault();
        const formData=new FormData();
        console.log("update button clicked")
    }

    //To handle input change on the form
    handleChange=(event)=>{
        let key = event.target.name;
        let value =(event.target.type==="file") ? event.target.files[0] : 
                (event.target.type==="checkbox")? event.target.checked : event.target.value;
  
        this.setState({
            [key]:value,
        })
    }

    technoLogiesPressed=(event)=>{
        if(event.key==="Enter"){

            let technologiesTemp = [...this.state.technologies];
        technologiesTemp.push(event.target.value);
        this.setState({
            technologies: technologiesTemp,
            currentTechnology:"",
        },()=>{console.log(this.state.technologies)})
        }
               
    }

    render() {
        return (
            <div className='jobForm-container'>
                <Form className='form' onSubmit={this.handleSubmit} >

                    <FormGroup className='form-group'>
                        <Label className="label" htmlFor="title">Title</Label>
                        <Input  className='input'
                                id="title"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Title of your Job..." />
                    </FormGroup>

                    <FormGroup className='form-group'>
                        <Label className="label" htmlFor="descritpion">Description</Label>
                        <Input  type="textarea"
                                className='input'
                                rows="5" 
                                cols="33"
                                id="description"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleChange}
                                placeholder="Description of the job" />
                    </FormGroup>

                    <FormGroup className='form-group'>
                        <Label className="label" htmlFor="currentTechnology">Technologies</Label>
                        <div id="technologyWrapper">
                            <div id="TechnologyTagsDiv">
                                {
                                    this.state.technologies.map((technology)=>{
                                        return <TechnologyTag technology={technology}/>
                                    })
                                }
                            
                            </div>
                        <Input  className='input'
                                id="currentTechnology"
                                name="currentTechnology"
                                value={this.state.currentTechnology}
                                onChange={this.handleChange}
                                onKeyPress={this.technoLogiesPressed}
                                type="text"
                                placeholder="Technologies...Press ente rafter each one">

                        </Input>
                        </div>
                    </FormGroup>

                    <FormGroup className='form-group'>
                        <Label className="label" htmlFor="location">Location</Label>
                        <Input  className='input'
                                id="location"
                                name="location"
                                value={this.state.location}
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Location of the job" />
                    </FormGroup>

                    <FormGroup className='form-group'>
                        <Label className="label" htmlFor="remote">Location</Label>
                        <Input  className='input'
                                id="remote"
                                name="remote"
                                value={this.state.remote}
                                onChange={this.handleChange}
                                type="checkbox"
                                />
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

                    <FormGroup className='form-group'>
                        <Label className="label" htmlFor="contractType">Type</Label>
                        <Input  type="select"
                                className='input'
                                id="contractType"
                                name="contractType"
                                value={this.state.contractType}
                                onChange={this.handleChange}>
                            <option value={this.state.type}>{this.state.type}</option>
                            <option value="CDI">CDI</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Internship">Internship</option>
                        </Input>
                    </FormGroup>

                    <FormGroup className='form-group'>
                        <Label className="label" htmlFor="level">Type</Label>
                        <Input  type="select"
                                className='input'
                                id="level"
                                name="level"
                                value={this.state.level}
                                onChange={this.handleChange}>
                            <option value={this.state.type}>{this.state.type}</option>
                            <option value="experienced">experienced</option>
                            <option value="senior">senior</option>
                            <option value="expert">expert</option>
                        </Input>
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

                    
                    {(this.state.action==="create") ? <Button onClick={this.handleCreate}>Create Job Listing</Button> : 
                    (this.state.action==="edit") ? <Button onClick={this.handleUpdate}>Submit Changes</Button> : <div>bumm</div> }
                    

                </Form>
                
            </div>
        )
    }
}

export default FormJob
