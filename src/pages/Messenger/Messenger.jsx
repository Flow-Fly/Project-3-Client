import React, { Component } from 'react'
import Room from './Room/Room'
import apiHandler from '../../api/apiHandler'
import { withUser } from '../../components/Auth/withUser'
import './Messenger.css'

class Messenger extends Component {

    constructor(props){
        super(props)

        this.state = {
            rooms: [],
            currentChat: null,
            messages: []
        }
        
        this.user = this.props.context.user
        this.openRoom = this.openRoom.bind(this)
    }

    async componentDidMount(){
        try{
            const rooms = await apiHandler.getRooms(this.user._id) 
            this.setState({rooms})
        }
        catch(err){
            console.log(err)
        }
    }

    openRoom(id){
        this.setState({currentChat: id})
    }

    render() {

        return (
            <div className="messenger">
                <div className="chatMenu">
                    {this.state.rooms ? 
                        this.state.rooms.map(room => {
                            return (
                                <div onClick={() => this.openRoom(room._id)}>
                                    <Room key={room._id} room={room} me={this.user} />
                                </div>
                            )
                        }) : ''}
                </div>

                {!this.state.currentChat ? <div>Select to room to start chatting</div> :
                    (<div className="chatBox">
                    <div className="chatBoxMessages">
                        
                    </div>
                    <div className="chatBoxWritting">
                        <textarea className="chatBoxInput" placeholder="Write your message ..."></textarea>
                        <button className="ChatSendMessage">Send</button>
                    </div>

                    </div>)}
                
            </div>
        )
    }
}

export default withUser(Messenger)
