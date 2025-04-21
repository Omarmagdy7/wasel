import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAccessibility } from './contexts/AccessibilityContext';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const Notifications = React.lazy(() => import('./pages/Notifications'));
const Likes = React.lazy(() => import('./components/likebutton'));
const UsersList = React.lazy(() => import('./components/userlist'));
const UserProfile = React.lazy(() => import('./components/userprofile'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const AccessibilityCheck = React.lazy(() => import('./pages/AccessibilityCheck'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));

export function AppRoutes() {
  const { isVisuallyImpaired, setIsVisuallyImpaired } = useAccessibility();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route 
        path="/accessibility-check" 
        element={
          <AccessibilityCheck 
            onResponse={(value) => setIsVisuallyImpaired(value)} 
          />
        } 
      />
      <Route 
        path="/signup" 
        element={
          isVisuallyImpaired === null ? (
            <Navigate to="/accessibility-check" replace />
          ) : (
            <Signup />
          )
        } 
      />

      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/notifications" element={
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      } />
      <Route path="/likes" element={
        <ProtectedRoute>
          <Likes />
        </ProtectedRoute>
      } />
      <Route path="/users" element={
        <ProtectedRoute>
          <UsersList />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/settings/*" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      <Route path="/user-profile" element={
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      } />
    </Routes>
  );
}
