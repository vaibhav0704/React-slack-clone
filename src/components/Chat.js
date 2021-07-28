import React, { useState, useEffect, useRef } from 'react'
import { ChatBottom, ChatContainer, ChatMessages, Header, HeaderLeft, HeaderRight } from './Chat.style'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { InfoOutlined } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import ChatInput from './ChatInput'
import Message from './Message'
import { selectRoomId } from '../features/appSlice'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { IconButton } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import CreateIcon from '@material-ui/icons/Create'
import SidebarOption from './SidebarOption';
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import AppsIcon from '@material-ui/icons/Apps'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import './Sidebar.css'

const useStyles = makeStyles({
    list: {
        width: 250,
    },
})

const Chat = () => {

    const [channels] = useCollection(db.collection('rooms'))
    const [user] = useAuthState(auth)
    const classes = useStyles();
    const [open, setOpen] = useState(true)
    const chatRef = useRef(null)
    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    )

    const [roomMessages, loading] = useCollection(
        roomId && 
        db
            .collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
    )

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [roomId, loading])

    return (
        <>
            <SwipeableDrawer
                anchor='left'
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => {}}
            >
                <div className={classes.list}>
                    <div className='sidebarContainer'>
                        <div className="sidebarHeader">
                            <div className="sidebarInfo">
                            <h2>CODE BASE </h2> 
                            <h3>
                                <FiberManualRecordIcon />
                                {user?.displayName}
                            </h3>
                            </div>
                            <CreateIcon />
                        </div>
                        <div>
                            <SidebarOption Icon={InsertCommentIcon} title='Threads' />
                            <SidebarOption Icon={InboxIcon} title='Mentions & reactions' />
                            <SidebarOption Icon={DraftsIcon} title='Saved items' />
                            <SidebarOption Icon={BookmarkBorderIcon} title='Channel Browser' />
                            <SidebarOption Icon={PeopleAltIcon} title='People & user groups' />
                            <SidebarOption Icon={AppsIcon} title='Apps' />
                            <SidebarOption Icon={FileCopyIcon} title='File browser' />
                            <SidebarOption Icon={ExpandLessIcon} title='Show less' />
                            <hr/>
                            <SidebarOption Icon={ExpandMoreIcon} title='Channels' />
                            <hr/>
                            <SidebarOption Icon={AddIcon} addChannelOption title='Add Channel' />
                            <div onClick={() => setOpen(false)}>
                                {channels?.docs.map(doc => (
                                    <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
                                ))}
                            </div>                    
                        </div>
                    </div>
                </div>
                
            </SwipeableDrawer>
            
            <ChatContainer>
                {roomDetails && roomMessages && (
                    <>
                        <Header>
                            <HeaderLeft>
                                <IconButton onClick={() => setOpen(true)}>
                                    <MenuOpenIcon />
                                </IconButton>
                                
                                <h4><strong>#{roomDetails?.data().name}</strong></h4>
                                
                            </HeaderLeft>
                            <HeaderRight>
                                <p>
                                    <InfoOutlined /> Details 
                                </p>
                            </HeaderRight>
                        </Header>

                        <ChatMessages>
                            {roomMessages?.docs.map(doc => {
                                const { message, timestamp, user, userImage} = doc.data();

                                return (
                                    <Message  
                                        key={doc.id}
                                        message={message}
                                        timestamp={timestamp}
                                        user={user}
                                        userImage={userImage}
                                    />
                                )
                            })}
                            <ChatBottom ref={chatRef} />
                        </ChatMessages>

                        <ChatInput 
                            chatRef={chatRef}
                            channelName = {roomDetails?.data().name}
                            channelId={roomId}
                        />
                    </>
                )}
                
            </ChatContainer>
        </>
    )
}

export default Chat
