import React, { Component } from 'react'
import Avatar from '../../../components/Base/Avatar/Avatar'
import './Room.css'

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
            <div className='roomCard'>
                <Avatar size="small" url={this.state.friend?.profileImg}>
                    <div className="online"></div>
                </Avatar>
                <span className='roomName'>
                    {this.state.friend ? this.state.friend.firstName + ' ' + this.state.friend.lastName : 'Room'}
                </span>
            </div>
        )
    }
}

export default Room
