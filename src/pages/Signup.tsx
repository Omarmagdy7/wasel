import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Volume2, HelpCircle } from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

function Signup() {
  const { isVisuallyImpaired } = useAccessibility();
  const { language, dir } = useLanguage();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'ar' ? 'ar-SA' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  // Auto-read form instructions for visually impaired users
  useEffect(() => {
    if (isVisuallyImpaired) {
      speak(t('auth.createAccount'));
    }
  }, [isVisuallyImpaired, language, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; password?: string } = {};

    if (!formData.name) {
      newErrors.name = t('auth.fullNameRequired');
    }

    if (!formData.email) {
      newErrors.email = t('auth.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.invalidEmail');
    }

    if (!formData.password) {
      newErrors.password = t('auth.passwordRequired');
    } else if (formData.password.length < 8) {
      newErrors.password = t('auth.passwordTooShort');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (isVisuallyImpaired) {
        const firstError = Object.values(newErrors)[0];
        if (firstError) {
          speak(firstError);
        }
      }
      return;
    }

    // Handle signup logic here
  };

  const formClasses = isVisuallyImpaired
    ? 'text-xl leading-relaxed'
    : 'text-base';

  return (
    <main className={`min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4 ${
      language === 'ar' ? 'font-kufi' : ''
    }`}>
      <div className="w-full max-w-md">
        <a href="#signup-form" className="skip-to-main">
          {t('accessibility.skipToForm')}
        </a>

        <div className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg ${
          isVisuallyImpaired ? 'border-4 border-primary-500' : ''
        }`}>
          <h1 className={`${isVisuallyImpaired ? 'text-3xl' : 'text-2xl'} font-bold mb-6 text-gray-900 dark:text-white ${
            dir === 'rtl' ? 'text-right' : 'text-left'
          }`}>
            {t('auth.createAccount')}
          </h1>

          <form id="signup-form" onSubmit={handleSubmit} noValidate className={formClasses}>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className={`block font-medium text-gray-700 dark:text-gray-300 mb-1 ${
                    dir === 'rtl' ? 'text-right' : 'text-left'
                  }`}
                >
                  {t('auth.fullName')}
                  {isVisuallyImpaired && (
                    <button
                      type="button"
                      onClick={() => speak(t('auth.fullNameInstructions'))}
                      className={`${dir === 'rtl' ? 'mr-2' : 'ml-2'} p-1 text-primary-500 hover:text-primary-600 transition-colors`}
                      aria-label={t('auth.listenInstructions')}
                    >
                      <Volume2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } ${isVisuallyImpaired ? 'text-xl' : ''} ${
                    dir === 'rtl' ? 'text-right' : 'text-left'
                  }`}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  dir={dir}
                />
                {errors.name && (
                  <p id="name-error" className={`mt-1 text-sm text-red-600 dark:text-red-400 ${
                    dir === 'rtl' ? 'text-right' : 'text-left'
                  }`} role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={`block font-medium text-gray-700 dark:text-gray-300 mb-1 ${
                    dir === 'rtl' ? 'text-right' : 'text-left'
                  }`}
                >
                  {t('auth.email')}
                  {isVisuallyImpaired && (
                    <button
                      type="button"
                      onClick={() => speak(t('auth.emailInstructions'))}
                      className={`${dir === 'rtl' ? 'mr-2' : 'ml-2'} p-1 text-primary-500 hover:text-primary-600 transition-colors`}
                      aria-label={t('auth.listenInstructions')}
                    >
                      <Volume2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } ${isVisuallyImpaired ? 'text-xl' : ''}`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  dir="ltr"
                />
                {errors.email && (
                  <p id="email-error" className={`mt-1 text-sm text-red-600 dark:text-red-400 ${
                    dir === 'rtl' ? 'text-right' : 'text-left'
                  }`} role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className={`block font-medium text-gray-700 dark:text-gray-300 mb-1 ${
                    dir === 'rtl' ? 'text-right' : 'text-left'
                  }`}
                >
                  {t('auth.password')}
                  {isVisuallyImpaired && (
                    <button
                      type="button"
                      onClick={() => speak(t('auth.passwordInstructions'))}
                      className={`${dir === 'rtl' ? 'mr-2' : 'ml-2'} p-1 text-primary-500 hover:text-primary-600 transition-colors`}
                      aria-label={t('auth.listenInstructions')}
                    >
                      <Volume2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } ${isVisuallyImpaired ? 'text-xl' : ''} ${
                      dir === 'rtl' ? 'text-right pr-4 pl-12' : 'text-left pl-4 pr-12'
                    }`}
                    aria-invalid={errors.password ? 'true' : 'false'}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    dir={dir}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 ${dir === 'rtl' ? 'left-0 pl-3' : 'right-0 pr-3'} 
                      flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400`}
                    aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <Eye className="w-5 h-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className={`mt-1 text-sm text-red-600 dark:text-red-400 ${
                    dir === 'rtl' ? 'text-right' : 'text-left'
                  }`} role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={`w-full py-3 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors ${
                  isVisuallyImpaired ? 'text-xl py-4' : ''
                }`}
              >
                {t('auth.createAccount')}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className={`text-gray-600 dark:text-gray-400 ${isVisuallyImpaired ? 'text-lg' : 'text-sm'}`}>
              {t('auth.alreadyHaveAccount')}{' '}
              <Link
                to="/login"
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 hover:underline"
              >
                {t('auth.login')}
              </Link>
            </p>
          </div>

          {isVisuallyImpaired && (
            <button
              type="button"
              onClick={() => speak(t('auth.needHelp'))}
              className={`mt-4 w-full py-2 px-4 text-gray-600 hover:text-gray-700 dark:text-gray-400 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg flex items-center justify-center ${
                isVisuallyImpaired ? 'text-lg' : 'text-sm'
              }`}
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              {t('auth.needHelp')}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default Signup;