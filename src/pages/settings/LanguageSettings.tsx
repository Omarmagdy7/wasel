import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

function LanguageSettings() {
  const { language, setLanguage, dir } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className={`text-xl font-semibold mb-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
        {t('settings.language')}
      </h2>

      <div className="space-y-6">
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

        {/* Language Description */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-lg font-medium mb-2">
              {language === 'ar' ? 'معلومات اللغة' : 'Language Information'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ar' 
                ? 'تغيير اللغة سيؤثر على جميع النصوص والعناصر في التطبيق. سيتم تطبيق التغييرات فوراً.'
                : 'Changing the language will affect all text and elements in the application. Changes will be applied immediately.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguageSettings;