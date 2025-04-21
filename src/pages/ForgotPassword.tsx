import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Volume2, Moon, Sun, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { language, setLanguage, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'ar' ? 'ar-SA' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError(t('auth.emailRequired'));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t('auth.invalidEmail'));
      return;
    }

    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError(t('auth.resetPasswordError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6">
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

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="mb-8">
            <Link
              to="/login"
              className={`inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors ${
                dir === 'rtl' ? 'space-x-reverse' : ''
              }`}
            >
              <ArrowLeft className={`w-5 h-5 ${dir === 'rtl' ? 'ml-2 rotate-180' : 'mr-2'}`} />
              <span>{t('auth.backToLogin')}</span>
            </Link>
          </div>

          <h1 className={`text-2xl font-bold mb-6 text-gray-900 dark:text-white ${
            dir === 'rtl' ? 'text-right' : 'text-left'
          }`}>
            {t('auth.forgotPasswordTitle')}
          </h1>

          {success ? (
            <div className="text-center">
              <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg">
                {t('auth.resetLinkSent')}
              </div>
              <Link
                to="/login"
                className="inline-block mt-4 text-blue-600 hover:text-blue-500 dark:text-blue-400 hover:underline"
              >
                {t('auth.backToLogin')}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className={`flex items-center justify-between ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
                      dir === 'rtl' ? 'text-right' : 'text-left'
                    }`}
                  >
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
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    error ? 'border-red-500' : 'border-gray-300'
                  }`}
                  dir="ltr"
                />
                {error && (
                  <p className={`mt-2 text-sm text-red-600 dark:text-red-400 ${
                    dir === 'rtl' ? 'text-right' : 'text-left'
                  }`} role="alert">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('auth.sendingResetLink') : t('auth.sendResetLink')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;