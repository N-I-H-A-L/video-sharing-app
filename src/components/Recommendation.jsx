import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axiosClient from '../axios';
import Card from './Card';

const Recommendation = ({ tags }) => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axiosClient.get(`/video/tags?tags=${tags}`);
            setVideos(res.data);
        };
        fetchVideos();
    }, [tags]);

  return (
    <Container>
      {videos.map((video)=>{
        return <Card video={video} type={"sm"} key={video._id}/>
      })}
    </Container>
  )
}

const Container = styled.div`
    flex: 2;
`;

export default Recommendation
