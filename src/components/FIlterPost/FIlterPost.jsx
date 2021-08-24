import React, { Component } from 'react'
import apiHandler from '../../api/apiHandler'
import  "./FIlterPost.css"
import FilterTag from '../Base/FilterTag/FilterTag'

export class FIlterPost extends Component {
    state={
        filters:[],
    }


    toggleSelection = (filter)=>{
        if (this.state.filters.includes(filter)) {
            this.setState({
                filters: this.state.filters.filter((tag)=>{
                    if (tag!==filter) return tag;
                })
            },()=>{this.props.filterPosts(this.state.filters)})
        }

        else{
            let filtersTemp = [...this.state.filters]
            filtersTemp.push(filter);
            this.setState({
                filters: filtersTemp,
            },()=>{this.props.filterPosts(this.state.filters)})
        }
    }

    render() {
        let filtersTemp=[];
        this.props.posts.forEach((post)=>{
            if (filtersTemp.includes(post.type)===false) filtersTemp.push(post.type);
        })
        
            return (
                <div className="filterPostWrapper">
                    <h5>Filter by type</h5>
                    <div className="filerPostTag">
                    {filtersTemp.map((filter)=>{
                        return <FilterTag key={filter} filter={filter} isActive={this.state.filters.includes(filter)? "active": ""} toggleSelection={this.toggleSelection}/>
                    })}
                    </div>
                </div> 
            )
    }
}

export default FIlterPost
