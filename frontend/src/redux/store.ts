import { configureStore } from '@reduxjs/toolkit';
// Since authSlice.js doesn't seem to exist in the expected location,
// we'll modify the import to point to what might be the correct location
import authReducer from './slices/authSlice';
import servicesReducer from './slices/slices/servicesSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 