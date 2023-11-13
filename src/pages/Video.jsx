import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from '../components/Comments';
import Card from '../components/Card';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../axios';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import { format } from 'timeago.js';
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { handleSubscription } from '../redux/userSlice';


const Video = () => {
  const { currentUser } = useSelector((state)=>state.user);
  const { currentVideo } = useSelector((state)=> state.video);
  const dispatch = useDispatch();

  //Get the video ID from URL.
  const videoId = useLocation().pathname.split('/')[2];

  const [channel, setChannel] = useState({});

  const handleLike = async () =>{
    //API Route for adding the current user to the 'likes' array of current video.
    await axiosClient.put(`/user/like/${currentVideo._id}`);
    //To change the state using redux and render the component again.
    dispatch(like(currentUser._id));
  }
  
  const handleDislike = async () =>{
    await axiosClient.put(`/user/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  }

  const handleSubscribe = async () =>{
    if(currentUser.subscribedUsers?.includes(channel._id)){
      //Subscribe
      await axiosClient.put(`/user/unsub/${channel._id}`);
    }
    else{
      //Unsubscribe
      await axiosClient.put(`/user/sub/${channel._id}`);
    }
    dispatch(handleSubscription(channel._id));
  }

  useEffect(()=>{
    const fetchData = async () =>{
      //Get the video
      await axiosClient.get(`/video/find/${videoId}`)
        .then(async(res)=>{
          dispatch(fetchSuccess(res.data));
          //Get the channel to which the video belongs to
          await axiosClient.get(`/user/find/${res.data.userId}`)
            .then((user)=>{
              setChannel(user.data);
            })
            .catch((err)=> console.log(err));
        })
        .catch((err)=> console.log(err));
    }
    fetchData();
  }, [videoId, dispatch]);

  return (
    <Container>

      <Content>
        <Wrapper>

          <VideoWrapper>
            <VideoFrame src={currentVideo.videoUrl} controls />
          </VideoWrapper>

          <Title>{currentVideo.title}</Title>

          <Utilities>
            <Info>
              {currentVideo.views} views • {format(currentVideo.createdAt)}
            </Info>
            <Options>
              <Button>
                {/* If currentVideo is liked by the current user then show the filled thumbs up icon else the outlined one. */}
                {currentVideo.likes?.includes(currentUser._id)? <ThumbUpIcon /> : <ThumbUpOutlinedIcon onClick={handleLike} />} {currentVideo.likes?.length}
              </Button>
              <Button>
                {currentVideo.dislikes?.includes(currentUser._id)? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon onClick={handleDislike} />} Dislike
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
            <ChannelLogo src={channel.img}/>
            <About>
              <ChannelName>{channel.name}</ChannelName>
              <SubsCount>{channel.subscribers} subscribers</SubsCount>
              <Desc>{currentVideo.desc}</Desc>
            </About>
            <Subscribe onClick={handleSubscribe}>{currentUser.subscribedUsers.includes(channel._id) ? "Subscribed" : "Subscribe"}</Subscribe>
          </ChannelInfo>

          <Comments videoId={currentVideo._id}/>
        </Wrapper>
      </Content>
      
      {/* <Recommend>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
      </Recommend> */}

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

const VideoWrapper = styled.div``;

const VideoFrame = styled.video`
  height: 600px;
  width: 100%;
  object-fit: cover;
  margin: 0 !important;
  padding: 0 !important;
  display: block;
  margin: 0 auto;
  box-sizing: border-box;
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
  margin-top: 20px;
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

const ChannelLogo = styled.img`
  height: 36px;
  width: 36px;
  margin-top: 10px;
  border-radius: 50%;
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
