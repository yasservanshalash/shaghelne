import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ToggleState {
  isDashboardSidebarActive: boolean;
  isListingActive: boolean;
}

const initialState: ToggleState = {
  isDashboardSidebarActive: false,
  isListingActive: false
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleDashboardSidebar: (state) => {
      state.isDashboardSidebarActive = !state.isDashboardSidebarActive;
    },
    setDashboardSidebar: (state, action: PayloadAction<boolean>) => {
      state.isDashboardSidebarActive = action.payload;
    },
    toggleListing: (state) => {
      state.isListingActive = !state.isListingActive;
    },
    setListing: (state, action: PayloadAction<boolean>) => {
      state.isListingActive = action.payload;
    }
  }
});

export const { 
  toggleDashboardSidebar, 
  setDashboardSidebar,
  toggleListing,
  setListing
} = toggleSlice.actions;

// Export selectors
export const selectToggle = (state: RootState) => state.toggle;
export const selectDashboardSidebar = (state: RootState) => state.toggle.isDashboardSidebarActive;
export const selectListing = (state: RootState) => state.toggle.isListingActive;

export default toggleSlice.reducer; 