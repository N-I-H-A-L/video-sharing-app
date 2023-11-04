import React from 'react';
import styled from 'styled-components';

const Comment = () => {
  return (
    <Container>
      <Avatar src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo"/>
      <Wrapper>
        <Info>
            <User>John Doe</User>
            <Timestamp>1 day ago</Timestamp>
        </Info>
        <Content>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati eveniet earum dignissimos! Excepturi eaque, consectetur illo eveniet non magnam maxime assumenda, quasi, provident cum eligendi.</Content>
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
