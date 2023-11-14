import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from '../components/Comments';
import Card from '../components/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../axios';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import { format } from 'timeago.js';
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { handleSubscription } from '../redux/userSlice';
import Recommendation from '../components/Recommendation';
import Logo from "../images/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg"


const Video = () => {
  const { currentUser } = useSelector((state)=>state.user);
  const { currentVideo } = useSelector((state)=> state.video);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get the video ID from URL.
  const videoId = useLocation().pathname.split('/')[2];

  const [channel, setChannel] = useState({});

  const handleLike = async () =>{
    if(currentUser){
      //API Route for adding the current user to the 'likes' array of current video.
      await axiosClient.put(`/user/like/${currentVideo._id}`);
      //To change the state using redux and render the component again.
      dispatch(like(currentUser._id));
    }
    else{
      navigate('/signin');
    }
  }
  
  const handleDislike = async () =>{
    if(currentUser){
      await axiosClient.put(`/user/dislike/${currentVideo._id}`);
      dispatch(dislike(currentUser._id));
    }
    else{
      navigate('/signin');
    }
  }
  
  const handleSubscribe = async () =>{
    if(!currentUser){
      navigate('/signin');
    }
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
      
      //Update the views of the video if currentUser is logged in.
      if(currentUser!==null){
        console.log("here", currentUser);
        await axiosClient.put(`/video/view/${videoId}`);
      }
    }
    fetchData();
  }, [videoId, dispatch]);

  return (
    <Container>

      <Content>
        <Wrapper>

          <VideoWrapper>
            <VideoFrame src={currentVideo?.videoUrl} controls />
          </VideoWrapper>

          <Title>{currentVideo?.title}</Title>

          <Utilities>
            <Info>
              {currentVideo.views?.length} views • {format(currentVideo?.createdAt)}
            </Info>
            <Options>
              <Button>
                {/* If currentVideo is liked by the current user then show the filled thumbs up icon else the outlined one. */}
                {currentVideo?.likes?.includes(currentUser?._id)? <ThumbUpIcon /> : <ThumbUpOutlinedIcon onClick={handleLike} />} {currentVideo.likes?.length}
              </Button>
              <Button>
                {currentVideo?.dislikes?.includes(currentUser?._id)? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon onClick={handleDislike} />} Dislike
              </Button>
              <Button>
                <ReplyOutlinedIcon /> Share
              </Button>
              <Button>
                <AddTaskOutlinedIcon /> Save
              </Button>
            </Options>
          </Utilities>
          <Hr />

          <ChannelInfo>
            <ChannelLogo src={channel.img?channel.img:Logo}/>
            <About>
              <ChannelName>{channel.name}</ChannelName>
              <SubsCount>{channel.subscribers} subscribers</SubsCount>
              <Desc>{currentVideo.desc}</Desc>
            </About>
            <Subscribe onClick={handleSubscribe}>{currentUser?.subscribedUsers.includes(channel._id) ? "Subscribed" : "Subscribe"}</Subscribe>
          </ChannelInfo>
          <Hr />

          <Comments videoId={currentVideo._id}/>
        </Wrapper>
      </Content>
      
      <Recommendation tags={currentVideo.tags}/>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 24px;
  padding-left: 20px;
  height: calc(100vh - 65px);

  @media (max-width: 1200px){
    padding: 15px;
  }

  @media (max-width: 450px){
    padding: 15px;
  }
  `;

const Content = styled.div`
  flex: 5;
  `;

const Wrapper = styled.div`
  
`;

const VideoWrapper = styled.div``;

const VideoFrame = styled.video`
  height: 480px;
  width: 100%;
  object-fit: cover;
  margin: 0 !important;
  padding: 0 !important;
  display: block;
  margin: 0 auto;
  box-sizing: border-box;
  
  @media (max-width: 768px){
    height: 320px;
  }
  
  @media (max-width: 450px){
    height: 180px;
  }
`;

const Title = styled.div`
  font-size: 16px;
  color: ${({theme}) => theme.text};
  margin-top: 10px;
`;

const Utilities = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 640px){
    flex-direction: column;
    gap: 15px;
  }
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

  @media (max-width: 450px){
    font-size: 14px;
  }
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
  font-weight: bold;
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

const Hr = styled.hr`
  margin: 15px 5px;
  border: 0.5px solid ${({ theme }) => theme.soft};
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
