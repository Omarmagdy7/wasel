import axios from 'axios';

const API_URL = 'https://your-api-url.com/api/posts'; // استبدل بـ URL الـ API الخاص بك

export const getAllPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addPost = async (content: string) => {
  const response = await axios.post(API_URL, { content });
  return response.data;
};

export const likePost = async (id: string) => {
  const response = await axios.post(`${API_URL}/${id}/like`);
  return response.data;
};

export const unlikePost = async (id: string) => {
  const response = await axios.post(`${API_URL}/${id}/unlike`);
  return response.data;
};

export const createComment = async (postId: string, content: string) => {
  const response = await axios.post(`${API_URL}/${postId}/comments`, { content });
  return response.data;
};
