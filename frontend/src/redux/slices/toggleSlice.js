import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar } = toggleSlice.actions;
export default toggleSlice.reducer; 