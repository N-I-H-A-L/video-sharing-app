import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import axiosClient from "./../axios.js";
import { useSelector } from "react-redux";
import Logo from "../images/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg"

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state)=> state.user);
  const { currentVideo } = useSelector((state)=> state.video);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchData = async () =>{
    try{
      const res = await axiosClient.get(`/comment/${videoId}`);
      setComments(res.data);
    }
    catch(err){
      console.log(err);
    }
  }

  const handleKeyPress = async (e) =>{
    if(e.key === 'Enter'){
      await axiosClient.post('/comment/', {
        videoId: currentVideo._id,
        desc: comment
      }).then(()=>{
        setComment("");
        fetchData();
      }).catch((err)=>{
        console.log(err);
      });
    }
  }

  useEffect(()=>{
    fetchData();
  }, [videoId]);

  return (
    <Container>
      {currentUser 
        ? <NewComment>
            <Avatar src={currentUser.img?currentUser.img:Logo} />
            <Input value={comment} onChange={(e)=> setComment(e.target.value)} onKeyDown={(e)=> handleKeyPress(e)} placeholder="Add a comment..." />
          </NewComment>   
        : <AddComment>
            <Div>Login to comment.</Div>
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
  font-size: 14px;
`;

export default Comments
