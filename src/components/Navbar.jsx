import React from 'react';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../redux/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import axiosClient from '../axios';

const Navbar = () => {
  //state in this case, is the "store" and "user" is the userSlice, from which currentUser is extracted.
  const { currentUser } = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const handleLogout = () =>{
    //Remove the "persist:root", which contains the details of current user (persistor of redux) from local storage.
    localStorage.removeItem("persist:root");
    //For deleting the access_token cookie:
    axiosClient.delete("/auth/logout")
      .then()
      .catch((err)=>console.log(err));
    //Reset the state of "currentUser"
    dispatch(logout());
  }
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search here" />
          <SearchOutlinedIcon />
        </Search>
        {currentUser? 
          <User>
            <VideoCallOutlinedIcon />
            <Avatar src={currentUser.img} onClick={handleLogout}/>
            <Username>{currentUser.name}</Username>
            <CustomLogoutIcon onClick={handleLogout}/>
          </User> :
          <Link style={{textDecoration: "none"}} to="/signin">
            <Button><AccountCircleOutlinedIcon />SIGN IN</Button>
          </Link>
        }
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({theme}) => theme.bg};
  position: sticky;
  top: 0;
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 10px;
  position: relative;
`;

const Search = styled.div`
  border: 2px solid black;
  display: flex;
  align-items: center;
  height: 60%;
  border-radius: 5px;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 40%;
  font-size: 15px;
  font-family: 'Noto Sans', sans-serif;
`;

const Input = styled.input`
  border: none;
  outline: none;
  color: ${({ theme }) => theme.textSoft};
  background-color: transparent;
  width: 90%;

  &::placeholder{
    color: ${({ theme }) => theme.textSoft};
  }
`;

const Button = styled.button`
  background-color: transparent;
  padding: 7px 5px;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  font-weight: bold;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 90%;
`;

const User = styled.div`
  height: 90%;
  padding: 7px 5px;
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-color: #999;
  margin-left: 20px;
  margin-right: 10px;
`;

const Username = styled.div`
  color: ${({ theme }) => theme.text};
  margin-right: 10px;
`;

const CustomLogoutIcon = styled(LogoutIcon)`
  &:hover{
    cursor: pointer;
  }
`;

export default Navbar
