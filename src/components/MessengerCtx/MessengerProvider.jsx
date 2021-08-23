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
            connected: false,
            connectedUsers: []
        }

        this.setRooms = this.setRooms.bind(this)
    }

    async componentDidMount(){ 
        this.socket = io(process.env.REACT_APP_SOCKET_URL)
               
        if(!this.props.context.user) return

        if(!this.state.connected){
            
            
            //send my userId to socket server to inform it I just connected
            this.props.messengerContext.socket.emit('addUser', this.user._id)

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

    async componentDidUpdate(prevProps, prevState){
        
        if(prevProps === this.props) return 

        if(!this.props.context.user){
            this.socket.emit('disconnected')
            this.setState({connected: false})
            return
        }

        this.socket = io(process.env.REACT_APP_SOCKET_URL)
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

            //add notif
            await apiHandler.addNotifications(data.room._id, this.props.context.user._id)
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

    setRooms(room){
        this.setState({ rooms : [...this.state.rooms, room]})
    }
    
    render() {
        const messengerValues = {
            rooms : this.state.rooms,
            setRooms: this.setRooms,
            socket: this.socket,
            connectedUsers: this.state.connectedUsers,
            connected: this.connected,
        }

        return (
            <MessengerContext.Provider value={messengerValues}>
                {this.props.children}
            </MessengerContext.Provider>
        )
    }
}

export default withUser(MessengerProvider)
