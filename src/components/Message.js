import React from 'react'
import { MessageContainer, MessageInfo } from './Message.style'

const Message = ({ message, timestamp, user, userImage }) => {
    return (
        <MessageContainer>
            <img src={userImage} alt='' />
            <MessageInfo>
                <h4>
                    {user}{' '}
                    <span>{new Date(timestamp?.toDate()).toString()}</span>
                </h4>
                <p>{message}</p>
            </MessageInfo>
        </MessageContainer>
    )
}

export default Message
