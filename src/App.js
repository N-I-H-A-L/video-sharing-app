import './App.css';
import styled, { ThemeProvider } from "styled-components";
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { darkTheme, lightTheme } from './utils/Theme';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Video from './pages/Video';
import SignIn from './pages/SignIn';

function App() {
  const [theme, setTheme] = useState("dark");
  return (
    //ThemeProvider of styled components helps to set theme easily.
    <ThemeProvider theme={theme=="dark"?darkTheme:lightTheme}>
      <Container>
      <BrowserRouter>
        <Menu getTheme={theme} setTheme={setTheme}/>
        <Main>
          <Navbar />
          <Wrapper>
            <Routes>
              <Route path="/">
                {/* Nested Routes: "index" refers to the default element for "/" route.*/}
                <Route index element={<Home />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="video"> {/* When route is: "/video" */}
                  <Route path=":id" element={<Video />} /> {/* When route is: "/video/23534ajs" */}
                </Route>
              </Route>
            </Routes>
          </Wrapper>
        </Main>
      </BrowserRouter>
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
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  
`;

export default App;
