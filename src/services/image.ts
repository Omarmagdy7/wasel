// src/services/imageService.ts

import axios from 'axios';
import { ImageInputDto, Response } from '../services/imaged';

const apiUrl = 'https://your-api-url/api/image';

const uploadImage = async (image: File): Promise<Response> => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('image', image);

  const response = await axios.post(apiUrl, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const deleteImage = async (): Promise<Response> => {
  const token = localStorage.getItem('token');

  const response = await axios.delete(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default {
  uploadImage,
  deleteImage,
};
