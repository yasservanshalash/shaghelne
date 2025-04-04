import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define the state interface
interface PriceRange {
  min: number;
  max: number;
}

interface PriceState {
  plan: string;
  priceRange: PriceRange;
}

// Initial state
const initialState: PriceState = {
  plan: '1m',
  priceRange: {
    min: 0,
    max: 100000,
  },
};

// Create the slice
const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    togglePlan: (state, action: PayloadAction<string>) => {
      state.plan = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<PriceRange>) => {
      state.priceRange = action.payload;
    },
  },
});

// Export actions
export const { togglePlan, setPriceRange } = priceSlice.actions;

// Export selectors
export const selectPrice = (state: RootState) => state.price;
export const selectPlan = (state: RootState) => state.price.plan;
export const selectPriceRange = (state: RootState) => state.price.priceRange;

// Export reducer
export default priceSlice.reducer; 