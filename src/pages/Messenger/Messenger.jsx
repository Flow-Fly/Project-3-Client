import React, { Component } from 'react'
import Room from './Room/Room'
import Message from './Message/Message'
import apiHandler from '../../api/apiHandler'
import { withUser } from '../../components/Auth/withUser'
import './Messenger.css'

class Messenger extends Component {

    constructor(props){
        super(props)

        this.state = {
            rooms: [],
            currentRoom: null,
            messages: [],
            writtingMessage : ''
        }
        
        this.user = this.props.context.user
        this.openRoom = this.openRoom.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
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

    async openRoom(id){
        console.log(id)
        const messages = await apiHandler.getMessages(id)

        this.setState({
            currentRoom: id,
            messages: messages}, () => console.log(this.state))
    }

    async submitMessage(e){  
        e.preventDefault()

        const message = {
            room: this.state.currentRoom,
            sender : this.user._id,
            content: this.state.writtingMessage
        }

        const newMessage = await apiHandler.submitMessage(message)

        this.setState({
            messages: [...this.state.messages, newMessage],
            writtingMessage:''
        })
    }

    render() {

        return (
            <div className="messenger">
                <div className="chatMenu">
                    {this.state.rooms ?  //Je voulais test guard sur le length mais cannot read property of undefiened ??
                        this.state.rooms.map(room => {
                            return (
                                <div key={room._id} onClick={() => this.openRoom(room._id)}>
                                    <Room room={room} me={this.user} />
                                </div>
                            )
                        }) : ''}
                </div>

                {!this.state.currentRoom ? <div>Select to room to start chatting</div> : (
                    <div className="chatBox">
                        {!this.state.messages ? '' : (
                            <div className="chatBoxMessages">
                                {this.state.messages.map(message => {
                                    return (
                                        <Message key={message._id} message={message}/>
                                    )
                                })}
                            </div>
                        )}    

                        <div className="chatBoxWritting">
                            <textarea 
                                className="chatBoxInput" 
                                placeholder="Write your message ..."
                                onChange={e => this.setState({writtingMessage: e.target.value})}
                                value={this.state.writtingMessage}
                                ></textarea>
                            <button className="ChatSendMessage" onClick={this.submitMessage}>Send</button>
                        </div>

                    </div>
                )}
                
            </div>
        )
    }
}

export default withUser(Messenger)
