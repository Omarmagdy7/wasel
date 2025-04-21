import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ErrorResponseSchema } from './types';

const API_URL = 'http://localhost:5104';

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // Parse error response
    if (error.response?.data) {
      try {
        const parsedError = ErrorResponseSchema.parse(error.response.data);
        error.message = parsedError.detail || parsedError.title;
      } catch {
        // If error doesn't match our schema, use the original error message
      }
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && originalRequest) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;