import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

const Home = () => {
  return (
    <Container>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    //to wrap the card components
    flex-wrap: wrap;
`;

export default Home
