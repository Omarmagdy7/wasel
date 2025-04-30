import api from './api';

interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const AuthService = {
  async login(email: string, password: string) {
    try {
      const response = await api.post('/Account/Login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  async register(userData: RegisterInput) {
    try {
      const response = await api.post('/Account/Register', userData);
      return response.data;
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  },

  async forgotPassword(email: string) {
    try {
      const response = await api.post('/Account/ForgetPassword', { email });
      return response.data;
    } catch (error) {
      console.error('Forgot password failed:', error);
      throw error;
    }
  },

  async resetPassword(token: string, email: string, newPassword: string) {
    try {
      const response = await api.post('/Account/ResetPassword', {
        token,
        email,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error('Reset password failed:', error);
      throw error;
    }
  }
};
export const getAllUsers = async () => {
  const response = await fetch('/api/User', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('فشل في جلب المستخدمين');
  }

  return response.json();
};
