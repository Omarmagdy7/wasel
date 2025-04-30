// src/components/CustomToast.tsx

import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// إضافة show هنا في CustomToastProps
interface CustomToastProps {
  show: boolean;             // إضافة show هنا
  message: string;
  type?: 'success' | 'error' | 'info';  // نوع الإشعار
  onClose?: () => void;       // وظيفة إغلاق الإشعار
}

export function CustomToast({ show, message, type = 'success', onClose }: CustomToastProps) {
  const { dir } = useLanguage();

  // إذا كانت show غير موجودة أو غير true، لن يتم عرض الإشعار
  if (!show) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-white" />,
    error: <XCircle className="w-5 h-5 text-white" />,
    info: <AlertCircle className="w-5 h-5 text-white" />
  };

  const colors = {
    success: 'bg-green-600 dark:bg-green-500',
    error: 'bg-red-600 dark:bg-red-500',
    info: 'bg-blue-600 dark:bg-blue-500'
  };

  return (
    <div 
      className={`fixed bottom-20 md:bottom-6 ${dir === 'rtl' ? 'right-4' : 'left-4'} z-50 animate-fade-in`}
      role="alert"
      aria-live="polite"
    >
      <div 
        className={`flex items-center p-4 rounded-lg shadow-xl ${colors[type]} text-white min-w-[300px] max-w-md transform transition-transform duration-300 ease-out`}
      >
        <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-3 flex-1 min-w-0`}>
          {icons[type]}  {/* استخدام الأيقونات حسب نوع الإشعار */}
          <p className="font-medium truncate">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`${dir === 'rtl' ? 'mr-3' : 'ml-3'} p-1.5 rounded-full hover:bg-white/20 transition-colors`}
            aria-label="Close notification"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
