import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import axiosClient from '../axios.js';

const Home = ({ type }) => {
  axiosClient.defaults.withCredentials = true;
  const [videos, setVideos] = useState([]);
  useEffect(()=>{
    //Fetch videos of the type, "type" given as props.
    const fetchVideos = async () => {
      await axiosClient.get(`/video/${type}`)
        .then((res)=>{
          //res.data will contain the response sent by the API.
          setVideos(res.data);
          console.log(res.data);
        })
        .catch((err)=>{
          console.log("Home comp ", err);
        });
    }

    fetchVideos();
    //Created a function then called it since, the function of useEffect can't be declared as async.
  }, [type]);

  return (
    <Container>
      {/* Render the videos by placing Card components */}
      {videos.map((video)=>{
          return <Card key={video._id} video={video}/>
        })
      }
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    //to wrap the card components
    flex-wrap: wrap;
`;

export default Home
