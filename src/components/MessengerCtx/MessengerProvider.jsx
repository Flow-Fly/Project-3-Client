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
            connectedUsers: []
        }

        this.setRooms = this.setRooms.bind(this)
        this.addNotifications = this.addNotifications.bind(this)
        this.deleteNotifications = this.deleteNotifications.bind(this)
    }

    async componentDidMount(){ 
        this.socket = io(process.env.REACT_APP_SOCKET_URL)

        if(!this.props.context.user) return
        

        //send my userId to socket server to inform it I just connected
        this.socket.emit('addUser', this.user._id)

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
                console.log('SET NEW ROOM', data.room)
                this.setState({rooms : [...this.state.rooms, data.room]})
            }
            console.log('create notiication')
            //add notif
            await apiHandler.addNotifications(data.room._id, this.props.context.user._id)
            this.addNotifications(data.room._id)
        })
            
        if(!this.state.connected){
            try{
                const rooms = await apiHandler.getRooms(this.props.context.user._id) 
                this.setState({
                    rooms,
                    connected: true
                })
            }
            catch(err){
                console.error(err)
            }
        }
    }

    componentWillUnmount(){
        this.socket.emit('disconnected')
    }

    setRooms(room){
        this.setState({ rooms : [...this.state.rooms, room]})
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
    
    render() {
        const messengerValues = {
            rooms : this.state.rooms,
            setRooms: this.setRooms,
            socket: this.socket,
            connectedUsers: this.state.connectedUsers,
            addNotifications :this.addNotifications,
            deleteNotifications: this.deleteNotifications
        }

        return (
            <MessengerContext.Provider value={messengerValues}>
                {this.props.children}
            </MessengerContext.Provider>
        )
    }
}

export default withUser(MessengerProvider)
