// src/services/userService.ts

import axios from 'axios';
import { InputUpdateProfileDto } from '../types';  // تأكد من المسار الصحيح

// خدمة جلب جميع المستخدمين
export const getAllUsers = async () => {
  try {
    const response = await axios.get('/api/User', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // إضافة التوكن للمصادقة
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// خدمة جلب الملف الشخصي للمستخدم
export const getUserProfile = async () => {
  try {
    const response = await axios.get('/api/User/MyProfile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // إضافة التوكن للمصادقة
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// خدمة تحديث الملف الشخصي
export const updateUserProfile = async (input: InputUpdateProfileDto) => {
  try {
    const response = await axios.post('/api/User', input, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // إضافة التوكن للمصادقة
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// تصدير جميع الخدمات
export const UserService = {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
};
