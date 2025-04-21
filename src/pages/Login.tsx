import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Volume2, Moon, Sun, Languages } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 relative">
      {/* Theme and Language Controls */}
      <div className="fixed top-4 right-4 flex items-center gap-2 z-50 bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-lg backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <button
          onClick={handleLanguageChange}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={t('settings.selectLanguage')}
        >
          <Languages className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
          <h1 className="text-2xl font-bold">
            {language === 'ar' ? 'وِصال نقي' : 'Wesal Naquey'}
          </h1>
          <p className="mt-2 text-blue-100">
            {language === 'ar' ? 'مساحتك للتواصل النقي' : 'Your Space for Pure Connection'}
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex h-[600px]">
          {/* Info Section */}
          <div className={`w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 ${
            language === 'en' ? 'order-first' : 'order-last'
          }`}>
            <div className="h-full flex flex-col justify-center items-center text-white text-center">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">
                  {language === 'ar' ? 'وِصال نقي' : 'Wesal Naquey'}
                </h1>
                <p className="text-xl mb-6 text-blue-100">
                  {language === 'ar' ? 'مساحتك للتواصل النقي' : 'Your Space for Pure Connection'}
                </p>
                <p className="text-lg text-blue-100 max-w-md mx-auto leading-relaxed">
                  {t('auth.platformDescription')}
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-1/2 p-12">
            <div className="max-w-md mx-auto">
              <h2 className={`text-3xl font-bold text-gray-900 dark:text-white mb-8 
                ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {t('auth.login')}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Email Field */}
                <div>
                  <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <label htmlFor="email" className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2
                      ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {t('auth.email')}
                    </label>
                    <button
                      type="button"
                      onClick={() => speak(t('auth.emailInstructions'))}
                      className="p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 
                        rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      aria-label={t('auth.listenEmailInstructions')}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`block w-full px-4 py-3 rounded-lg
                        border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600
                        bg-white dark:bg-gray-800
                        shadow-sm hover:shadow-md focus:shadow-lg
                        transition-all duration-200
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        dark:text-white
                        ${language === 'ar' ? 'text-right' : 'text-left'}`}
                      dir={language === 'ar' ? 'rtl' : 'ltr'}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <label htmlFor="password" className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2
                      ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {t('auth.password')}
                    </label>
                    <button
                      type="button"
                      onClick={() => speak(t('auth.passwordInstructions'))}
                      className="p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 
                        rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      aria-label={t('auth.listenPasswordInstructions')}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`block w-full px-4 py-3 rounded-lg
                        border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600
                        bg-white dark:bg-gray-800
                        shadow-sm hover:shadow-md focus:shadow-lg
                        transition-all duration-200
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        dark:text-white
                        ${language === 'ar' ? 'text-right pr-4 pl-12' : 'text-left pl-4 pr-12'}`}
                      dir={language === 'ar' ? 'rtl' : 'ltr'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute inset-y-0 ${language === 'ar' ? 'left-0 pl-3' : 'right-0 pr-3'} 
                        flex items-center`}
                      aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded
                        cursor-pointer hover:border-blue-500 transition-colors"
                    />
                    <label 
                      htmlFor="remember-me" 
                      className={`block text-sm text-gray-700 dark:text-gray-300 
                        ${language === 'ar' ? 'mr-2' : 'ml-2'} cursor-pointer`}
                    >
                      {t('auth.rememberMe')}
                    </label>
                  </div>

                  <Link 
                    to="/forgot-password" 
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 
                      dark:text-blue-400 hover:underline transition-colors"
                  >
                    {t('auth.forgotPassword')}
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4
                    bg-blue-600 hover:bg-blue-700 
                    text-white font-medium
                    rounded-lg
                    shadow-md hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200"
                >
                  {isLoading ? t('auth.loggingIn') : t('auth.loginButton')}
                </button>
              </form>

              {/* Sign Up Link */}
              <p className={`mt-6 text-sm text-gray-600 dark:text-gray-400 
                ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {t('auth.dontHaveAccount')}{' '}
                <Link 
                  to="/signup" 
                  className="font-medium text-blue-600 hover:text-blue-500 
                    dark:text-blue-400 hover:underline transition-colors"
                >
                  {t('auth.signup')}
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Form */}
        <div className="lg:hidden p-6">
          <div className="max-w-md mx-auto">
            <h2 className={`text-2xl font-bold text-gray-900 dark:text-white mb-8 
              ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {t('auth.login')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Email Field */}
              <div>
                <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <label htmlFor="email-mobile" className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2
                    ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {t('auth.email')}
                  </label>
                  <button
                    type="button"
                    onClick={() => speak(t('auth.emailInstructions'))}
                    className="p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 
                      rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    aria-label={t('auth.listenEmailInstructions')}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email-mobile"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full px-4 py-3 rounded-lg
                      border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600
                      bg-white dark:bg-gray-800
                      shadow-sm hover:shadow-md focus:shadow-lg
                      transition-all duration-200
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      dark:text-white
                      ${language === 'ar' ? 'text-right' : 'text-left'}`}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <label htmlFor="password-mobile" className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2
                    ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {t('auth.password')}
                  </label>
                  <button
                    type="button"
                    onClick={() => speak(t('auth.passwordInstructions'))}
                    className="p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 
                      rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    aria-label={t('auth.listenPasswordInstructions')}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password-mobile"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full px-4 py-3 rounded-lg
                      border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600
                      bg-white dark:bg-gray-800
                      shadow-sm hover:shadow-md focus:shadow-lg
                      transition-all duration-200
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      dark:text-white
                      ${language === 'ar' ? 'text-right pr-4 pl-12' : 'text-left pl-4 pr-12'}`}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 ${language === 'ar' ? 'left-0 pl-3' : 'right-0 pr-3'} 
                      flex items-center`}
                    aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <input
                    id="remember-me-mobile"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded
                      cursor-pointer hover:border-blue-500 transition-colors"
                  />
                  <label 
                    htmlFor="remember-me-mobile" 
                    className={`block text-sm text-gray-700 dark:text-gray-300 
                      ${language === 'ar' ? 'mr-2' : 'ml-2'} cursor-pointer`}
                  >
                    {t('auth.rememberMe')}
                  </label>
                </div>

                <Link 
                  to="/forgot-password" 
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 
                    dark:text-blue-400 hover:underline transition-colors"
                >
                  {t('auth.forgotPassword')}
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4
                  bg-blue-600 hover:bg-blue-700 
                  text-white font-medium
                  rounded-lg
                  shadow-md hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200"
              >
                {isLoading ? t('auth.loggingIn') : t('auth.loginButton')}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className={`mt-6 text-sm text-gray-600 dark:text-gray-400 
              ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {t('auth.dontHaveAccount')}{' '}
              <Link 
                to="/signup" 
                className="font-medium text-blue-600 hover:text-blue-500 
                  dark:text-blue-400 hover:underline transition-colors"
              >
                {t('auth.signup')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;