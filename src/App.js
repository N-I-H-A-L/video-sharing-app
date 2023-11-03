import './App.css';
import styled, { ThemeProvider } from "styled-components";
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { darkTheme, lightTheme } from './utils/Theme';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState("dark");
  return (
    //ThemeProvider of styled components helps to set theme easily.
    <ThemeProvider theme={theme=="dark"?darkTheme:lightTheme}>
      <Container>
        <Menu getTheme={theme} setTheme={setTheme}/>
        <Main>
          <Navbar />
          <Wrapper>

          </Wrapper>
        </Main>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Main = styled.div`
  flex: 7;
  background-color: #181818;
`;

const Wrapper = styled.div`

`;

export default App;
