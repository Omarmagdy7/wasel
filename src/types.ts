// src/types.ts

// واجهة المستخدم التي تحتوي على الـ userId و معلومات أخرى
export interface User {
  id: string;        // يجب أن تكون هذه هي الـ userId
  name: string;      // إضافة name
  username: string;  // إضافة username
  avatar: string;
}

export interface Post {
  id: string;
  content: string;
  author: User;       // ربط المنشور بالمستخدم
  createdAt: string;
  likes: number;
  comments: Comment[]; // ربط المنشور بالتعليقات
  isLikedByMe: boolean;
  image?: string;
}

// واجهة التعليقات
export interface Comment {
  id: string;
  content: string;
  author: User;  // ربط التعليق بالمستخدم
  createdAt: string;
}

// تعديل واجهة PostType لتشمل userId
export interface PostType {
  id: string;
  content: string;
  image?: string;
  likes: number;
  comments: CommentType[];  // ربط المنشور بالتعليقات
  createdAt: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  isLikedByMe: boolean;
  userId: string;  // إضافة userId هنا لربط المنشور بالمستخدم
}

// تعريف CommentType للمستخدمين في التعليقات
export interface CommentType {
  id: string;
  content: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
}

// تحديث InputUpdateProfileDto لتشمل avatarFile من نوع File
export interface InputUpdateProfileDto {
  name: string;
  username: string;
  email: string;
  avatarFile?: File;  // إضافة avatarFile من نوع File لتحديث الصورة الشخصية
}
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  followersCount: number;
  followingCount: number;
  createdAt: string;
  avatarUrl?: string;
  bio?: string;
  name?: string;

  
  username?: string;
}
