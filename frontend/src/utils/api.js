import axios from 'axios';

// Get the API URL from environment variables or use defaults
const getApiUrl = () => {
  // Check if we're in production mode
  if (process.env.NODE_ENV === 'production') {
    // Use environment variable if available, otherwise use Render URL
    return process.env.REACT_APP_API_URL || 'https://expense-tracker-51wr.onrender.com';
  }
  
  // Development mode - use environment variable or default to localhost
  return process.env.REACT_APP_API_URL || 'http://localhost:5000';
};

// Log the API URL for debugging (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 API Configuration:', {
    environment: process.env.NODE_ENV,
    apiUrl: getApiUrl(),
    envVar: process.env.REACT_APP_API_URL
  });
}

// Create axios instance with base configuration
const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 