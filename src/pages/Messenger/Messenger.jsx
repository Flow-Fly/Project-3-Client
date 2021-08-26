import React, { Component } from 'react'
import Room from './Room/Room'
import Message from './Message/Message'
import apiHandler from '../../api/apiHandler'
import { withUser } from '../../components/Auth/withUser'
import { withMessenger } from '../../components/MessengerCtx/withMessenger'
import './Messenger.css'
import Button from '../../components/Base/Button/Button'
import {Hint} from 'react-autocomplete-hint'

class Messenger extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            currentRoom: null,
            messages: [],
            writtingMessage : '',
            socket: null,
            newFriend: '',
            addingFriendError: null,
            suggestedEmails: []
        }
        
        this.scrollChatRef = React.createRef()
        this.textAreaRef = React.createRef()

        this.timeout= null
        this.user = this.props.context.user
        this.isLoading = false
    
        this.openRoom = this.openRoom.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
        this.addFriend = this.addFriend.bind(this)
        this.loadMessages = this.loadMessages.bind(this)
    }

    async componentDidMount(){
        try{
            const emails = await apiHandler.getUsersEmail()
            this.setState({suggestedEmails: emails.map(email => email.email)})
            
        }
        catch(err){
            console.error(err)
        }
    }

    componentDidUpdate(prevProps, prevState){
        console.log(this.isLoading )
        if(!this.props.messengerContext.currentRoom) return 

        if(this.isLoading) return
        console.log(this.isLoading, 'ISLOADING')
       this.scrollChatRef.current.scrollTop = this.scrollChatRef.current.scrollHeight //so it scrolls down to the last message 
    }

    componentWillUnmount(){
        //this.props.messengerContext.socket.off('receive')
        this.props.messengerContext.setCurrentRoom(null)
        if(this.timeout) clearTimeout(this.timeout) 
        if(this.isLoadingTimeout) clearTimeout(this.isLoadingTimeout)
    }

    async openRoom(room){
        console.log('OPEN ROOM')
        this.isLoading = false
        try{
            await this.props.messengerContext.openRoom(room)
        }
        catch(err){
            console.error(err)
        }
    }

    async submitMessage(e){  
        e.preventDefault()

        //sending the socket
        const receiver = this.props.messengerContext.currentRoom.members.find(m => m._id !== this.user._id) //same logic as friend in Room component

        this.props.messengerContext.socket.emit('send', {
            room : this.props.messengerContext.currentRoom,
            senderId: this.user._id,
            senderImg : this.user.profileImg,
            receiverId:receiver._id,
            content: this.textAreaRef.current.value
        })

        const message = {
            room: this.props.messengerContext.currentRoom,
            sender : this.user._id,
            content: this.textAreaRef.current.value
        }

        this.props.messengerContext.setMessage(message)

        this.textAreaRef.current.value = ''

    }

    handleKeyDown = e => {
        if(e.key === 'Enter' && e.shiftKey) return this.submitMessage(e)
    }

    addFriend = async e => {
        if(e.key !== 'Enter') return 
        let newFriend = null

        try{
            console.log(this.state.newFriend)
            newFriend = await apiHandler.getUserByMail(this.state.newFriend)
            console.log(newFriend)
            if(!newFriend.length){

                this.setState({
                    addingFriendError: "This user doesn't exist",
                    newFriend: ''
                })
                
                return this.timeout = setTimeout(() => {
                    this.setState({addingFriendError : ''})
                }, 3000)

            }
         
        }
        catch(err){
            console.error(err)
        }

        try{
            const room = await apiHandler.createRoom(this.user._id, newFriend[0]._id)
            
            if(room.message){
                this.setState({
                    addingFriendError: room.message,
                    newFriend: ''
                })

                this.timeout = setTimeout(() => {
                    this.setState({addingFriendError : ''})
                }, 3000)

                 await this.props.messengerContext.openRoom(room.room[0])
                 return
            }
            else{
                this.setState({
                    newFriend: ''
                })
                this.props.messengerContext.setRooms(room)
                await this.props.messengerContext.openRoom(room)
                return
            }
        }
        catch(err){
            console.error(err)
        }
    }

    async loadMessages(){
       
        if(this.scrollChatRef.current.scrollTop > (this.scrollChatRef.current.scrollHeight * .1) || this.isLoading || this.isLoading === 'done') return

        this.isLoading = true
       // this.isLoadingTimeout = setTimeout(() => this.isLoading = false, 500)

        const scrolledFromBottom = this.scrollChatRef.current.scrollHeight - this.scrollChatRef.current.scrollTop

        try{
            const providerLoading = await this.props.messengerContext.loadMessages(() => this.isLoading = false)

            if(providerLoading === 'done') return this.isLoading = 'done'
        }
        catch(err){
            console.log(err)
        }

        
       this.scrollChatRef.current.scrollTop = this.scrollChatRef.current.scrollHeight - scrolledFromBottom + 50
    }

    render() {
        return (
            <div className="messenger">
                <span className="messenger-close" onClick={this.props.onClick}></span>
                <div className="addFriend-wrapper">
                    <div className="addFriend">
                        <Hint options={this.state.suggestedEmails} allowTabFill style={{margin: 0, padding: 0}}>
                            <input className="addFriendInput"
                                type='text'
                                placeholder='Find a friend with email'
                                onKeyDown={this.addFriend} 
                                onChange={e => this.setState({newFriend: e.target.value})} 
                                value={this.state.newFriend}
                                onFocus={e => e.target.placeholder = ''}
                                onBlur={e => e.target.placeholder = 'Find a friend with email'}
                            />
                        </Hint>

                            <span className='errorMsg'>
                                {this.state.addingFriendError}
                            </span> 
                            {/* Would be nice to have a fadeIn/fadeOut animation */}
                    </div>
                </div>
                <div className="roomsList">
                        {this.props.messengerContext.rooms.map((room, index) => {
                            return (
                                <div key={index} onClick={() => this.openRoom(room)}>
                                    <Room 
                                        room={room} 
                                        me={this.user} 
                                        connectedUsers={this.props.messengerContext.connectedUsers}
                                    />
                                </div>
                            )
                        }) }
                </div>

                {!this.props.messengerContext.currentRoom ? <div className="noRoom">Select a room to start chatting</div> : (
                <div className="chatBox">
                    {!this.props.messengerContext.messages ? '' : (
                        <div className="chatBoxMessages" ref={this.scrollChatRef} onScroll={this.loadMessages}>
                            <div className="chatBoxMessagesWrapper">
                                {this.props.messengerContext.messages.map((message, index) => {
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
                            //onChange={e => this.setState({writtingMessage: e.target.value})}
                            ref={this.textAreaRef}
                            ></textarea>
                        <Button className="ChatSendMessage" onClick={this.submitMessage}>Send</Button>
                    </div>

                </div>)}
                
            </div>
        )
    }
}

export default withMessenger(withUser(Messenger))


