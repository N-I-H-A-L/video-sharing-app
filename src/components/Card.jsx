import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format } from "timeago.js";
import axiosClient from '../axios.js';

const Card = ({ type, video }) => {
  axiosClient.defaults.withCredentials = true;
  const [channel, setChannel] = useState({});
  useEffect(()=>{
    const fetchChannel = async () =>{
      //Fetch the user to which the video belongs to.
      await axiosClient.get(`/user/find/${video.userId}`)
        .then((res)=>{
          //It will return the user object.
          setChannel(res.data);
        })
        .catch((err)=>{
          console.log("card comp ", err);
        });
    }
    fetchChannel();
  }, [video.userId]);

  return (
    //The whole card will be a link to the video
    <Link to="/video/test_id" style={{textDecoration: "none"}}>
      {/* Sending props to elements using Styled Components */}
      <Container type={type}>
          <Image type={type} src={video.imgUrl} />
          <Details type={type}>
            <ChannelLogo type={type} src={channel.img?channel.img:"abcd"}/>
            <VidDesc>
              <VidName>{video.title}</VidName>
              <ChannelName>{channel.name}</ChannelName>
              <Info type={type}>
                {video.views} views • {format(video.createdAt)}
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
  margin-bottom: ${(props)=>props.type==="sm"?"10px":"45px"};
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  display: ${(props)=>props.type==="sm" && "flex"};

    &:hover{
      cursor: pointer;
    }
`;

const Image = styled.img`
  width: 100%;
  height: ${(props)=>props.type==="sm"?"100px":"202px"};;
  background-color: #999;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${(props)=>props.type==="sm"?"0px":"10px"};
  gap: 15px;
  padding-left: 10px;
`;

const ChannelLogo = styled.img`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props)=>props.type==="sm" && "none"};
`;

const ChannelName = styled.div`
  margin-top: 5px;
  font-size: 12px;
  font-weight: bold;
`;

const VidDesc = styled.div`

`;

const VidName = styled.div`

`;

const Info = styled.div`
  display: flex;
  margin-top: 5px;
  color: ${({ theme }) => theme.textSoft};
  font-size: ${(props)=>props.type==="sm" && "13px"};
`;

export default Card
