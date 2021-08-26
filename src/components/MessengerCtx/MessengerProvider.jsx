import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { MessengerContext } from "./MessengerContext";
import { withUser } from "../Auth/withUser";
import { io } from 'socket.io-client'

class MessengerProvider extends Component {
    constructor(props){
        super(props)

        this.state = {
            rooms: [],
            connectedUsers: [],
            messages: [],
            currentRoom: null
        }

        this.setRooms = this.setRooms.bind(this)
        this.addNotifications = this.addNotifications.bind(this)
        this.deleteNotifications = this.deleteNotifications.bind(this)
        this.setCurrentRoom = this.setCurrentRoom.bind(this)
        this.openRoom = this.openRoom.bind(this)
        this.setMessage = this.setMessage.bind(this)
        this.loadMessages = this.loadMessages.bind(this)
    }

    async componentDidMount(){ 
        
        if(!this.props.context.user) return
        this.socket = io(process.env.REACT_APP_SOCKET_URL)
        console.log('----SOCKET CONNECTED----')

        //send my userId to socket server to inform it I just connected
        this.socket.emit('addUser', this.props.context.user._id)

        try{
            const rooms = await apiHandler.getRooms(this.props.context.user._id) 
            this.setState({
                rooms,
            })
        }
        catch(err){
            console.error(err)
        }
    }

    async componentDidUpdate(prevProps, prevState){
        
        if(prevProps === this.props) return 

        if(!this.props.context.user){
            return
        }

        if(!this.socket){
            this.socket = io(process.env.REACT_APP_SOCKET_URL)
            console.log('----SOCKET CONNECTED----')
        }

        //retrive all the rooms I have
        try{
            const rooms = await apiHandler.getRooms(this.props.context.user._id) 
            this.setState({
                rooms
            })
        }
        catch(err){
            console.error(err)
        }
        
        //send my userId to socket server to inform it I just connected / reconnected
        this.socket.emit('addUser', this.props.context.user._id)

        //retreive the array of all the connected users
        this.socket.on('getUsers', users => {
            this.setState({connectedUsers: users})
        })

        this.socket.on('receive', async data => {
            //if someone new send you a message, add a new room to your rooms
            if(!this.state.rooms.find(r => r._id === data.room._id)){
                this.setState({rooms : [...this.state.rooms, data.room]})
            }

            if(this.state.currentRoom && this.state.currentRoom?.members.find(m => m._id === data.senderId)){
                
                const receivedMessage = 
                    {
                        sender : {
                            _id: data.senderId,
                            profileImg: data.senderImg},
                        content : data.content,
                        createdAt: Date.now()
                    }
                this.setState({
                    messages: [...this.state.messages, receivedMessage],
                })
            }
            else{
                //add notif
                try{
                    await apiHandler.addNotifications(data.room._id, this.props.context.user._id)
                    this.addNotifications(data.room._id)
                }
                catch(err){
                    console.error(err)
                }
            }
        })
    }

    componentWillUnmount(){
        console.log('-----SOCKET DISCONNECTED-----')
        this.socket.emit('disconnected')
    }

    setRooms(room){
        this.setState({ rooms : [...this.state.rooms, room]})
    }

    setCurrentRoom(room){
        this.setState({currentUser: room})
    }

    addNotifications(roomId){
        const rooms = this.state.rooms
        const newRooms = rooms.map(room => {
            if(room._id !== roomId ) return room

            const thisRoom = room 
            thisRoom.notifications = [...thisRoom.notifications, this.props.context.user._id]
            return thisRoom
        })
        this.setState({rooms: newRooms})
    }

    deleteNotifications(roomId){
        const rooms = this.state.rooms
        const newRooms = rooms.map(room => {
            if(room._id !== roomId ) return room

            const thisRoom = room 
            const filteredNotifications = thisRoom.notifications.filter(r => r !== this.props.context.user._id)

            thisRoom.notifications = filteredNotifications

            return thisRoom
        })

        this.setState({rooms: newRooms})
    }

    async openRoom(room){
        try{
            //getMessages(roomId, firstMessageIndex, depth)
            const messages = await apiHandler.getMessages(room._id, 0, 30)
    
            await apiHandler.deleteNotifications(room._id, this.props.context.user._id)
            this.deleteNotifications(room._id)

            this.setState({
                currentRoom: room,
                messages: messages
            })
        }
        catch(err){
            console.error(err)
        }
    }

    async setMessage(message){
        try{
            const newMessage = await apiHandler.submitMessage(message)
            
            this.setState({
                messages: [...this.state.messages, newMessage],
            }) 
        }
        catch(err){
            console.error(err)
        }
    }

    async loadMessages(callback){
        const olderMessages = await apiHandler.getMessages(this.state.currentRoom._id, this.state.messages.length - 1, 30)
 
        if(!olderMessages.length) return 'done'
        
        this.setState({
            messages: [...olderMessages, ...this.state.messages]
        }, () => callback()) 
    }
    
    render() {
        const messengerValues = {
            rooms : this.state.rooms,
            setRooms: this.setRooms,
            socket: this.socket,
            connectedUsers: this.state.connectedUsers,
            addNotifications :this.addNotifications,
            deleteNotifications: this.deleteNotifications,
            currentRoom: this.state.currentRoom,
            setCurrentRoom: this.setCurrentRoom,
            openRoom: this.openRoom,
            messages: this.state.messages,
            setMessage: this.setMessage,
            loadMessages: this.loadMessages
        }

        return (
            <MessengerContext.Provider value={messengerValues}>
                {this.props.children}
            </MessengerContext.Provider>
        )
    }
}

export default withUser(MessengerProvider)
