import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import axiosClient from '../axios.js';

const Home = () => {
  const [videos, setVideos] = useState([]);
  useEffect(()=>{
    const fetchVideos = async ()=>{
      await axiosClient.get("/video/random")
        .then((res)=>{
          //res.data will contain the information sent by the API (i.e., the videos).
          console.log(res.data);
          setVideos(res.data);
        })
        .catch((err)=>{
          console.log(err);
        });
    }

    fetchVideos();
    //Created a function then called it since, the function of useEffect can't be declared as async.
  }, []);

  return (
    <Container>
      {videos.map(()=>{
        return <Card/>
      })}
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    //to wrap the card components
    flex-wrap: wrap;
`;

export default Home
