import React from 'react';
import styled from 'styled-components';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from '../components/Comments';

const Video = () => {
  return (
    <Container>

      <Content>
        <Wrapper>
          <iframe
            width="100%"
            height="480"
            src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <Title>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio praesentium rem ipsum porro itaque. Architecto.</Title>

          <Utilities>
            <Info>
              660,908 views • 1 day ago
            </Info>
            <Options>
              <Button>
                <ThumbUpOutlinedIcon /> 123
              </Button>
              <Button>
                <ThumbDownOffAltOutlinedIcon /> Dislike
              </Button>
              <Button>
                <ReplyOutlinedIcon /> Share
              </Button>
              <Button>
                <AddTaskOutlinedIcon /> Save
              </Button>
            </Options>
          </Utilities>

          <ChannelInfo>
            <ChannelLogo />
            <About>
              <ChannelName>Mera Channel</ChannelName>
              <SubsCount>256K Subscribers</SubsCount>
              <Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, quis ratione iste perfere rendis id sapiente.</Desc>
            </About>
            <Subscribe>Subscribe</Subscribe>
          </ChannelInfo>

          <Comments />
        </Wrapper>
      </Content>
      
      <Recommend>
        Recommndation
      </Recommend>

    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 10px;
  padding-left: 20px;
`;

const Content = styled.div`
  flex: 5;
`;

const Recommend = styled.div`
  flex: 2;
`;

const Wrapper = styled.div`

`;

const Title = styled.div`
  font-size: 16px;
  color: ${({theme}) => theme.text};
  margin-top: 10px;
`;

const Utilities = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  color: ${({theme}) => theme.textSoft};
  margin-top: 10px;
  font-size: 14px;
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;

const ChannelInfo = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;
`;

const About = styled.div`

`;

const ChannelName = styled.div`
  font-size: 15px;
`;

const SubsCount = styled.div`
  color: ${({theme}) => theme.textSoft};
  font-size: 14px;
  margin-top: 5px;
`;
const Desc = styled.div`
  margin-top: 10px;
  font-size: 15px;
`;

const ChannelLogo = styled.div`
  height: 36px;
  width: 36px;
  background-color: #999;
  margin-top: 10px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
`;

export default Video
