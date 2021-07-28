import styled from 'styled-components'

const screen = {
  display: '@media (max-width: 630px)'
}

export const AppBody = styled.div`
  display: flex;
`;

export const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%; 
`;

export const AppLoadingContent = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  >img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;