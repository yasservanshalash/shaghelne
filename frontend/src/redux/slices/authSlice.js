import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API URL - use environment variable if available or fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

// Login thunk
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Attempting login with:', API_URL);
      const response = await axios.post(`${API_URL}/login`, userData);
      
      console.log('Login response:', response.data);
      
      // Save token to local storage
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      // Ensure we have a valid response format, even if backend returns different structure
      return {
        token: response.data?.token || null,
        user: response.data?.user || response.data || {},
      };
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to login. Please try again.'
      );
    }
  }
);

// Register thunk
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Attempting registration with:', API_URL);
      const response = await axios.post(`${API_URL}/register`, userData);
      
      console.log('Registration response:', response.data);
      
      // Save token to local storage
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      // Ensure we have a valid response format, even if backend returns different structure
      return {
        token: response.data?.token || null,
        user: response.data?.user || response.data || {},
      };
    } catch (error) {
      console.error('Registration error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to register. Please try again.'
      );
    }
  }
);

// Logout thunk
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem('token');
    return null;
  }
);

// Check if token exists for auto-login
const token = localStorage.getItem('token');

// Initial state
const initialState = {
  token: token || null,
  user: null,
  isAuthenticated: !!token,
  isLoading: false,
  error: null
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  }
});

export const { resetError, setCredentials } = authSlice.actions;

export default authSlice.reducer; 