// src/services/likeService.ts

const API_BASE_URL = 'https://your-api-url/api/Like'; // استبدل بعنوان API الفعلي

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

const likePost = async (postId: string): Promise<any> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/LikePost?PostId=${postId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const likeComment = async (commentId: string): Promise<any> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/LikeComment?CommentId=${commentId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const cancelPostLike = async (postId: string): Promise<any> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/CancelPostLike?PostId=${postId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const cancelCommentLike = async (commentId: string): Promise<any> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/CancelCommentLike?CommentId=${commentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const getUsersLikePost = async (postId: string): Promise<any> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/UsersLikePost?PostId=${postId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const getUsersLikeComment = async (commentId: string): Promise<any> => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/UsersLikeComment?CommentId=${commentId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export default {
  likePost,
  likeComment,
  cancelPostLike,
  cancelCommentLike,
  getUsersLikePost,
  getUsersLikeComment,
};
