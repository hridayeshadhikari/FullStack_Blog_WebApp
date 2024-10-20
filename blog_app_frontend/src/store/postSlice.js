import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api, API_BASE_URL } from "../config/api"
import axios from "axios"

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    singlePost: null,
    posts: [],
    like: null,
    dislike: null,
    comment: null
}

export const createPost = createAsyncThunk(`/api/post/create`, async (postData, thunkAPI) => {
    try {
        const response = await api.post(`/api/post/create`, postData)
        // console.log("====>", response);
        return response.data;
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

export const getAllPost = createAsyncThunk("/posts", async (page, thunkAPI) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts?page=${page}`);
        // console.log("====>", response.data);
        return response.data;
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

export const getPostById = createAsyncThunk(`/post/getPostById`, async (postId, thunkAPI) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/post/${postId}`)
        console.log("BBBB", response.data);
        return response.data;


    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

export const deletePost = createAsyncThunk("/post/delete", async (postId, thunkAPI) => {
    try {
        const response = await api.delete(`/api/post/delete/${postId}`)
        console.log(response.data);

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

export const likePost = createAsyncThunk("/post/like", async (postId, thunkAPI) => {
    try {
        const response = await api.post(`/api/post/like/${postId}`)
        return response.data;
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

export const disLikePost = createAsyncThunk("/post/dislike", async (postId, thunkAPI) => {
    try {
        const response = await api.post(`/api/post/dislike/${postId}`)
        return response.data;
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

export const createComment = createAsyncThunk("/post/comment", async ({postId,comment}, thunkAPI) => {
    console.log("====>",comment);
    
    try {
        const response = await api.post(`/api/post/comment/${postId}`,comment)
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

export const searchPost = createAsyncThunk("/post/search", async (title,page, thunkAPI) => {
    try {
        const response = await api.post(`/post/search?title=${title}&page=${page}`)
        return response.data;
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPostById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.posts = action.payload;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const likedPost = action.payload;
                if (state.singlePost && state.singlePost._id === likedPost._id) {
                    state.singlePost = likedPost;
                }
                state.posts = state.posts.map((post) =>
                    post._id === likedPost._id ? likedPost : post
                );
            })
            .addCase(disLikePost.fulfilled, (state, action) => {
                const dislikedPost = action.payload;
                if (state.singlePost && state.singlePost._id === dislikedPost._id) {
                    state.singlePost = dislikedPost;
                }
                state.posts = state.posts.map((post) =>
                    post._id === dislikedPost._id ? dislikedPost : post
                );
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.singlePost = action.payload;
            })
            .addCase(getAllPost.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(getPostById.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(searchPost.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isError=false
                state.posts=action.payload
            })
            ;


    },
});

export default postSlice.reducer;