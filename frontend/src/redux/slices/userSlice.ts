import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define location type
export type UserLocation = {
  city?: string;
  subCity?: string;
  specificArea?: string;
};

// Define portfolio item type
export type PortfolioItem = {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  date?: string;
};

// Define language type
export type Language = {
  name: string;
  proficiency: string; // e.g., "Beginner", "Intermediate", "Advanced", "Native"
};

// Define education type
export type Education = {
  institution: string;
  degree: string;
  field: string;
  startDate?: string;
  endDate?: string;
  description?: string;
};

// Define experience type
export type Experience = {
  company: string;
  position: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
};

// Define verification details type
export type VerificationDetails = {
  documentType?: string;
  documentId?: string;
  verifiedAt?: string;
  status?: string;
};

// Define user role enum
export enum Role {
  USER = "USER",
  FREELANCER = "FREELANCER",
  EMPLOYER = "EMPLOYER",
  ADMIN = "ADMIN"
}

// Define user type based on backend schema
export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  phoneNumber?: string;
  profileImage?: string;
  bio?: string;
  location?: UserLocation;
  skills: string[];
  portfolio: PortfolioItem[];
  languages: Language[];
  education: Education[];
  experience: Experience[];
  isVerified: boolean;
  verificationDetails?: VerificationDetails;
  rating?: number;
  totalReviews: number;
  completedJobs: number;
  createdAt?: string;
  updatedAt?: string;
};

// Define initial state type
type UserState = {
  token: string | null;
  userData: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  rememberMe: boolean;
};

// Check if user token exists on app initialization
const loadUserFromStorage = (): UserState => {
  // Check both localStorage and sessionStorage
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const userData = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user') || '{}') 
    : sessionStorage.getItem('user') 
      ? JSON.parse(sessionStorage.getItem('user') || '{}')
      : null;
  
  if (token && userData) {
    return {
      token,
      userData,
      isAuthenticated: true,
      isLoading: false,
      error: null,
      rememberMe: localStorage.getItem('token') ? true : false
    };
  }
  return {
    token: null,
    userData: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    rememberMe: false
  };
};

const initialState: UserState = loadUserFromStorage();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Start loading
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    
    // Set user after successful login/register
    setUser: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userData = action.payload.user;
      state.error = null;
      
      // Store in localStorage or sessionStorage based on rememberMe
      const storage = state.rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', action.payload.token);
      storage.setItem('user', JSON.stringify(action.payload.user));
    },
    
    // Set error
    setError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    // Logout
    logout: (state) => {
      // Remove token and user data from storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      
      // Reset state
      state.token = null;
      state.userData = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Set remember me preference
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    
    // Update user profile
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
        
        // Update in storage
        const storage = state.rememberMe ? localStorage : sessionStorage;
        storage.setItem('user', JSON.stringify(state.userData));
      }
    }
  },
});

export const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer; 