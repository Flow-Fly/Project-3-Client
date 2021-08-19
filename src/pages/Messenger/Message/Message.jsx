import React from 'react'
import { format } from 'timeago.js';
import { withUser } from '../../../components/Auth/withUser'

function Message(props) {

    const isMine = () => {
        return props.message.sender === props.context.user._id ? 'message mine' : 'message'
    }

    return (
        <div className={isMine()}>
            {props.message.content}
            {format(props.message.createdAt)}
        </div>
    )
}

export default withUser(Message)
