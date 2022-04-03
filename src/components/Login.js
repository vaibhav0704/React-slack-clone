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
                <img src='https://thumbs.bfldr.com/at/pl546j-7le8zk-btwjnu?expiry=1649610163&fit=bounds&height=800&sig=NDJhNjhhY2FlMzRkMjg4MzczYjQ1NDI2MTMwOWY0ODZjOWQyYzYzMg%3D%3D&width=1100' />
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
