import React, { Component } from 'react'

export class FeedJobContent extends Component {


    componentDidMount(){
        console.log(" FeedJobContent componentmounted")
    }
    componentWillUnmount(){
        console.log(" FeedJobContent componen unmounting")
    }

    render() {
        return (
            <div>
                <p>Job Content</p>
            </div>
        )
    }
}

export default FeedJobContent
