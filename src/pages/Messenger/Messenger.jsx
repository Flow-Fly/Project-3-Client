import React, { Component } from 'react'
import Room from './Room/Room'
import Message from './Message/Message'
import apiHandler from '../../api/apiHandler'
import { withUser } from '../../components/Auth/withUser'
import { withMessenger } from '../../components/MessengerCtx/withMessenger'
import './Messenger.css'
import Button from '../../components/Base/Button/Button'

class Messenger extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            currentRoom: null,
            messages: [],
            writtingMessage : '',
            socket: null,
            receivedMessage: null,
            newFriend: '',
            addingFriendError: null
        }
        
        this.scrollChatRef = React.createRef()

        this.messagesLoaded = false
        this.timeout= null
        this.user = this.props.context.user
        
        this.openRoom = this.openRoom.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
        this.addFriend = this.addFriend.bind(this)
        this.loadMessages = this.loadMessages.bind(this)
    }

    async componentDidMount(){

        this.props.messengerContext.socket.on('receive', async data => {

            //if the room is opened delete notifications 
            if(this.state.currentRoom?.members.find(m => m._id === data.senderId)){
           
                await apiHandler.deleteNotifications(data.room._id, this.user._id)

                this.setState({
                    receivedMessage : {
                        sender : {
                            _id: data.senderId,
                            profileImg: data.senderImg},
                        content : data.content,
                        createdAt: Date.now()
                    }
                }, () => {
                    console.log('SATE', this.state)
                    this.setState({
                        messages: [...this.state.messages, this.state.receivedMessage],
                    })
                })
            }
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(!this.state.currentRoom) return 
        return this.scrollChatRef.current.scrollTop = this.scrollChatRef.current.scrollHeight //so it scrolls down to the last message 
    }

    componentWillUnmount(){
        this.setState({currentRoom: null})
        //clearTimeout(this.timeout) WHY ITS GIVES MEMORY LEAKS ????
    }

    async openRoom(room){

        try{
            //getMessages(roomId, firstMessageIndex, depth)
            const messages = await apiHandler.getMessages(room._id, 0, 100)
    
            await apiHandler.deleteNotifications(room._id, this.user._id)

            this.setState({
                currentRoom: room,
                messages: messages}, () => {
                    this.scrollChatRef.current.scrollTop = this.scrollChatRef.current.scrollHeight
                    this.messagesLoaded = true
                    setTimeout(() => this.messagesLoaded = false, 1000)
            })
        }
        catch(err){
            console.error(err)
        }
    }

    async submitMessage(e){  
        e.preventDefault()

        //sending the socket
        const receiver = this.state.currentRoom.members.find(m => m._id !== this.user._id) //same logic as friend in Room component

        this.props.messengerContext.socket.emit('send', {
            room : this.state.currentRoom,
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

    addFriend = async e => {
        if(e.key !== 'Enter') return 

        try{
            const newFriend = await apiHandler.getUserByMail(this.state.newFriend)

            if(!newFriend.length){

                this.setState({
                    addingFriendError: "This user doesn't exist",
                    newFriend: ''
                })
                
                return this.timeout = setTimeout(() => {
                    this.setState({addingFriendError : ''})
                }, 3000)

            } 
 
            const room = await apiHandler.createRoom(this.user._id, newFriend[0]._id)
            
            if(room.message){
                this.setState({
                    addingFriendError: room.message,
                    newFriend: ''
                })

                this.timeout = setTimeout(() => {
                    this.setState({addingFriendError : ''})
                }, 3000)

                return this.openRoom(room.room[0])
            }
            else{
                this.setState({
                    newFriend: ''
                })
                this.props.messengerContext.setRooms(room)
                return this.openRoom(room)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    async loadMessages(e){
        if(this.scrollChatRef.current.scrollTop > 100 || this.messagesLoaded) return

        this.messagesLoaded = true
        setTimeout(() => this.messagesLoaded = false, 1000)

        const olderMessages = await apiHandler.getMessages(this.state.currentRoom._id, this.state.messages.length - 1, 20)
        this.setState({
            messages: [...olderMessages, ...this.state.messages]
        }, () => this.scrollChatRef.current.scrollTop = this.scrollChatRef.current.scrollHeight)    
    }

    render() {
        return (
            <div className="messenger">
                <div className="roomsList">
                        <div className="addFriend">
                            <input className="addFriendInput"
                                type="text" 
                                placeholder='Find a friend with email'
                                onKeyDown={this.addFriend} 
                                onChange={e => this.setState({newFriend: e.target.value})} 
                                value={this.state.newFriend}
                                onFocus={e => e.target.placeholder = ''}
                                onBlur={e => e.target.placeholder = 'Find a friend with email'}
                                />
                             <span className='errorMsg'>{this.state.addingFriendError}</span> 
                             {/* Would be nice to have a fadeIn/fadeOut animation */}
                        </div>
                        {this.props.messengerContext.rooms.map((room, index) => {
                            return (
                                <div key={index} onClick={() => this.openRoom(room)}>
                                    <Room 
                                        room={room} 
                                        me={this.user} 
                                        connectedUsers={this.props.messengerContext.connectedUsers}/>
                                </div>
                            )
                        }) }
                </div>

                {!this.state.currentRoom ? <div className="noRoom">Select a room to start chatting</div> : (
                <div className="chatBox">
                    {!this.state.messages ? '' : (
                        <div className="chatBoxMessages" ref={this.scrollChatRef} onScroll={this.loadMessages}>
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

export default withMessenger(withUser(Messenger))
