import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = () => {
  return (
    //The whole card will be a link to the video
    <Link to="/video/test_id" style={{textDecoration: "none"}}>
      <Container>
          <Image src="https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault.webp?v=6277c159&sqp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA" />
          <Details>
            <ChannelLogo />
            <VidDesc>
              <VidName>This is the name of my first video on MeTube hope you iwll kiek it</VidName>
              <ChannelName>Mera Channel</ChannelName>
              <Info>
                660,908 views • 1 day ago
              </Info>
            </VidDesc>
          </Details>
      </Container>
    </Link>
  )
}

const Container = styled.div`
  width: 360px;
  margin: 10px;
  margin-bottom: 45px;
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};

    &:hover{
      cursor: pointer;
    }
`;

const Image = styled.img`
  width: 100%;
  height: 202px;
  background-color: #999;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 15px;
  padding-left: 10px;
`;

const ChannelLogo = styled.img`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-color: #999;
`;

const ChannelName = styled.div`
  margin-top: 5px;
  font-size: 12px;
`;

const VidDesc = styled.div`

`;

const VidName = styled.div`

`;

const Info = styled.div`
  display: flex;
  margin-top: 5px;
`;

export default Card
