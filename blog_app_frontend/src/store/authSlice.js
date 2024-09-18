import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api, API_BASE_URL } from '../config/api';

// Initial state
const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    isError: false,
    isAuthenticated:false,
    isLoginSuccess: false,
    isRegisterSuccess: false,
    message: '',
};

// Thunk for user login
export const login = createAsyncThunk(`${API_BASE_URL}/auth/login`, async (userData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
        const token = response.data.token;
        console.log(response.data.message);

        // Save token to localStorage
        // console.log("====>",token);

        localStorage.setItem('token', token);

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

// Thunk for user registration
export const signup = createAsyncThunk(`${API_BASE_URL}/auth/register`, async (userData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);

        return response.data.message;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    console.log("logout");

    localStorage.clear('token');
});


export const getUserFromToken = createAsyncThunk("/api/user/profile", async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error('No token found');

        const response = await api.get(`/api/user/profile`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        // console.log("user ====>",response.data);
        
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.token;
                state.isLoginSuccess = true;
                state.isError = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isRegisterSuccess = true;
                state.isError = false;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isError = false;
                state.isLoginSuccess = false;
                state.message = 'User logged out successfully';
            })
            .addCase(getUserFromToken.fulfilled, (state, action) => {
                state.user = action.payload; 
                state.isAuthenticated=true;
            })
            .addCase(getUserFromToken.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export default authSlice.reducer;
