import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useTranslation } from 'react-i18next';
import { Type, Contrast } from 'lucide-react';

function AccessibilitySettings() {
  const { dir } = useLanguage();
  const { t } = useTranslation();
  const { 
    largeFontSize, 
    setLargeFontSize,
    highContrast,
    setHighContrast
  } = useAccessibility();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className={`text-xl font-semibold mb-6 ${
        dir === 'rtl' ? 'text-right' : 'text-left'
      }`}>
        {t('settings.accessibility')}
      </h2>

      <div className="space-y-6">
        {/* Font Size Setting */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between gap-4">
            <div className={`flex-1 ${dir === 'rtl' ? 'text-right order-2' : 'text-left order-1'}`}>
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {t('settings.largeFontSize')}
                </h3>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {t('settings.largeFontSizeDescription')}
              </p>
            </div>
            <div className={dir === 'rtl' ? 'order-1' : 'order-2'}>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={largeFontSize}
                  onChange={(e) => setLargeFontSize(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Font Size Preview */}
          <div className={`mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg ${
            dir === 'rtl' ? 'text-right' : 'text-left'
          }`}>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {t('settings.preview')}
            </h4>
            <p className={`text-gray-600 dark:text-gray-400 ${largeFontSize ? 'text-lg' : 'text-base'}`}>
              {t('settings.sampleText')}
            </p>
          </div>
        </div>

        {/* High Contrast Setting */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between gap-4">
            <div className={`flex-1 ${dir === 'rtl' ? 'text-right order-2' : 'text-left order-1'}`}>
              <div className="flex items-center gap-2">
                <Contrast className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {t('settings.highContrast')}
                </h3>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {t('settings.highContrastDescription')}
              </p>
            </div>
            <div className={dir === 'rtl' ? 'order-1' : 'order-2'}>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* High Contrast Preview */}
          <div className={`mt-4 ${highContrast ? 'high-contrast' : ''}`}>
            <div className={`p-4 bg-gray-50 dark:bg-gray-900 rounded-lg ${
              dir === 'rtl' ? 'text-right' : 'text-left'
            }`}>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                {t('settings.preview')}
              </h4>
              <div className="space-y-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  {t('settings.sampleButton')}
                </button>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('settings.sampleText')}
                </p>
                <a href="#" className="text-blue-500 hover:underline">
                  {t('settings.sampleLink')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessibilitySettings;