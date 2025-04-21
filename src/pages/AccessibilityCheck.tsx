import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Languages, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

interface AccessibilityCheckProps {
  onResponse: (isVisuallyImpaired: boolean) => void;
}

function AccessibilityCheck({ onResponse }: AccessibilityCheckProps) {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // تبديل اللغة (عربي/إنجليزي)
  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  // قراءة السؤال عند التحميل
  useEffect(() => {
    const text = t('accessibility.question');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'ar' ? 'ar-SA' : 'en-US';
    window.speechSynthesis.speak(utterance);
  }, [language, t]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 sm:p-6">
      {/* عناصر التحكم بالثيم واللغة */}
      <div className="fixed top-4 right-4 flex items-center gap-2 z-50 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
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
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* البطاقة الرئيسية */}
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">
          {t('accessibility.question')}
        </h1>
        
        <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
          {t('accessibility.description')}
        </p>

        <div className="space-y-4">
          <button
            onClick={() => {
              onResponse(true);
              navigate('/signup');
            }}
            className="
              w-full px-8 py-4 text-lg font-semibold text-white 
              bg-[#00695C] hover:bg-[#004D43]
              rounded-xl shadow-md hover:shadow-lg 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]
              transition-colors
            "
            aria-label={t('accessibility.yes')}
          >
            {t('accessibility.yes')}
          </button>
          <button
            onClick={() => {
              onResponse(false);
              navigate('/signup');
            }}
            className="
              w-full px-8 py-4 text-lg font-semibold text-white 
              bg-[#EF6C00] hover:bg-[#E65100]
              rounded-xl shadow-md hover:shadow-lg 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF6C00]
              transition-colors
            "
            aria-label={t('accessibility.no')}
          >
            {t('accessibility.no')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccessibilityCheck;
