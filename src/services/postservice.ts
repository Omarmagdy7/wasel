// src/services/postLikeService.ts

import api from './api';

export interface CreatePostInput {
  content: string;
  image?: File;
}

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const PostLikeService = {
  // ✅ إنشاء بوست جديد
  async createPost({ content, image }: CreatePostInput) {
    const formData = new FormData();
    formData.append('Content', content);
    if (image) {
      formData.append('Image', image);
    }

    const response = await api.post('/Post/CreatePost', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  // ✅ جلب كل البوستات
  async getPosts(specs?: Record<string, any>) {
    const response = await api.get('/Post', { params: specs });
    return response.data;
  },

  // ✅ حذف بوست
  async deletePost(postId: string) {
    const response = await api.delete(`/Post/${postId}`);
    return response.data;
  },

  // ✅ تسجيل إعجاب لبوست
  async likePost(postId: string) {
    const token = getToken();
    const response = await fetch(`/api/Like/LikePost?PostId=${postId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // ✅ إلغاء إعجاب لبوست
  async unlikePost(postId: string) {
    const token = getToken();
    const response = await fetch(`/api/Like/CancelPostLike?PostId=${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // ✅ تسجيل إعجاب لتعليق
  async likeComment(commentId: string) {
    const token = getToken();
    const response = await fetch(`/api/Like/LikeComment?CommentId=${commentId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // ✅ إلغاء إعجاب لتعليق
  async unlikeComment(commentId: string) {
    const token = getToken();
    const response = await fetch(`/api/Like/CancelCommentLike?CommentId=${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // ✅ المستخدمون الذين أعجبوا ببوست معين
  async getUsersLikePost(postId: string) {
    const token = getToken();
    const response = await fetch(`/api/Like/UsersLikePost?PostId=${postId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // ✅ المستخدمون الذين أعجبوا بتعليق معين
  async getUsersLikeComment(commentId: string) {
    const token = getToken();
    const response = await fetch(`/api/Like/UsersLikeComment?CommentId=${commentId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};
