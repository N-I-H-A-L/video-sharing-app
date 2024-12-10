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
          console.log(res.data);
          setVideos(res.data);
        })
        .catch((err)=>{
          console.log(err);
        });
    }

    fetchVideos();
    //Created a function then called it since, the function of useEffect can't be declared as async.
  }, [type]);

  return (
    <Container>
      {/* Render the videos by placing Card components */}
      {!videos.length &&
        <Loader>
          <Loading>Loading...</Loading>
          <Desc>Server is slow, sorry for the inconvenience.</Desc>
        </Loader>
      }
      {videos.map((video)=>{
          return <Card key={video._id} video={video}/>
        })
      }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Loader = styled.div`
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 115px);
`;

const Loading = styled.div`
  
`;

const Desc = styled.div`
  display: flex;
  width: 100%;
  margin-top: 15px;
  font-size: 14px;
  align-items: center;
`;

export default Home
