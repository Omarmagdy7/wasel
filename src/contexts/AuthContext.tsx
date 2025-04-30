// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserProfile } from '../lib/api/types'; // تأكد من أن UserProfile يحتوي على name و username
import { loginUser, logoutUser, getUserProfile } from '../services/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<UserProfile>) => void;
  incrementBullyingAttempts: () => void; // تمت إضافتها
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // قم بتحميل بيانات المستخدم عندما يتم تحميل الـ AuthContext
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const response = await getUserProfile();
        const profile = response.data;
        console.log('Profile:', profile);
        setUser(profile);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // تسجيل الدخول
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await loginUser({ email, password });
      const response = await getUserProfile();
      const profile = response.data;
      console.log('Profile after login:', profile);
      setUser(profile);
      setIsAuthenticated(true);
      navigate('/'); // انتقل إلى الصفحة الرئيسية بعد تسجيل الدخول
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // تسجيل الخروج
  const logout = async () => {
    try {
      setIsLoading(true);
      await logoutUser(); // استدعاء API السيرفر لو محتاج
      localStorage.removeItem('token'); // مسح التوكن من localStorage
      setUser(null); // مسح بيانات اليوزر من الكونتكست
      setIsAuthenticated(false); // تغيير الحالة
      navigate('/login'); // توجيه المستخدم لصفحة تسجيل الدخول
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // تحديث بيانات المستخدم
  const updateUser = (data: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
    }
  };

  // تسجيل محاولات التنمر
  const incrementBullyingAttempts = () => {
    console.log('تم تسجيل محاولة تنمر');
    // يمكنك هنا تنفيذ منطق إضافي مثل تحديث الحالة أو إرسال طلب إلى الخادم
  };

  // القيمة التي ستتم مشاركتها عبر الـ Context
  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    updateUser,
    incrementBullyingAttempts, // تمت إضافتها
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// هوك مخصص للوصول إلى بيانات المستخدم
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
