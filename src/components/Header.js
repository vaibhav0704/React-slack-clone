import React from 'react'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import SearchIcon from '@material-ui/icons/Search'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import {
    HeaderContainer,
    HeaderLeft,
    HeaderAvatar,
    HeaderSearch,
    HeaderRight
} from './Header.style'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

const Header = () => {

    const [user] = useAuthState(auth)

    return (
        <HeaderContainer>
            <HeaderLeft>
                    
                <HeaderAvatar 
                    onClick={() => auth.signOut()}
                    alt={user?.displayName}
                    src={user?.photoURL}
                />
                <AccessTimeIcon />
            </HeaderLeft>

            <HeaderSearch>
                <SearchIcon />
                <input placeholder='Search CodeGame' />
            </HeaderSearch>

            <HeaderRight>
                <HelpOutlineIcon />
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header