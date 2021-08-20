import React, { Component } from 'react'

export class FeedPostContent extends Component {

    componentDidMount(){
        console.log(" FeedPostContent componentmounted")
    }
    componentWillUnmount(){
        console.log(" FeedPostContent componen unmounting")
    }


    render() {
        return (
            <div>
                <p>PostContent</p>
            </div>
        )
    }
}

export default FeedPostContent
