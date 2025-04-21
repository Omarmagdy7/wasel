import { z } from 'zod';

// API Response Schemas
export const ErrorResponseSchema = z.object({
  type: z.string(),
  title: z.string(),
  status: z.number(),
  detail: z.string().optional(),
  errors: z.record(z.array(z.string())).optional(),
});

// Auth DTOs
export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
  firstName: z.string(),
  lastName: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const ChangePasswordRequestSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"],
});

export const ResetPasswordRequestSchema = z.object({
  email: z.string().email(),
  token: z.string(),
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// User DTOs
export const UserProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  followersCount: z.number(),
  followingCount: z.number(),
  createdAt: z.string(),
});

// Post DTOs
export const PostSchema = z.object({
  id: z.string(),
  content: z.string(),
  imageUrl: z.string().optional(),
  author: UserProfileSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  likesCount: z.number(),
  commentsCount: z.number(),
  isLiked: z.boolean(),
});

export const CreatePostSchema = z.object({
  content: z.string().min(1),
  image: z.instanceof(File).optional(),
});

// Comment DTOs
export const CommentSchema = z.object({
  id: z.string(),
  content: z.string(),
  author: UserProfileSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  parentId: z.string().optional(),
  likesCount: z.number(),
  isLiked: z.boolean(),
  replies: z.array(z.lazy(() => CommentSchema)).optional(),
});

export const CreateCommentSchema = z.object({
  content: z.string().min(1),
  postId: z.string(),
  parentId: z.string().optional(),
});

// Notification DTOs
export const NotificationSchema = z.object({
  id: z.string(),
  type: z.enum(['Like', 'Comment', 'Follow']),
  message: z.string(),
  isRead: z.boolean(),
  createdAt: z.string(),
  actor: UserProfileSchema,
  entityId: z.string(),
});

// API Types
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type Post = z.infer<typeof PostSchema>;
export type CreatePost = z.infer<typeof CreatePostSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type CreateComment = z.infer<typeof CreateCommentSchema>;
export type Notification = z.infer<typeof NotificationSchema>;

// Pagination Types
export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}