import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Heart, MessageCircle, UserPlus } from 'lucide-react';

function Notifications() {
  const { dir } = useLanguage();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <h1 className={`p-4 text-xl font-bold ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          {t('notifications.title')}
        </h1>
      </header>

      <div className="max-w-3xl mx-auto">
        <section className="p-4" aria-label={t('notifications.title')}>
          <div className="space-y-3">
            {/* Like Notification */}
            <article className={`group p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all ${
              dir === 'rtl' ? 'text-right' : 'text-left'
            }`}>
              <div className={`flex items-start ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-4`}>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-gray-800"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-pink-500 rounded-full p-1.5">
                    <Heart className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 dark:text-white leading-snug">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition-colors">Sarah Johnson</span>
                    {' '}
                    <span className="text-gray-600 dark:text-gray-300">{t('notifications.liked')}</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">2 {t('common.hoursAgo')}</p>
                </div>
              </div>
            </article>

            {/* Mention Notification */}
            <article className={`group p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all ${
              dir === 'rtl' ? 'text-right' : 'text-left'
            }`}>
              <div className={`flex items-start ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-4`}>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-gray-800"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1.5">
                    <MessageCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 dark:text-white leading-snug">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition-colors">Mike Chen</span>
                    {' '}
                    <span className="text-gray-600 dark:text-gray-300">{t('notifications.mentioned')}</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">4 {t('common.hoursAgo')}</p>
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                    Hey @johndoe, check out this new accessibility feature! 🎉
                  </div>
                </div>
              </div>
            </article>

            {/* Follow Notification */}
            <article className={`group p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all ${
              dir === 'rtl' ? 'text-right' : 'text-left'
            }`}>
              <div className={`flex items-start ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-4`}>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-gray-800"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5">
                    <UserPlus className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 dark:text-white leading-snug">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition-colors">Alex Rivera</span>
                    {' '}
                    <span className="text-gray-600 dark:text-gray-300">{t('notifications.followed')}</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">6 {t('common.hoursAgo')}</p>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Notifications;