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
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from './components/ErrorBoundary'; // ✓ ErrorBoundary مضاف

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
            <Route path="*" element={<AppRoutes />} />
          </Routes>
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
              <ErrorBoundary>
                <AppContent />
              </ErrorBoundary>
              <Toaster position="top-center" reverseOrder={false} />
            </AuthProvider>
          </AccessibilityProvider>
        </LanguageProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}

export default App;
