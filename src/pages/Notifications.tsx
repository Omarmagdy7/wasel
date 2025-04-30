import React, { useEffect, useState } from 'react';
import { getNotifications } from '../services/notification'; // استيراد خدمة جلب الإشعارات
import { toast } from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Heart, MessageCircle, UserPlus } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  createdAt: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { dir } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // جلب الإشعارات من الـ API
        const data = await getNotifications();
        setNotifications(data); // تخزين الإشعارات في الحالة
      } catch (error) {
        // عرض رسالة خطأ عند فشل الجلب
        toast.error('حدث خطأ أثناء جلب الإشعارات');
        console.error('حدث خطأ أثناء جلب الإشعارات:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications(); // استدعاء الدالة لجلب الإشعارات
  }, []);

  if (loading) {
    return <div>جاري تحميل الإشعارات...</div>;
  }

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
            {/* استعراض الإشعارات */}
            {notifications.map((notification) => (
              <article
                key={notification.id}
                className={`group p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all ${
                  dir === 'rtl' ? 'text-right' : 'text-left'
                }`}
              >
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
                      <span className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition-colors">
                        Sarah Johnson
                      </span>
                      {' '}
                      <span className="text-gray-600 dark:text-gray-300">{t('notifications.liked')}</span>
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Notifications;
