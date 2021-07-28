import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { ChatInputContainer } from './ChatInput.style'
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const ChatInput = ({channelName, channelId, chatRef}) => {

    const [user] = useAuthState(auth)
    const [input, setInput] = useState('')

    const sendMessage = (e) => {
        e.preventDefault();

        console.log(channelId)

        if(!channelId) {
            return false;
        }

        try{
            db.collection('rooms').doc(channelId).collection('messages').add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                userImage: user.photoURL
            })
        }catch(err) {
            console.log(err);
        }

        chatRef.current.scrollIntoView({
            behavior: 'smooth'
        })

        setInput('');
    }

    return (
        <ChatInputContainer>
            <form>
                <input 
                    value={input} 
                    placeholder={`Message #${channelName}`} 
                    onChange = {e => setInput(e.target.value)}
                />
                <Button hidden type='submit' onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput
