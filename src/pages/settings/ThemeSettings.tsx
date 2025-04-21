import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon, Monitor } from 'lucide-react';

function ThemeSettings() {
  const { dir } = useLanguage();
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [themePreference, setThemePreference] = React.useState(theme === 'dark' ? 'dark' : 'light');

  const handleThemeChange = (newTheme: string) => {
    setThemePreference(newTheme);
    if (newTheme === 'dark' && theme !== 'dark') {
      toggleTheme();
    } else if (newTheme === 'light' && theme !== 'light') {
      toggleTheme();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className={`text-xl font-semibold mb-6 rtl-align`}>
        {t('settings.theme')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { id: 'light', icon: Sun },
          { id: 'dark', icon: Moon },
          { id: 'system', icon: Monitor }
        ].map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleThemeChange(id)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              themePreference === id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
            }`}
          >
            <Icon className="w-6 h-6 mx-auto mb-2" />
            <p className="font-medium">{t(`theme.${id}`)}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSettings;