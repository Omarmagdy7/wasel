// src/api/apiClient.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ErrorResponseSchema } from '../lib/api/types';

export const api = axios.create({
  baseURL: 'http://localhost:5104/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: إضافة التوكن إلى الهيدر
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('jwt='))
      ?.split('=')[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: التعامل مع انتهاء صلاحية التوكن
api.interceptors.response.use(
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
      // Redirect to login
      window.location.href = '/login';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
