import React from 'react'
import { format } from 'timeago.js';
import { withUser } from '../../../components/Auth/withUser'
import Avatar from '../../../components/Base/Avatar/Avatar';
import './Message.css'

function Message(props) {

    const isMine = () => {
        const sender = props.message.sender._id || props.message.sender
        return sender === props.context.user._id 
    }
    
    return (
        <div className={`messageComponent ${isMine() ? 'mine' : ''}`}>
                
            <div className={`messageContentWrapper ${isMine() ? 'mine' : ''}`}>
                <Avatar size='tiny' url={isMine() ? props.context.user.profileImg : props.message.sender.profileImg} type={isMine() ? props.context.user?.type : props.message.sender?.type}/>
                <div className={`message ${isMine() ? 'mine' : ''}`}>
                    <div className={`messageContent ${isMine() ? 'mine' : ''}`}>
                        {props.message.content}
                    </div>
                    <div className="messageTimer">
                        {format(props.message.createdAt, 'round')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withUser(Message)
