import React, { useState } from 'react';
import styled from 'styled-components';
import axiosClient from "../axios.js";
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice.js';

const SignIn = () => {
  axiosClient.defaults.withCredentials = true;
  const [name, setName] = useState();
  const [pass, setPass] = useState();
  const [email, setEmail] = useState();
  const dispatch = useDispatch();

  const handleLogin = async (e) =>{
    e.preventDefault();
    dispatch(loginStart());
    await axiosClient.post("/auth/signin", {name, password: pass})
        .then((res)=>{
          dispatch(loginSuccess(res.data));
        })
        .catch(()=>{
          dispatch(loginFailure());
        });
  }

  return (
    <Container>
      <Wrapper>
        <Sign>Sign In</Sign>  
        <Continue>to continue to MeTube</Continue>
        <InputNameIn placeholder="username" value={name} onChange={(e)=>setName(e.target.value)}/>
        <InputPassIn placeholder="password" type="password" value={pass} onChange={(e)=>setPass(e.target.value)}/>
        <SignInBtn onClick={handleLogin}>Sign In</SignInBtn>
        <Span>or</Span>
        <InputNameUp placeholder="username"/>
        <InputEmailUp placeholder="email"/>
        <InputPassUp placeholder="password"/>
        <SignUpBtn>Sign Up</SignUpBtn>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: calc(100vh - 56px);
  align-items: center;
  justify-content: center;
`;

const Sign = styled.div`
  font-weight: bold;
  font-size: 18px;
  position: relative;
  top: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 15px 40px;
  gap: 13px;
  border-radius: 5px;
`;

const Continue = styled.div`
  color: ${({ theme }) => theme.textSoft};
  font-size: 15px;
`;

const InputNameIn = styled.input`
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  border: none;
  outline: none;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
`;

const InputPassIn = styled(InputNameIn)``;
const InputNameUp = styled(InputNameIn)``;
const InputPassUp = styled(InputNameIn)``;
const InputEmailUp = styled(InputNameIn)``;

const SignInBtn = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const SignUpBtn = styled(SignInBtn)``;
const Span = styled.span``;

export default SignIn
