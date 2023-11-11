import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentVideo: {initial: "video"},
    loading: false,
    error: false,
};

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers:{
        fetchStart: (state)=>{
            state.loading = true;
        },
        fetchSuccess: (state, action)=>{
            state.loading = false;
            state.currentVideo = action.payload;
        },
        fetchFailure: (state)=>{
            state.loading = false;
            state.error = true;
        },
        like: (state, action) =>{
            state.currentVideo.likes.push(action.payload);
            state.currentVideo.dislikes.splice(state.currentVideo.dislikes.indexOf(action.payload), 1);
        },
        dislike: (state, action) =>{
            state.currentVideo.dislikes.push(action.payload);
            state.currentVideo.likes.splice(state.currentVideo.likes.indexOf(action.payload), 1);
        }
    }
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } = videoSlice.actions;

export default videoSlice.reducer;