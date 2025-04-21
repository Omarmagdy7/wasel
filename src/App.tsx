// src/App.tsx

import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { QueryProvider } from './providers/QueryProvider';
import { AppRoutes } from './AppRoutes';
import FollowButton from './components/followbutton';
import FollowersList from './components/followerslist';
import ImageUpload from './components/imageuploud';
import ImageDelete from './components/imagedelete';
import Notifications from './components/notification';
import Likes from './components/likebutton';
import UsersList from './components/userlist';
import UserProfile from './components/userprofile';

function AppContent() {
  const location = useLocation();
  const { dir } = useLanguage();

  const noNavbarRoutes = [
    '/login',
    '/signup',
    '/accessibility-check',
    '/forgot-password'
  ];

  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${dir === 'rtl' ? 'font-kufi' : ''}`}>
      {shouldShowNavbar && <Navigation />}
      <main className={`${shouldShowNavbar ? `${dir === 'rtl' ? 'md:mr-64' : 'md:ml-64'} pt-4 pb-20 md:pb-4` : ''}`}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/likes" element={<Likes />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<AppRoutes />} />
          </Routes>
          <FollowButton userId="123" />
          <FollowersList />
          <ImageUpload />
          <ImageDelete />
        </Suspense>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <LanguageProvider>
          <AccessibilityProvider>
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          </AccessibilityProvider>
        </LanguageProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}

export default App;
