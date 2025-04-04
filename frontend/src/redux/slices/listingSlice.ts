import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define the state interface
interface ListingState {
  deliveryTime: string;
  level: string[];
  location: string[];
  bestSeller: string;
  designTool: string[];
  speak: string[];
  search: string;
  category: string[];
  projectType: string[];
  englishLevel: string[];
  jobType: string[];
  noOfEmployee: string[];
}

// Initial state
const initialState: ListingState = {
  deliveryTime: '',
  level: [],
  location: [],
  bestSeller: 'best-seller',
  designTool: [],
  speak: [],
  search: '',
  category: [],
  projectType: [],
  englishLevel: [],
  jobType: [],
  noOfEmployee: [],
};

// Helper function to toggle items in an array
const toggleArrayItem = (array: string[], item: string): string[] => {
  if (array.includes(item)) {
    return array.filter((existing) => existing !== item);
  }
  return [...array, item];
};

// Create the slice
const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    setDeliveryTime: (state, action: PayloadAction<string>) => {
      state.deliveryTime = action.payload;
    },
    setLevel: (state, action: PayloadAction<string>) => {
      if (action.payload?.length !== 0) {
        state.level = toggleArrayItem(state.level, action.payload);
      } else {
        state.level = [];
      }
    },
    setLocation: (state, action: PayloadAction<string>) => {
      if (action.payload?.length !== 0) {
        state.location = toggleArrayItem(state.location, action.payload);
      } else {
        state.location = [];
      }
    },
    setBestSeller: (state, action: PayloadAction<string>) => {
      state.bestSeller = action.payload;
    },
    setDesignTool: (state, action: PayloadAction<string>) => {
      if (action.payload?.length !== 0) {
        state.designTool = toggleArrayItem(state.designTool, action.payload);
      } else {
        state.designTool = [];
      }
    },
    setSpeak: (state, action: PayloadAction<string>) => {
      if (action.payload?.length !== 0) {
        state.speak = toggleArrayItem(state.speak, action.payload);
      } else {
        state.speak = [];
      }
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      if (action.payload?.length !== 0) {
        state.category = toggleArrayItem(state.category, action.payload);
      } else {
        state.category = [];
      }
    },
    setProjectType: (state, action: PayloadAction<string>) => {
      if (action.payload?.length !== 0) {
        state.projectType = toggleArrayItem(state.projectType, action.payload);
      } else {
        state.projectType = [];
      }
    },
    setEnglishLevel: (state, action: PayloadAction<string>) => {
      if (action.payload?.length !== 0) {
        state.englishLevel = toggleArrayItem(state.englishLevel, action.payload);
      } else {
        state.englishLevel = [];
      }
    },
    setJobType: (state, action: PayloadAction<string>) => {
      if (action.payload?.length !== 0) {
        state.jobType = toggleArrayItem(state.jobType, action.payload);
      } else {
        state.jobType = [];
      }
    },
    setNoOfEmployee: (state, action: PayloadAction<string>) => {
      if (action.payload?.length !== 0) {
        state.noOfEmployee = toggleArrayItem(state.noOfEmployee, action.payload);
      } else {
        state.noOfEmployee = [];
      }
    },
  },
});

// Export actions
export const {
  setDeliveryTime,
  setLevel,
  setLocation,
  setBestSeller,
  setDesignTool,
  setSpeak,
  setSearch,
  setCategory,
  setProjectType,
  setEnglishLevel,
  setJobType,
  setNoOfEmployee,
} = listingSlice.actions;

// Export selectors
export const selectListing = (state: RootState) => state.listing;
export const selectDeliveryTime = (state: RootState) => state.listing.deliveryTime;
export const selectLevel = (state: RootState) => state.listing.level;
export const selectLocation = (state: RootState) => state.listing.location;
export const selectBestSeller = (state: RootState) => state.listing.bestSeller;
export const selectDesignTool = (state: RootState) => state.listing.designTool;
export const selectSpeak = (state: RootState) => state.listing.speak;
export const selectSearch = (state: RootState) => state.listing.search;
export const selectCategory = (state: RootState) => state.listing.category;
export const selectProjectType = (state: RootState) => state.listing.projectType;
export const selectEnglishLevel = (state: RootState) => state.listing.englishLevel;
export const selectJobType = (state: RootState) => state.listing.jobType;
export const selectNoOfEmployee = (state: RootState) => state.listing.noOfEmployee;

// Export reducer
export default listingSlice.reducer; 