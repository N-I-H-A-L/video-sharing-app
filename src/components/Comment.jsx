import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from "timeago.js";
import axiosClient from '../axios';
import Logo from "../images/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg"

const Comment = ({ comment }) => {
  const [user, setUser] = useState({});

  useEffect(()=>{
    const fetchData = async () =>{
      const res = await axiosClient.get(`/user/find/${comment.userId}`);
      setUser(res.data);
    }
    fetchData();
  }, [comment.userId, comment._id]);

  return (
    <Container>
      <Avatar src={user.img?user.img:Logo}/>
      <Wrapper>
        <Info>
            <User>{user.name}</User>
            <Timestamp>{format(comment.createdAt)}</Timestamp>
        </Info>
        <Content>{comment.desc}</Content>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    margin-bottom: 20px;
    gap: 15px;
`;

const Avatar = styled.img`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  margin-top: 6px;
`;

const Wrapper = styled.div`
    
`;

const Info = styled.div`
    display: flex;
    flex-direction: row;    
    margin-bottom: 10px;
    font-size: 14px;
    gap: 10px;
`;

const User = styled.div`
    color: ${({ theme }) => theme.text};
    font-size: 14px;
    font-weight: bold;
`;

const Timestamp = styled.div`
    color: ${({ theme }) => theme.textSoft};
`;

const Content = styled.div`
    margin-top: -8px;
    font-size: 14px;
`;

export default Comment
