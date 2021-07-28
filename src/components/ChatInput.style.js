import styled from 'styled-components'

const screen = {
    display: '@media (max-width: 630px)'
}

export const ChatInputContainer = styled.div`
    border-radius: 20px;

    >form {
        position: relative;
        display: flex;
        justify-content: center;
    }

    >form>input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3pox;
        padding: 20px;
        outline: none;
    }

    >form >button {
        display: none !important;   
    }

    ${screen.display} {
        z-index: -1;
        min-width: 100vw;
    }
`;