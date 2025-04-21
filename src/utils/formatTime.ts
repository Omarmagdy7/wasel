import { i18n } from 'i18next';

export function formatTimeAgo(date: string | Date, t: i18n['t']): string {
  const now = new Date();
  const postDate = typeof date === 'string' ? new Date(date) : date;
  const diffInMinutes = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) {
    return t('common.justNow');
  }
  
  if (diffInMinutes < 60) {
    return t('common.timeFormat', { time: `${diffInMinutes} ${t('common.minutesAgo')}` });
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return t('common.timeFormat', { time: `${diffInHours} ${t('common.hoursAgo')}` });
  }
  
  // For older posts, return the actual date
  return postDate.toLocaleDateString(i18n.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}