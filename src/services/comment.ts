// src/services/commentService.ts

import axios from 'axios';

// تأكد من تعديل رابط الـ API حسب السيرفر الخاص بك
const API_URL = 'http://localhost:5104/api/Comment'; 

interface CommentDto {
  content: string;
  postId: string;
  parentCommentId?: string; // من هنا نربط الردود
}

// إعداد الهيدر بالتوكن (نضيف Authorization)
const authHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated'); // في حالة عدم وجود التوكن
  return {
    headers: {
      Authorization: `Bearer ${token}`, // إضافة التوكن للهيدر
    },
  };
};

export const CommentService = {
  // إنشاء تعليق جديد
  async createComment(postId: string, content: string) {
    try {
      const response = await axios.post(API_URL, { postId, content }, authHeaders());
      return response.data; // إرجاع البيانات المستلمة من الـ API
    } catch (error) {
      console.error('Error creating comment:', error);
      throw new Error('Failed to create comment'); // معالج الخطأ
    }
  },

  // الرد على تعليق (نضيف رد مع parentCommentId)
  async replyToComment(parentCommentId: string, postId: string, content: string) {
    try {
      const response = await axios.post(`${API_URL}/reply/${parentCommentId}`, { postId, content }, authHeaders());
      return response.data; // إرجاع البيانات المستلمة من الـ API
    } catch (error) {
      console.error('Error replying to comment:', error);
      throw new Error('Failed to reply to comment'); // معالج الخطأ
    }
  },

  // تعديل تعليق
  async updateComment(commentId: string, content: string) {
    try {
      const response = await axios.put(`${API_URL}/${commentId}`, { content }, authHeaders());
      return response.data; // إرجاع البيانات المستلمة من الـ API
    } catch (error) {
      console.error('Error updating comment:', error);
      throw new Error('Failed to update comment'); // معالج الخطأ
    }
  },

  // حذف تعليق
  async deleteComment(commentId: string) {
    try {
      const response = await axios.delete(`${API_URL}/${commentId}`, authHeaders());
      return response.data; // إرجاع البيانات المستلمة من الـ API
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw new Error('Failed to delete comment'); // معالج الخطأ
    }
  },

  // جلب التعليقات الخاصة بالبوست
  async getComments(postId: string) {
    try {
      const response = await axios.get(`${API_URL}/post/${postId}`, authHeaders());
      return response.data; // إرجاع البيانات المستلمة من الـ API
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw new Error('Failed to fetch comments'); // معالج الخطأ
    }
  }
};

// تعديل تعليق في `commentService.ts`
export const updateComment = async (commentId: string, content: string) => {
  try {
    const response = await axios.put(`${API_URL}/${commentId}`, { content }, authHeaders());
    return response.data; // إرجاع البيانات المستلمة من الـ API
  } catch (error) {
    console.error('Error updating comment:', error);
    throw new Error('Failed to update comment'); // معالج الخطأ
  }
};
