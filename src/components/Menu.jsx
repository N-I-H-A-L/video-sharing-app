import React from 'react';
import styled from "styled-components";
import LogoImg from "../images/youtube-logo-png-2074.png";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";

const Menu = ({ getTheme, setTheme }) => {
  const toggleTheme = () =>{
    if(getTheme=="dark") setTheme("light");
    else setTheme("dark");
  }
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{textDecoration: "none", color:"inherit"}}>
          <Logo>
            <Img src={LogoImg} alt="logo"/>
            <Name>MeTube</Name>
          </Logo>
        </Link>

        <Item>
          <HomeIcon />
          Home
        </Item>
        <Item>
          <ExploreOutlinedIcon />
          Explore
        </Item>
        <Item>
          <SubscriptionsOutlinedIcon />
          Subscriptions
        </Item>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />

        <Login>
          Sign in to like videos, comment, and subscribe.
          <Link style={{textDecoration: "none"}} to="/signin">
            <LoginBtn>
              <AccountCircleOutlinedIcon /> <SignIn>SIGN IN</SignIn>
            </LoginBtn>
          </Link>
        </Login>
        <Hr />

        <Hr />
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>

        <Item>
          <SettingsBrightnessOutlinedIcon />
          <ToggleBtn onClick={toggleTheme}>{(getTheme=="dark")?<span>Light Mode</span>:<span>Dark Mode</span>}</ToggleBtn>
        </Item>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: ${({theme}) => theme.bgLighter}; //using ThemeProvider
  color: ${({theme}) => theme.text};
  height: 100vh;
  font-size: 14px;
  padding: 0px 20px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`

`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  height: 60px;
`;

const Name = styled.span`
  position: relative;
  left: -12%;
  font-weight: bold;
  font-size: 16px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 3px;

  &:hover{
    cursor: pointer;
    background-color: ${({theme}) => theme.soft};
  }
`;

const Hr = styled.hr`
  border: 0.5px;
  margin: 8px 0px;
`;

const Login = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginBtn = styled.button`
  background-color: transparent;
  padding: 7px 5px;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  font-weight: bold;
  border-radius: 3px;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 60%;
`;

const SignIn = styled.span`
  position: relative;
  left: 5%;
`;

const ToggleBtn = styled.div`
  
`;

export default Menu
