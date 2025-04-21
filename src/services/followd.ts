// src/types/following.d.ts

export interface InputFollowerDto {
    userId: string;
  }
  
  export interface Response {
    status: string;
    message: string;
  }
  
  export interface UserPostDto {
    id: string;
    username: string;
    // أضف الحقول الأخرى المطلوبة
  }
  