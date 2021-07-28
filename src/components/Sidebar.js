import react, { useState } from 'react';
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
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import './Sidebar.css'

const Sidebar = () => {

    const [sidebar, setSidebar] = useState(true)
    const sidebarInactive = () => {
        setSidebar(!sidebar);
        console.log(sidebar)
    }

    const [channels] = useCollection(db.collection('rooms'))
    const [user] = useAuthState(auth)

    return (
        <div className={sidebar ? 'sidebarContainer active' : 'sidebarContainer'}>
            <div className="sidebarHeader">
                <div className="sidebarInfo">
                <h2>CODE BASE </h2> 
                <h3>
                    <FiberManualRecordIcon />
                    {user?.displayName}
                </h3>
                </div>
                <CreateIcon />
            </div >
            <div>
                <SidebarOption Icon={InsertCommentIcon} title='Threads' />
                <SidebarOption Icon={InboxIcon} title='Mentions & reactions' />
                <SidebarOption Icon={DraftsIcon} title='Saved items' />
                <SidebarOption Icon={BookmarkBorderIcon} title='Channel Browser' />
                <SidebarOption Icon={PeopleAltIcon} title='People & user groups' />
                <SidebarOption Icon={AppsIcon} title='Apps' />
                <SidebarOption Icon={FileCopyIcon} title='File browser' />
                <SidebarOption Icon={ExpandLessIcon} title='Show less' />
                <hr />
                <SidebarOption Icon={ExpandMoreIcon} title='Channels' />
                <hr/>
                <SidebarOption Icon={AddIcon} addChannelOption title='Add Channel' />
                <div onClick={sidebarInactive}>
                    {channels?.docs.map(doc => (
                        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
                    ))}
                </div>
                
            </div>
            

        </div>
    )
}

export default Sidebar