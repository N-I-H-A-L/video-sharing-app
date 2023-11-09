import React from 'react';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const Navbar = () => {
  //state in this case, is the "store" and "user" is the userSlice, from which currentUser is extracted.
  const { currentUser } = useSelector(state=>state.user);
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
            <Avatar />
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

export default Navbar
