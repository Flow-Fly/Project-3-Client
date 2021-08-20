import React from 'react'
import { format } from 'timeago.js';
import { withUser } from '../../../components/Auth/withUser'
import Avatar from '../../../components/Base/Avatar/Avatar';
import './Message.css'

function Message(props) {

    const isMine = () => {
        const sender = props.message.sender._id || props.message.sender
        return sender === props.context.user._id ? 'mine' : ''
    }
    

    return (
        <div className={`messageComponent ${isMine()}`}>
            
            <div className={`messageContentWrapper ${isMine()}`}>
                <Avatar size='tiny' url={props.message.sender.profileImg || props.context.user.profileImg}/>
                <div className={`message ${isMine()}`}>
                    <div className={`messageContent ${isMine()}`}>
                        {props.message.content}
                    </div>
                    <div className="messageTimer">
                        {format(props.message.createdAt)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withUser(Message)
