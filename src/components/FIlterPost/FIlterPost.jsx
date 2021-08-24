import React, { Component } from 'react'
import apiHandler from '../../api/apiHandler'
import  "./FIlterPost.css"
import FilterTag from '../Base/FilterTag/FilterTag'

export class FIlterPost extends Component {
    state={
        filters:[],
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
                        return <FilterTag key={filter} filter={filter}/>
                    })}
                    </div>
                </div> 
            )
    }
}

export default FIlterPost
