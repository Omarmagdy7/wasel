// src/api/authService.ts
import apiClient from './api';

// تعريف الواجهات الخاصة بالـ requests
interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

interface ResetPasswordRequest {
  email: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

// دوال الواجهة (APIs)
export const registerUser = (data: RegisterRequest) => {
  return apiClient.post('/auth/register', data);
};
// services/auth.ts



export const logoutUser = async () => {
  return apiClient.post('/logout');
};

export const getUserProfile = async () => {
  return apiClient.get('/profile');
};

export const loginUser = (data: LoginRequest) => {
  return apiClient.post('/auth/login', data);
};

export const changePassword = (data: ChangePasswordRequest) => {
  return apiClient.post('/auth/change-password', data);
};

// دالة لإرسال طلب إعادة تعيين كلمة المرور
export const resetPassword = (data: ResetPasswordRequest) => {
  return apiClient.post('/auth/reset-password', data);
};

// دالة لتحديث التوكن عند انتهاء صلاحيته
export async function refreshToken(): Promise<TokenResponse> {
  try {
    const response = await apiClient.post('/auth/refresh-token');
    return response.data;
  } catch (error) {
    throw new Error('فشل في تجديد التوكن');
  }
}

// دالة لفحص ما إذا كان التوكن قد انتهت صلاحيته
export function isTokenExpired(): boolean {
  const user = localStorage.getItem('user');
  if (!user) return true;

  try {
    const { exp } = JSON.parse(user);
    if (!exp) return true;

    return Date.now() >= exp * 1000 - 300000;
  } catch {
    return true;
  }
}
