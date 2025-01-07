import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api, API_BASE_URL } from "../config/api"
import axios from "axios"

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    singlePost: null,
    posts: [],
    popularPost: [],
    latestPost: [],
    postCreated: false,
    like: null,
    dislike: null,
    comment: null,
    searchResult: []
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
        // console.log("BBBB", response.data);
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
        // console.log(response.data);

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
        console.log("error");
        
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

export const disLikePost = createAsyncThunk("/post/dislike", async (postId, thunkAPI) => {
    try {
        const response = await api.post(`/api/post/dislike/${postId}`)
        // console.log("disliked post ==> ", response.data);
        return response.data;
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

export const createComment = createAsyncThunk("/post/comment", async ({ postId, comment }, thunkAPI) => {
    console.log("====>", comment);

    try {
        const response = await api.post(`/api/post/comment/${postId}`, comment)
        // console.log(response.data);

        return response.data;
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

export const searchPost = createAsyncThunk("/post/search", async (reqData, thunkAPI) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/post/search?title=${reqData.title}&page=${reqData.page}`)
        // console.log("data = > ",response.data);

        return response.data;
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

export const getPopularPost = createAsyncThunk("/posts/popular", async (thunkAPI) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/popular`)
        return response.data
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

export const getLatestPost = createAsyncThunk("/posts/latest", async (thunkAPI) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/latest`)
        return response.data
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

export const getRandomPosts = createAsyncThunk("/posts/random", async (thunkAPI) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/random-post`)
        // console.log("data => ", response.data);

        return response.data
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

export const getPostByCategory = createAsyncThunk("/posts/category", async (category, thunkAPI) => {

    try {
        const response = await axios.get(`${API_BASE_URL}/post/category?category=${category}`)
        // console.log("cat4egory => ", category);
        // console.log("data => ", response.data);
        return response.data


    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue(message);
    }
})

export const updatePost = createAsyncThunk("api/post/update", async (data, thunkAPI) => {
    try {
        // console.log("updated data=> ", data);

        const response = await api.put(`/api/post/update`, data)
        // console.log("response", response.data);

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
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.fulfilled, (state) => {
                state.postCreated=true;
            })
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
                // const updatedPost = action.payload;
                // console.log("posts => ", state.posts)
                state.singlePost = action.payload

            })


            .addCase(disLikePost.fulfilled, (state, action) => {
                // const dislikedPost = action.payload;
                state.singlePost = action.payload
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
            .addCase(searchPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.searchResult = action.payload
            })
            .addCase(getPopularPost.fulfilled, (state, action) => {
                state.popularPost = action.payload
            })
            .addCase(getLatestPost.fulfilled, (state, action) => {
                state.latestPost = action.payload
            })
            .addCase(getRandomPosts.fulfilled, (state, action) => {
                state.posts = action.payload
            })
            .addCase(getPostByCategory.fulfilled, (state, action) => {
                state.posts = action.payload
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.singlePost = action.payload;
            })
            .addCase(createComment.rejected, (state, action) => {
                console.error("Error creating comment:", action.payload);
            });
        ;
    },
});

export default postSlice.reducer;