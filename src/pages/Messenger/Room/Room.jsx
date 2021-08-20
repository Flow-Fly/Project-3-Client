import React, { Component } from 'react'

class Room extends Component {
    constructor(props){
        super(props)

        this.state = {
            friend: null
        }
    }

    componentDidMount(){
        const friend = this.props.room.members.find(m => m._id !== this.props.me._id)
        this.setState({friend})
    }

    render() {
        return (
            <div className='room'>
                <span className='roomName'>
                    {this.state.friend ? this.state.friend.email : 'Room'}</span>
            </div>
        )
    }
}

export default Room
