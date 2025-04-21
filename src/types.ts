export interface Post {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  likes: number;
  comments: Comment[];
  isLikedByMe: boolean;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
}
// src/types.ts

export interface PostType {
  id: string;
  content: string;
  image?: string;
  likes: number;
  comments: CommentType[];
  createdAt: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  isLikedByMe: boolean;
}

export interface CommentType {
  id: string;
  content: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
}
