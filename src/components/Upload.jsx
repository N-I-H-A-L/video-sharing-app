import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosClient from '../axios';
import { useNavigate } from 'react-router-dom';
import { s3 } from '../awsConfig.js';

const Upload = ({ setOpen }) => {
  const navigate = useNavigate();

  const [thumbnail, setThumbnail] = useState(undefined);
  const [video, setVideo] = useState(undefined);

  //State variables to keep track of how much precentage of the video and thumbnail have been uploaded.
  const [videoPerc, setVideoPerc] = useState(0);
  const [thumbnailPerc, setThumbnailPerc] = useState(0);

  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const handleTags = (e) =>{
    setTags(e.target.value.split(','));
  }

 const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpload = async (e) =>{
    e.preventDefault();
    //Add the video to database
    const res = await axiosClient.post('/video', {...inputs, tags});
    //Close the upload component
    setOpen(false);
    //Once the video is uploaded successfully, take the user to the video URL.
    res.status===200 && navigate(`/video/${res.data._id}`);
  }

  const uploadFile = (file, urlType) =>{
    const params = {
      Bucket: "video-sharing-app",
      Key: file.name, // The path where you want to upload the file in S3
      Body: file
    };

    const upload = s3.upload(params);

    upload.on('httpUploadProgress', (progress) => {
        const percentage = Math.round((progress.loaded / progress.total) * 100);
        if(urlType==="imgUrl"){
          setThumbnailPerc(percentage);
        }
        else setVideoPerc(percentage);
    });

    upload.send((err, data) => {
        if (err) {
            console.log(err);
        } else {
            setInputs((prev) => {
              //Save the URLs of video and thumbnail to 'inputs' state variable.
              return { ...prev, [urlType]: data.Location };
            });
            console.log('File uploaded successfully:', data.Location);
        }
    });
}

  useEffect(()=>{
    //If there's a video then only call the uploadFile function.
    video && uploadFile(video, "videoUrl");
  }, [video]);
  
  useEffect(()=>{
    thumbnail && uploadFile(thumbnail, "imgUrl");
  }, [thumbnail]);

  return (
    <Container>
      <Wrapper>
        <Head>
          <Title>Upload a new video</Title>
          <Close onClick={()=>setOpen(false)}>X</Close>
        </Head>
        <Label for="video">Video</Label>
        {/* The below input will only accept videos. */}
        {videoPerc>0 ? <Uploading>{("Uploading: " + videoPerc + "%")}</Uploading>
        : <Input name="video" type="file" accept="video/*" onChange={(e)=>setVideo(e.target.files[0])}/> 
          /* Why files[0]? Since user can select multiple files but we want only 1 file and we're gonna select the first file selected by the user. */
        }
        <Input type="text" placeholder="Title" name="title" onChange={(e) => handleChange(e)}/>
        <Desc placeholder="Description" rows={8} name="desc" onChange={(e) => handleChange(e)}/>
        <Input type="text" placeholder="Separate the tags with commas." onChange={(e) => handleTags(e)}/>
        <Label for="thumbnail">Thumbnail</Label>
        {thumbnailPerc>0 ? <Uploading>{("Uploading: " + videoPerc + "%")}</Uploading>
        : <Input name="thumbnail" type="file" accept="image/*" onChange={(e)=>setThumbnail(e.target.files[0])}/>
        } 
        <Button onClick={(e)=> handleUpload(e)}>Upload</Button>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #000000a7;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    height: 550px;
    width: 550px;
    background-color: ${({theme})=> theme.bgLighter};
    color: ${({theme})=> theme.text};
    display: flex;
    padding: 15px;
    flex-direction: column;
    gap: 15px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  font-family: 'Noto Sans', sans-serif;
  `;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
  font-family: 'Noto Sans', sans-serif;
  `;

const Close = styled.h3`
    &:hover{
      cursor: pointer;
    }
    `;

const Title = styled.h1`
  margin: 0px auto;
  `;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: -5px;
  `;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  `;

const Uploading = styled.div`
  padding: 10px;
`

export default Upload
