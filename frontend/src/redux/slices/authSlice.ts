import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define the user interface
interface User {
  id: string;
  username: string;
  email: string;
  token?: string;
}

// Define the authentication state interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login request
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Login success
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    
    // Login failure
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Register request
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Register success
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    
    // Register failure
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
  clearError,
} = authSlice.actions;

// Action creator for login
export const login = (credentials: { email: string; password: string }) => async (dispatch: any) => {
  try {
    dispatch(loginRequest());
    // Replace with actual API call
    // const response = await api.post('/login', credentials);
    // const user = response.data;
    
    // Mock response for now
    const user = {
      id: '1',
      username: credentials.email.split('@')[0],
      email: credentials.email,
      token: 'mock-token',
    };
    
    dispatch(loginSuccess(user));
  } catch (error: any) {
    dispatch(loginFailure(error.message || 'Login failed'));
  }
};

// Action creator for register
export const register = (userData: { username: string; email: string; password: string }) => async (dispatch: any) => {
  try {
    dispatch(registerRequest());
    // Replace with actual API call
    // const response = await api.post('/register', userData);
    // const user = response.data;
    
    // Mock response for now
    const user = {
      id: '1',
      username: userData.username,
      email: userData.email,
      token: 'mock-token',
    };
    
    dispatch(registerSuccess(user));
  } catch (error: any) {
    dispatch(registerFailure(error.message || 'Registration failed'));
  }
};

// Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer; 