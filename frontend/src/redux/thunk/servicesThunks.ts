import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Service, setLoading, setError, setServices } from '../slices/slices/servicesSlice';

const API_URL = 'http://localhost:5000/api';

// Thunk for fetching all services
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${API_URL}/services`);
      const services: Service[] = response.data;
      dispatch(setServices(services));
      return services;
    } catch (error) {
      let errorMessage = 'Failed to fetch services';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(setError(errorMessage));
      throw error;
    }
  }
);

// Thunk for fetching services by category
export const fetchServicesByCategory = createAsyncThunk(
  'services/fetchServicesByCategory',
  async (category: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const url = category === 'all' 
        ? `${API_URL}/services` 
        : `${API_URL}/services?category=${category}`;
      
      const response = await axios.get(url);
      const services: Service[] = response.data;
      dispatch(setServices(services));
      return services;
    } catch (error) {
      let errorMessage = 'Failed to fetch services by category';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(setError(errorMessage));
      throw error;
    }
  }
);

// Thunk for fetching a service by ID
export const fetchServiceById = createAsyncThunk(
  'services/fetchServiceById',
  async (id: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${API_URL}/services/${id}`);
      const service: Service = response.data;
      return service;
    } catch (error) {
      let errorMessage = 'Failed to fetch service details';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(setError(errorMessage));
      throw error;
    }
  }
); 