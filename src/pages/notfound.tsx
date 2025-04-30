// src/pages/NotFound.tsx

import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function NotFound() {
  const { dir } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8 text-center">
        {dir === 'rtl' ? 'عذرًا، لم نتمكن من العثور على الصفحة المطلوبة.' : 'Sorry, the page you are looking for does not exist.'}
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg transition-colors"
      >
        {dir === 'rtl' ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}
      </Link>
    </div>
  );
}

export default NotFound;
