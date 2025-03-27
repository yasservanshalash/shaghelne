import { create } from 'zustand';
import api from '../utils/api';

const useAuthStore = create((set) => ({
  // State
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,

  // Actions
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/register', userData);
      const { user, token } = response.data;

      // Store user and token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      set({ 
        user, 
        token, 
        isAuthenticated: true, 
        loading: false,
        error: null 
      });
      
      return { success: true };
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || 'Registration failed' 
      });
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data;

      // Store user and token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      set({ 
        user, 
        token, 
        isAuthenticated: true, 
        loading: false,
        error: null  
      });
      
      return { success: true };
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || 'Login failed' 
      });
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  },

  logout: () => {
    // Remove user and token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    set({ 
      user: null, 
      token: null, 
      isAuthenticated: false,
      error: null
    });
  },

  // Get the current user's profile
  getProfile: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/users/profile');
      const user = response.data;
      
      // Update user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      set({ user, loading: false });
      return user;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || 'Failed to fetch profile' 
      });
      return null;
    }
  },

  // Clear any error messages
  clearError: () => set({ error: null }),
}));

export default useAuthStore; 