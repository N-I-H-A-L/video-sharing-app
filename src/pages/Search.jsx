import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosClient from '../axios';
import { useLocation } from 'react-router-dom';
import Card from "../components/Card.jsx";

const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    useEffect(()=>{
        const fetchVideos = async () =>{
            const res = await axiosClient.get(`/video/search${query}`);
            setVideos(res.data);
        }
        fetchVideos();
    }, [query]);

  return (
    <Container>
      {videos.map((video)=>{
        return <Card key={video._id} video={video}/>
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: calc(100vh - 65px);
`;

export default Search
