import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';

const Comments = () => {
  return (
    <Container>
      <NewComment>
        <Avatar src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
        <Input placeholder="Add a comment..." />
      </NewComment>    
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
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

export default Comments
