import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:justify-start"
      aria-label={t('settings.selectLanguage')}
    >
      <div className="w-6 flex justify-center">
        <Languages className="w-6 h-6" aria-hidden="true" />
      </div>
      <span className="hidden md:block ml-4">
        {language === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  );
}