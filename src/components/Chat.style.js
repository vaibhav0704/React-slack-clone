import styled from 'styled-components'

const screen = {
    display: '@media (max-width: 630px)'
  } 

export const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll !important;
    height: 100vh;

    ::-webkit-scrollbar {
        display: none;
    }

    ${screen.display} {
        margin-top: 60px !important;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
    position: sticky !important;
`;
export const HeaderLeft = styled.div`

    display: flex;
    align-items: center;

    >h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }

    > .MuiSvgIcon-root {
        display: inline;
    }
`;
export const HeaderRight = styled.div`
    > p{
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    >p> .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size :16px;
    }
`;

export const ChatBottom = styled.div`
    padding-bottom: 50px
`;

export const ChatMessages = styled.div`
`;

