import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

function NotificationSettings() {
  const { dir } = useLanguage();
  const { t } = useTranslation();
  const [settings, setSettings] = React.useState({
    emailNotifications: true,
    pushNotifications: true,
    mentions: true,
    follows: true,
    likes: true,
    comments: true
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className={`text-xl font-semibold mb-6 rtl-align`}>
        {t('settings.notifications')}
      </h2>

      <div className="space-y-6">
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} className="flex items-start justify-between gap-4">
            <div className={`flex-1 ${dir === 'rtl' ? 'text-right order-2' : 'text-left order-1'}`}>
              <p className="font-medium">{t(`settings.notifications_${key}`)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t(`settings.notifications_${key}_description`)}
              </p>
            </div>
            <div className={dir === 'rtl' ? 'order-1' : 'order-2'}>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleToggle(key as keyof typeof settings)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationSettings;