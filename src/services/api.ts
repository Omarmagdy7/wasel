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
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('jwt='))
        ?.split('=')[1];

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error extracting token from cookies:', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: التعامل مع انتهاء صلاحية التوكن وأخطاء السيرفر
api.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.data) {
      try {
        const parsedError = ErrorResponseSchema.parse(error.response.data);
        error.message = parsedError.detail || parsedError.title;
      } catch (parseError) {
        console.warn('Error parsing error response:', parseError);
      }
    }

    if (error.response?.status === 401 && originalRequest) {
      console.warn('Unauthorized access detected. Redirecting to login.');
      // حذف التوكن من الكوكيز (لو انت عايز تنظف الكوكي كمان)
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      // Redirect to login
      window.location.href = '/login';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
