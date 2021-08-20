import React, { Component } from 'react'
import FeedPostCard from '../FeedPostCard/FeedPostCard'
import apiHandler from '../../api/apiHandler'
import "./FeedPostContent.css"

export class FeedPostContent extends Component {

    state ={
        items:[],
    }

    async componentDidMount(){
        try{
           let posts= await apiHandler.getAllPost();
           this.setState({items:posts})
        }

        catch (error)
        {
            console.log(error)
        }
        
    }
    componentWillUnmount(){
        console.log(" FeedPostContent componen unmounting")
    }


    render() {
        if (this.state.items===[]) return <div className="FeedPostContent">
                <h4>Loading</h4>
        </div>
        
        

        return (
            <div className="FeedPostContent">
                {this.state.items.map((post)=>{
                    return <FeedPostCard key={post._id} post={post} />
                })}
            </div>
        )
    }
}

export default FeedPostContent
