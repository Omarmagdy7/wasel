// src/api/commentApi.ts

import axios from 'axios';

interface CommentDto {
  content: string;
  postId: string;
  parentCommentId?: string;
}

const API_URL = 'https://your-api-endpoint.com/api/comments';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const addComment = async (commentDto: CommentDto) => {
  try {
    const response = await axiosInstance.post('/', commentDto);
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const addReply = async (commentDto: CommentDto, parentCommentId: string) => {
  try {
    const response = await axiosInstance.post(`/${parentCommentId}`, commentDto);
    return response.data;
  } catch (error) {
    console.error('Error adding reply:', error);
    throw error;
  }
};

export const updateComment = async (commentDto: CommentDto, commentId: string) => {
  try {
    const response = await axiosInstance.put(`/${commentId}`, commentDto);
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await axiosInstance.delete(`/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

export const getComments = async (parameters: { [key: string]: any }) => {
  try {
    const response = await axiosInstance.get('/', { params: parameters });
    return response.data;
  } catch (error) {
    console.error('Error getting comments:', error);
    throw error;
  }
};
