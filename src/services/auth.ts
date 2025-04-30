// src/api/authService.ts
import axios from 'axios';

// تعريف الـ Axios instance مع إعدادات الـ base URL و headers
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',  // تأكد من تعديل هذا إلى الـ API endpoint الصحيح
  headers: {
    'Content-Type': 'application/json',
  }
});

// إضافة التوكن إذا كان موجودًا
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // استرجاع التوكن من الـ LocalStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// تعريف الواجهات الخاصة بالـ requests
interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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

// تسجيل مستخدم جديد
export const registerUser = (data: RegisterRequest) => {
  return apiClient.post('/Account/Register', data);  // تأكد من المسار الصحيح بناءً على الـ API
};

// تسجيل الدخول
export const loginUser = (data: LoginRequest) => {
  return apiClient.post('/Account/Login', data);  // تأكد من المسار الصحيح بناءً على الـ API
};

// تغيير كلمة المرور
export const changePassword = (data: ChangePasswordRequest) => {
  return apiClient.post('/Account/ChangePassword', data);  // تأكد من المسار الصحيح بناءً على الـ API
};

// إعادة تعيين كلمة المرور
export const resetPassword = (data: ResetPasswordRequest) => {
  return apiClient.post('/Account/ForgetPassword', data);  // المسار الخاص بإعادة تعيين كلمة المرور
};

// دالة لتحديث التوكن عند انتهاء صلاحيته
export async function refreshToken(): Promise<TokenResponse> {
  try {
    const response = await apiClient.post('/Account/RefreshToken');  // تأكد من وجود المسار في الـ API
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

    return Date.now() >= exp * 1000 - 300000;  // التحقق إذا كان التوكن قد انتهى
  } catch {
    return true;
  }
}

export const logoutUser = async () => {
  return apiClient.post('/Account/Logout');  // تأكد من المسار الصحيح بناءً على الـ API
};

export const getUserProfile = async () => {
  return apiClient.get('/Account/Profile');  // المسار الخاص بملف المستخدم (profile)
};
export const signup = async (data: { username: string; email: string; password: string; confirmPassword: string }) => {
  const response = await apiClient.post('/Account/Register', data);
  return response.data;
};

