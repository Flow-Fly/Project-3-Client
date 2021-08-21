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
            socket: null,
            connectedUsers: [],
            receivedMessage: null
        }
        
        this.scrollChatRef = React.createRef()

        this.user = this.props.context.user
        this.openRoom = this.openRoom.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
    }

    async componentDidMount(){
        this.socket = io(process.env.REACT_APP_SOCKET_URL)

        //send my userId to socket server to inform it I just connected
        this.socket.emit('addUser', this.user._id)
        this.setState({
            id: this.socket.id
        })
        //retreive the array of all the connected users
        this.socket.on('getUsers', users => {
            this.setState({connectedUsers: users})
        })

        this.socket.on('receive', data => {
            this.setState({
                receivedMessage : {
                    sender : {
                        _id: data.senderId,
                        profileImg: data.senderImg},
                    content : data.content,
                    createdAt: Date.now()
                }
            }, () => {
                this.setState({
                    messages: [...this.state.messages, this.state.receivedMessage]
                }) 
            })
        })
        
 
        try{
            const rooms = await apiHandler.getRooms(this.user._id) 
            this.setState({rooms})
        }
        catch(err){
            console.error(err)
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(!this.state.currentRoom) return 
        return this.scrollChatRef.current.scrollTop = this.scrollChatRef.current.scrollHeight //so it scrolls down to the last message 
    }

    componentWillUnmount(){
        this.socket.emit('disconnected')
    }

    async openRoom(room){
        try{
            const messages = await apiHandler.getMessages(room._id)
    
            this.setState({
                currentRoom: room,
                messages: messages})
        }
        catch(err){
            console.error(err)
        }
    }

    async submitMessage(e){  
        e.preventDefault()

        //sending the socket
        const receiver = this.state.currentRoom.members.find(m => m._id !== this.user._id) //same logic as friend in Room component

        this.socket.emit('send', {
            senderId: this.user._id,
            senderImg : this.user.profileImg,
            receiverId:receiver._id,
            content: this.state.writtingMessage
        })

        const message = {
            room: this.state.currentRoom,
            sender : this.user._id,
            content: this.state.writtingMessage
        }

        try{
            const newMessage = await apiHandler.submitMessage(message)
            
            this.setState({
                messages: [...this.state.messages, newMessage],
                writtingMessage:''
            }) 
        }
        catch(err){
            console.error(err)
        }
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
                                <div key={room._id} onClick={() => this.openRoom(room)}>
                                    <Room 
                                        room={room} 
                                        me={this.user} 
                                        connectedUsers={this.state.connectedUsers}/>
                                </div>
                            )
                        }) }
                </div>

                {!this.state.currentRoom ? <div className="noRoom">Select a room to start chatting</div> : (
                <div className="chatBox">
                    {!this.state.messages ? '' : (
                        <div className="chatBoxMessages" ref={this.scrollChatRef}>
                            <div className="chatBoxMessagesWrapper">
                                {this.state.messages.map((message, index) => {
                                    return (
                                        <Message key={index} message={message}/>
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
