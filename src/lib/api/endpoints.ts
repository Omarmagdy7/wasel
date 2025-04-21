import { apiClient } from './client';
import type {
  LoginRequest,
  RegisterRequest,
  ChangePasswordRequest,
  ResetPasswordRequest,
  CreatePost,
  CreateComment,
  UserProfile,
  Post,
  Comment,
  Notification,
  PaginatedResponse,
} from './types';

// Auth endpoints
export const auth = {
  login: (data: LoginRequest) =>
    apiClient.post<{ token: string }>('/api/Account/Login', data),
    
  register: (data: RegisterRequest) =>
    apiClient.post('/api/Account/Register', data),
    
  confirmEmail: (token: string, email: string) =>
    apiClient.get(`/api/Account/ConfirmEmail?token=${token}&email=${email}`),
    
  changePassword: (data: ChangePasswordRequest) =>
    apiClient.post('/api/Account/ChangePassword', data),
    
  forgotPassword: (email: string) =>
    apiClient.post('/api/Account/ForgetPassword', { email }),
    
  resetPassword: (data: ResetPasswordRequest) =>
    apiClient.post('/api/Account/ResetPassword', data),
    
  logout: () =>
    apiClient.post('/api/Account/Logout'),
};

// User endpoints
export const users = {
  getMyProfile: () =>
    apiClient.get<UserProfile>('/api/User/MyProfile'),
    
  getUserProfile: (userId: string) =>
    apiClient.get<UserProfile>(`/api/User/${userId}`),
    
  updateProfile: (data: FormData) =>
    apiClient.post<UserProfile>('/api/User', data),
};

// Posts endpoints
export const posts = {
  getAll: (page: number = 1, limit: number = 10) =>
    apiClient.get<PaginatedResponse<Post>>(`/api/Post?page=${page}&limit=${limit}`),
    
  getFollowingPosts: (page: number = 1, limit: number = 10) =>
    apiClient.get<PaginatedResponse<Post>>(`/api/Post/Followings?page=${page}&limit=${limit}`),
    
  getById: (id: string) =>
    apiClient.get<Post>(`/api/Post/${id}`),
    
  create: ({ content, image }: CreatePost) => {
    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);
    
    return apiClient.post<Post>('/api/Post', formData);
  },
    
  update: (id: string, data: CreatePost) =>
    apiClient.put<Post>(`/api/Post/${id}`, data),
    
  delete: (id: string) =>
    apiClient.delete(`/api/Post/${id}`),
};

// Comments endpoints
export const comments = {
  getAll: (postId: string) =>
    apiClient.get<Comment[]>(`/api/Comment?postId=${postId}`),
    
  create: (data: CreateComment) =>
    apiClient.post<Comment>('/api/Comment', data),
    
  createReply: (parentId: string, data: CreateComment) =>
    apiClient.post<Comment>(`/api/Comment/${parentId}`, data),
    
  update: (id: string, content: string) =>
    apiClient.put<Comment>(`/api/Comment/${id}`, { content }),
    
  delete: (id: string) =>
    apiClient.delete(`/api/Comment/${id}`),
};

// Following endpoints
export const following = {
  follow: (userId: string) =>
    apiClient.post('/api/Following', { userId }),
    
  unfollow: (userId: string) =>
    apiClient.delete(`/api/Following/Follow?userId=${userId}`),
    
  cancelFollower: (userId: string) =>
    apiClient.delete(`/api/Following/CancelFollower?userId=${userId}`),
    
  getFollowers: (userId: string) =>
    apiClient.get<UserProfile[]>('/api/Following/Followers'),
    
  getFollowing: (userId: string) =>
    apiClient.get<UserProfile[]>('/api/Following/Followings'),
};

// Likes endpoints
export const likes = {
  likePost: (postId: string) =>
    apiClient.post('/api/Like/LikePost', { postId }),
    
  unlikePost: (postId: string) =>
    apiClient.delete(`/api/Like/CancelPostLike?postId=${postId}`),
    
  likeComment: (commentId: string) =>
    apiClient.post('/api/Like/LikeComment', { commentId }),
    
  unlikeComment: (commentId: string) =>
    apiClient.delete(`/api/Like/CancelCommentLike?commentId=${commentId}`),
    
  getPostLikes: (postId: string) =>
    apiClient.get<UserProfile[]>(`/api/Like/UsersLikePost?postId=${postId}`),
    
  getCommentLikes: (commentId: string) =>
    apiClient.get<UserProfile[]>(`/api/Like/UsersLikeComment?commentId=${commentId}`),
};

// Notifications endpoints
export const notifications = {
  getAll: () =>
    apiClient.get<Notification[]>('/api/Notification'),
};

// Image endpoints
export const images = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/api/Image', formData);
  },
    
  delete: (imageId: string) =>
    apiClient.delete(`/api/Image/${imageId}`),
};