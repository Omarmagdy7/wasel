// src/components/ProtectedRoute.tsx

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // تأكد من أنك تستخدم useAuth بشكل صحيح
import { LoadingSpinner } from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth(); // جلب حالة المستخدم من context
  const location = useLocation();

  // لو في حالة تحميل (isLoading = true) يعرض سبينر لغاية ما يتأكد من حالة المستخدم
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // إذا لم يكن المستخدم مسجل دخول (أي user == null) يتم إعادة توجيهه لصفحة تسجيل الدخول
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // إذا كان المستخدم مسجل دخول يعرض المحتوى (children)
  return <>{children}</>;
}
