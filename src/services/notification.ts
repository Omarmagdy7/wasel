// src/services/notificationService.ts

import axios from 'axios';

// دالة لجلب الإشعارات
export const getNotifications = async () => {
  try {
    const response = await axios.get('/api/Notification', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // إضافة التوكن للمصادقة
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error('حدث خطأ أثناء جلب الإشعارات');
  }
};

// دالة لإرسال إشعار
export const sendNotification = async (userId: string, message: string) => {
  try {
    const response = await axios.post(
      '/api/Notification',
      {
        userId,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // إضافة التوكن للمصادقة
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw new Error('حدث خطأ أثناء إرسال الإشعار');
  }
};

// تصدير جميع الخدمات
export const NotificationService = {
  getNotifications,
  sendNotification,
};

