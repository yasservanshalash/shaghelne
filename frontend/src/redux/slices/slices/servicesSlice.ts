import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../redux/store';

// Define the service interface
export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  deliveryTime: string;
  sellerLevel: string;
  location: string;
  imageUrl: string;
  sellerName: string;
  sellerRating: number;
  category: string;
}

// Define the state interface
interface ServicesState {
  services: Service[];
  filteredServices: Service[];
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  selectedService: Service | null;
}

// Define the initial state
const initialState: ServicesState = {
  services: [],
  filteredServices: [],
  loading: false,
  error: null,
  selectedCategory: 'all',
  selectedService: null,
};

// Create the services slice
const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    // Set services
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
      state.filteredServices = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    // Filter services by category
    filterServicesByCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      if (action.payload === 'all') {
        state.filteredServices = state.services;
      } else {
        state.filteredServices = state.services.filter(
          service => service.category === action.payload
        );
      }
    },
    
    // Select a service
    selectService: (state, action: PayloadAction<string>) => {
      state.selectedService = state.services.find(service => service.id === action.payload) || null;
    },
    
    // Clear selected service
    clearSelectedService: (state) => {
      state.selectedService = null;
    }
  },
});

// Export actions
export const {
  setLoading,
  setError,
  setServices,
  filterServicesByCategory,
  selectService,
  clearSelectedService,
} = servicesSlice.actions;

// Export selectors
export const selectAllServices = (state: RootState) => state.services.services;
export const selectFilteredServices = (state: RootState) => state.services.filteredServices;
export const selectServicesLoading = (state: RootState) => state.services.loading;
export const selectServicesError = (state: RootState) => state.services.error;
export const selectSelectedCategory = (state: RootState) => state.services.selectedCategory;
export const selectSelectedService = (state: RootState) => state.services.selectedService;

export default servicesSlice.reducer; 