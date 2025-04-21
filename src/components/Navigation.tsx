import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Bell, User, Settings, LogOut } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

export function Navigation() {
  const { dir } = useLanguage();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-64 hidden md:flex flex-col bg-white dark:bg-gray-900 border-x border-gray-200 dark:border-gray-700 z-30`}>
        <div className="flex flex-col h-full">
          {/* Main navigation items */}
          <div className="flex flex-col flex-1 p-4 space-y-2">
            <Link
              to="/"
              className={`flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                location.pathname === '/' ? 'bg-gray-100 dark:bg-gray-800' : ''
              }`}
              aria-label={t('navigation.home')}
            >
              <Home className={`w-6 h-6 ${dir === 'rtl' ? 'ml-4' : 'mr-4'} flex-shrink-0`} aria-hidden="true" />
              <span>{t('navigation.home')}</span>
            </Link>
            
            <Link
              to="/notifications"
              className={`flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                location.pathname === '/notifications' ? 'bg-gray-100 dark:bg-gray-800' : ''
              }`}
              aria-label={t('navigation.notifications')}
            >
              <Bell className={`w-6 h-6 ${dir === 'rtl' ? 'ml-4' : 'mr-4'} flex-shrink-0`} aria-hidden="true" />
              <span>{t('navigation.notifications')}</span>
            </Link>
            
            <Link
              to="/profile"
              className={`flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                location.pathname === '/profile' ? 'bg-gray-100 dark:bg-gray-800' : ''
              }`}
              aria-label={t('navigation.profile')}
            >
              <User className={`w-6 h-6 ${dir === 'rtl' ? 'ml-4' : 'mr-4'} flex-shrink-0`} aria-hidden="true" />
              <span>{t('navigation.profile')}</span>
            </Link>
            
            <Link
              to="/settings"
              className={`flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                location.pathname === '/settings' ? 'bg-gray-100 dark:bg-gray-800' : ''
              }`}
              aria-label={t('navigation.settings')}
            >
              <Settings className={`w-6 h-6 ${dir === 'rtl' ? 'ml-4' : 'mr-4'} flex-shrink-0`} aria-hidden="true" />
              <span>{t('navigation.settings')}</span>
            </Link>
          </div>

          {/* Settings and Logout group */}
          <div className="p-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              aria-label={t('auth.logout')}
            >
              <LogOut className={`w-6 h-6 ${dir === 'rtl' ? 'ml-4' : 'mr-4'} flex-shrink-0`} aria-hidden="true" />
              <span>{t('auth.logout')}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-30">
        <div className="grid grid-cols-5 h-16">
          <Link
            to="/"
            className={`col-span-1 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              location.pathname === '/' ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
            aria-label={t('navigation.home')}
          >
            <Home className="w-6 h-6" aria-hidden="true" />
          </Link>
          
          <Link
            to="/notifications"
            className={`col-span-1 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              location.pathname === '/notifications' ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
            aria-label={t('navigation.notifications')}
          >
            <Bell className="w-6 h-6" aria-hidden="true" />
          </Link>
          
          <Link
            to="/profile"
            className={`col-span-1 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              location.pathname === '/profile' ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
            aria-label={t('navigation.profile')}
          >
            <User className="w-6 h-6" aria-hidden="true" />
          </Link>
          
          <Link
            to="/settings"
            className={`col-span-1 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              location.pathname === '/settings' ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
            aria-label={t('navigation.settings')}
          >
            <Settings className="w-6 h-6" aria-hidden="true" />
          </Link>

          <button
            onClick={handleLogout}
            className="col-span-1 flex items-center justify-center text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            aria-label={t('auth.logout')}
          >
            <LogOut className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </>
  );
}