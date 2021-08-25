import React, { Component } from 'react'
import "./FavouriteList.css"
import apiHandler from "../../api/apiHandler"

export class FavouriteList extends Component {
    state={
        elements:null
    }

    async componentDidMount(){
        apiHandler.getFavourites()
            .then((dbRes)=>{
                console.log(dbRes)
                if (this.props.type==='Post'){
                    this.setState({elements:dbRes.favouritePosts})
                    
                }
                else if (this.props.type==='Job'){
                    this.setState({elements:dbRes.favouriteJobs})
                }

            })
            .catch((error)=>console.log(error))
    }

    removeFromFavourites= (postId)=>{
        console.log(postId)
        apiHandler.deleteFavouritePost(postId)
        .then((dbRes)=>{
            this.setState({
                elements:this.state.elements.filter(element=>String(element._id)!==postId)
            })
        })
        .catch((error)=>{console.log(error)})
      }

    render() {
        return (
            <div className="favList">
                <h5>{this.props.type}s:</h5>
                <ul>
                    {this.state.elements===null?
                    <p>Loading...</p> :this.state.elements.map((element)=>{return <li>{element.title} <span className='remove' onClick={()=>{this.removeFromFavourites(element._id)}}>X</span></li>})
                    }
                </ul>
            </div>
        )
    }
}

export default FavouriteList
