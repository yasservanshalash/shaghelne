import axios from 'axios';

// Get base URL from environment variable or fallback to localhost
// In React apps using Vite or Create React App, env variables need to be prefixed with VITE_ or REACT_APP_
const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 
                     window.env?.API_BASE_URL || 
                     'http://localhost:5002/api';

// Export API_BASE_URL as API_URL for consistency
export const API_URL = API_BASE_URL;

// Log the selected API base URL (for debugging)
console.log('API Service initialized with base URL:', API_BASE_URL);

// Create an instance of axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    // Log the request (useful for debugging)
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`, config.params || {});
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common response scenarios
api.interceptors.response.use(
  (response) => {
    // Log successful response (for debugging)
    console.log(`API Response Success: ${response.config.method.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    // Log all errors for debugging
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', {
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error Request:', {
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        request: error.request,
        message: error.message
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error Setup:', {
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        message: error.message
      });
    }
    
    // Handle 401 (Unauthorized) - redirect to login page
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Add a method to check API availability for specific endpoints
api.checkEndpoint = async (endpoint, timeout = 5000) => {
  try {
    const response = await api.get(endpoint, { 
      timeout: timeout,
      // Add a cache-busting parameter to avoid cached responses
      params: { _: new Date().getTime() }
    });
    return {
      available: true,
      status: response.status,
      statusText: response.statusText,
      data: response.data
    };
  } catch (error) {
    return {
      available: false,
      error: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    };
  }
};

// Add helper method to diagnose API connectivity issues
api.diagnoseConnection = async () => {
  console.log('Diagnosing API connection issues...');
  
  // Test the base endpoint for jobs instead of health
  const jobsResult = await api.checkEndpoint('/jobs?limit=1');
  console.log('API Jobs endpoint check:', jobsResult);
  
  return {
    baseUrl: API_BASE_URL,
    jobsCheck: jobsResult,
    allValid: jobsResult.available
  };
};

export default api; 