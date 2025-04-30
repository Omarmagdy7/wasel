// src/components/ErrorBoundary.tsx

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundaryInner extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryFallback />
      );
    }

    return this.props.children;
  }
}

function ErrorBoundaryFallback() {
  const { dir } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <h1 className="text-4xl font-bold mb-4">
        {dir === 'rtl' ? 'حدث خطأ غير متوقع' : 'Something Went Wrong'}
      </h1>
      <p className="text-lg mb-8 text-center">
        {dir === 'rtl' ? 'نأسف، حدث خطأ أثناء تحميل الصفحة.' : 'Sorry, an unexpected error occurred.'}
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

export function ErrorBoundary({ children }: Props) {
  return <ErrorBoundaryInner>{children}</ErrorBoundaryInner>;
}
