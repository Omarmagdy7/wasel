import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon, Languages } from 'lucide-react';

function AppearanceSettings() {
  const { language, setLanguage, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className={`text-xl font-semibold mb-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
        {t('settings.appearance')}
      </h2>

      <div className="space-y-8">
        {/* Language Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className={`text-lg font-medium mb-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            {t('settings.selectLanguage')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setLanguage('ar')}
              className={`p-4 rounded-lg border-2 transition-colors flex items-center ${
                language === 'ar'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">ع</span>
              </div>
              <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <p className="font-medium">العربية</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">اللغة العربية</p>
              </div>
            </button>
            
            <button
              onClick={() => setLanguage('en')}
              className={`p-4 rounded-lg border-2 transition-colors flex items-center ${
                language === 'en'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">En</span>
              </div>
              <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <p className="font-medium">English</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">English language</p>
              </div>
            </button>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className={`text-lg font-medium mb-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            {t('settings.theme')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => theme === 'dark' && toggleTheme()}
              className={`p-4 rounded-lg border-2 transition-colors flex items-center ${
                theme === 'light'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/30 rounded-full mr-3">
                <Sun className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <p className="font-medium">{t('theme.light')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('theme.switchToLight')}</p>
              </div>
            </button>
            
            <button
              onClick={() => theme === 'light' && toggleTheme()}
              className={`p-4 rounded-lg border-2 transition-colors flex items-center ${
                theme === 'dark'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 rounded-full mr-3">
                <Moon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <p className="font-medium">{t('theme.dark')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('theme.switchToDark')}</p>
              </div>
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className={`text-lg font-medium mb-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            {t('settings.preview')}
          </h3>
          
          <div className={`p-4 bg-gray-50 dark:bg-gray-900 rounded-lg ${
            dir === 'rtl' ? 'text-right' : 'text-left'
          }`}>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {language === 'ar' ? 'معاينة المظهر' : 'Appearance Preview'}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {t('settings.sampleText')}
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                {t('settings.sampleButton')}
              </button>
              <a href="#" className="px-4 py-2 text-blue-500 hover:underline">
                {t('settings.sampleLink')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppearanceSettings;