import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import axiosClient from "./../axios.js";
import { useSelector } from "react-redux";

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state)=> state.user);
  const [comments, setComments] = useState([]);

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const res = await axiosClient.get(`/comment/${videoId}`);
        setComments(res.data);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchData();
  }, [videoId]);

  return (
    <Container>
      {currentUser 
        ? <NewComment>
            <Avatar src={currentUser.img} />
            <Input placeholder="Add a comment..." />
          </NewComment>   
        : <AddComment>
            <Div>Login to add comment.</Div>
          </AddComment>} 
      {comments.map((comment)=>{
        return <Comment comment={comment} key={comment._id}/>
      })}
    </Container>
  )
}

const Container = styled.div`
    color: ${({ theme }) => theme.text};
    margin-bottom: 10px;
`;

const NewComment = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  gap: 18px;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  height: 36px;
  width: 36px;
  border-radius: 50%;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  padding: 4px;
  width: 100%;
  font-family: 'Noto Sans', sans-serif;
  color: ${({ theme }) => theme.text};
  `;

const AddComment = styled.div`
  margin-bottom: 20px;
  `;
const Div = styled.div`
  color: ${({ theme }) => theme.textSoft};
`;

export default Comments
