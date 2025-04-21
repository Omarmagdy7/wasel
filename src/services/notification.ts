// src/services/notificationService.ts

import axios from 'axios';

export const getNotifications = async () => {
  const response = await axios.get('/api/Notification');
  return response.data;
};
