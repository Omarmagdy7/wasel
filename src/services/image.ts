// src/services/imageService.ts

import axios from 'axios';
import { Response } from '../services/imaged'; // تأكد إن النوع مطابق للـ response الحقيقي

const apiUrl = 'http://localhost:5104/api/Image';

// ✅ رفع صورة
export const uploadImage = async (image: File): Promise<Response> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const formData = new FormData();
  formData.append('Image', image); // الـ backend بـ .NET غالبًا بيستقبلها كـ "Image"

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// ✅ حذف صورة
export const deleteImage = async (): Promise<Response> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  try {
    const response = await axios.delete(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};
