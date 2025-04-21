import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ToastProps {
  show: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export function Toast({ show, message, type = 'success', duration = 5000, onClose }: ToastProps) {
  const { dir } = useLanguage();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

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
          {icons[type]}
          <p className="font-medium truncate">{message}</p>
        </div>
        <button
          onClick={onClose}
          className={`${dir === 'rtl' ? 'mr-3' : 'ml-3'} p-1.5 rounded-full hover:bg-white/20 transition-colors`}
          aria-label="Close notification"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}