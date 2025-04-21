// src/services/followingService.ts

import axios from 'axios';
import { InputFollowerDto, Response, UserPostDto } from '../services/followd';

const apiUrl = 'https://your-api-url/api/following';

const sendFollow = async (input: InputFollowerDto): Promise<Response> => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${apiUrl}`, input, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const cancelFollow = async (input: InputFollowerDto): Promise<Response> => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${apiUrl}/Follow`, {
    data: input,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const cancelFollower = async (input: InputFollowerDto): Promise<Response> => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${apiUrl}/CancelFollower`, {
    data: input,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const getFollowers = async (): Promise<UserPostDto[]> => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${apiUrl}/Followers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const getFollowings = async (): Promise<UserPostDto[]> => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${apiUrl}/Followings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default {
  sendFollow,
  cancelFollow,
  cancelFollower,
  getFollowers,
  getFollowings,
};
