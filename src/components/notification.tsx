// src/components/Notifications.tsx

import React, { useEffect, useState } from 'react';
import { getNotifications } from '../services/notification'; // تأكد من أن المسار صحيح
import { toast } from 'react-hot-toast';

interface Notification {
  id: string;
  message: string;
  createdAt: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // جلب الإشعارات من الـ API
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        // التعامل مع الأخطاء
        toast.error('حدث خطأ أثناء جلب الإشعارات');
        console.error('حدث خطأ أثناء جلب الإشعارات:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div>جاري تحميل الإشعارات...</div>;
  }

  return (
    <div>
      <h2>الإشعارات</h2>
      {notifications.length === 0 ? (
        <p>لا توجد إشعارات جديدة.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              <p>{notification.message}</p>
              <small>{new Date(notification.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
