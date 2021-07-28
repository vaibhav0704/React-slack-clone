import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../firebase'
import { LoginContainer, LoginInnerContainer } from './Login.style'

const Login = () => {

    const signIn = e => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch((err) => alert(err.message));
    }

    return (
        <LoginContainer>
            <LoginInnerContainer>
                <img src='https://image.flaticon.com/icons/png/512/2111/2111615.png' />
                <h1>Sign in to Code Base</h1>
                <p>codebase.slack.com</p>

                <Button onClick={signIn}>
                    Sign in with Google    
                </Button>  
            </LoginInnerContainer>          
        </LoginContainer>
    )
}

export default Login
