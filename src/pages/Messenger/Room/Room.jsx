import React, { Component } from 'react'
import Avatar from '../../../components/Base/Avatar/Avatar'
import { withMessenger } from '../../../components/MessengerCtx/withMessenger'
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

    isConnected(){
        if(!this.state.friend || !this.props.connectedUsers) return
        return this.props.connectedUsers.some(user => user.user?._id === this.state.friend._id)
    }

    render() {
        return (
            <div className={this.props.room._id === this.props.messengerContext.currentRoom?._id ? 'roomCard activeRoom' : 'roomCard'}>
                <Avatar size="small" url={this.state.friend?.profileImg} type={this.state.friend?.type}>
                    <div className={this.isConnected() ? "status online" : "status offline"}></div>
                </Avatar>
                <span 
                    className={`roomName 
                    ${this.props.room.notifications.find(n => n === this.props.me._id) ? '' : 'read'}`}
                >
                    {this.state.friend ? (
                        (this.state.friend.firstName ? this.state.friend.firstName : '') + 
                        ' ' + 
                        (this.state.friend.lastName ? this.state.friend.lastName : '')) : 'NO FRIEND'}
                </span>
            </div>
        )
    }
}

export default withMessenger(Room)
