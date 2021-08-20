import React, { Component } from 'react'
import Room from './Room/Room'
import Message from './Message/Message'
import apiHandler from '../../api/apiHandler'
import { withUser } from '../../components/Auth/withUser'
import './Messenger.css'
import Button from '../../components/Base/Button/Button'
import { io } from 'socket.io-client'

class Messenger extends Component {

    constructor(props){
        super(props)

        this.state = {
            rooms: [],
            currentRoom: null,
            messages: [],
            writtingMessage : '',
        }
        
        this.scrollChatRef = React.createRef()
        this.socketRef = React.createRef(io(process.env.REACT_APP_SOCKET_URL))
        this.user = this.props.context.user
        this.openRoom = this.openRoom.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
    }

    async componentDidMount(){

        //send userId to socket server
        this.socketRef.current.emit('addUser', this.user._id)

        //retreive the array of connected users
        this.socketRef.current.on('getUsers', users => {
            
        })
 
        try{
            const rooms = await apiHandler.getRooms(this.user._id) 
            this.setState({rooms})
        }
        catch(err){
            console.log(err)
        }
    }

    async openRoom(roomId){
        const messages = await apiHandler.getMessages(roomId)

        this.setState({
            currentRoom: roomId,
            messages: messages})

        this.scrollChatRef.current.scrollTop = this.scrollChatRef.current.scrollHeight //so it scrolls to the bottom 
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
        }, () => this.scrollChatRef.current.scrollTop = this.scrollChatRef.current.scrollHeight)
    }

    handleKeyDown = e => {
        if(e.key === 'Enter' && e.shiftKey) return this.submitMessage(e)
    }

    render() {

        return (
            <div className="messenger">
                <div className="roomsList">
                        {this.state.rooms.map(room => {
                            return (
                                <div key={room._id} onClick={() => this.openRoom(room._id)}>
                                    <Room room={room} me={this.user}/>
                                </div>
                            )
                        }) }
                </div>

                {!this.state.currentRoom ? <div className="noRoom">Select a room to start chatting</div> : (
                <div className="chatBox">
                    {!this.state.messages ? '' : (
                        <div className="chatBoxMessages" ref={this.scrollChatRef}>
                            <div className="chatBoxMessagesWrapper">
                                {this.state.messages.map(message => {
                                    return (
                                        <Message key={message._id} message={message}/>
                                    )
                                })}
                            </div>
                        </div>
                    )}    

                    <div className="chatBoxWritting">
                        {/* Eventually use Draf.js package to display the text as it is formated in text area */}
                        <textarea 
                            onKeyDown={this.handleKeyDown}
                            className="chatBoxInput" 
                            placeholder="Write your message ..."
                            onFocus={e => e.target.placeholder = ''}
                            onBlur={e => e.target.placeholder = 'Write your message ...'}
                            onChange={e => this.setState({writtingMessage: e.target.value})}
                            value={this.state.writtingMessage}
                            ></textarea>
                        <Button className="ChatSendMessage" onClick={this.submitMessage}>Send</Button>
                    </div>

                </div>)}
                
            </div>
        )
    }
}

export default withUser(Messenger)
