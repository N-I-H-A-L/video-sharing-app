import React, { useState } from 'react';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout, updateProfilePic } from '../redux/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import axiosClient from '../axios';
import Upload from './Upload.jsx';
import Logo from "../images/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase from "../firebase.js";

const Navbar = () => {
  //state in this case, is the "store" and "user" is the userSlice, from which currentUser is extracted.
  const { currentUser } = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const handleLogout = () =>{
    //For deleting the access_token cookie:
    axiosClient.delete("/auth/logout")
      .then()
      .catch((err)=>console.log(err));
    //Reset the state of "currentUser"
    dispatch(logout());
  }

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);

  const handlePopup = () =>{
    setPopup(!popup);
  }

  const updateProfile = async (e) =>{
    const file = e.target.files[0];
    uploadFile(file);
  }

  const uploadFile = (file) =>{
    const storage = getStorage(firebase);
    //The file name will include the creation data
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await axiosClient.post('/user/profile', {
            img: downloadURL
          }).then(()=>{
            //Update currentUser.
            dispatch(updateProfilePic(downloadURL));
            setPopup(false);
          }).catch((err)=>{
            console.log(err);
          });
        });
      }
    );
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search here" value={query} onChange={(e)=>setQuery(e.target.value)}/>
            <SearchOutlinedIcon onClick={()=>navigate(`/search?q=${query}`)}/>
          </Search>
          {currentUser? 
            <User>
              <CustomVideoCallOutlinedIcon onClick={()=>setOpen(true)}/>
              <AvatarWrapper>
                <Avatar src={currentUser.img?currentUser.img:Logo} onClick={()=> {handlePopup()}}/>
                <UpdateProfile name="thumbnail" type="file" accept="image/*" style={popup?{display: "block"}:{display:"none"}} onChange={(e)=> {updateProfile(e)}}/>
              </AvatarWrapper>
              <Username>{currentUser.name}</Username>
              <CustomLogoutIcon onClick={handleLogout}/>
            </User> :
            <Link style={{textDecoration: "none"}} to="/signin">
              <Button><AccountCircleOutlinedIcon />SIGN IN</Button>
            </Link>
          }
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen}/>}
    </>
  );
}

const Container = styled.div`
  background-color: ${({theme}) => theme.bg};
  position: sticky;
  top: 0;
  height: 65px;
  z-index: 2;

  @media (max-width: 450px){
    width: 100vw;
  }
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
  color: ${({theme}) => theme.text};

  @media (max-width: 450px){
    position: relative;
    right: 15px;
  }
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

const AvatarWrapper = styled.div`
  margin-left: 20px;
  margin-right: 10px;
  position: relative;
`;

const UpdateProfile = styled.input`
  border: none;
  outline: none;
  color: ${({ theme }) => theme.textSoft};
  background-color: ${({ theme }) => theme.bgLighter};
  position: absolute;
  top: 45px;
  left: -70px;
  width: 100px;
  height: 30px;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  &::placeholder{
    color: ${({ theme }) => theme.textSoft};
  }
  &::file-selector-button{
    display: none;
  }
`;

const Avatar = styled.img`
  height: 36px;
  width: 36px;
  border-radius: 50%;

  &:hover{
    cursor: pointer;
  }
`;

const Username = styled.div`
  color: ${({ theme }) => theme.text};
  margin-right: 10px;

  @media (max-width: 1068px){
    display: none;
  }
`;

const CustomLogoutIcon = styled(LogoutIcon)`
  margin: 0;
  padding: 0;
  &:hover{
    cursor: pointer;
  }
`;

const CustomVideoCallOutlinedIcon = styled(VideoCallOutlinedIcon)`
  @media (max-width: 1068px){
    display: none !important;
  }
`;

export default Navbar
