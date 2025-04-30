// src/components/PostsList.tsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PostService } from '../services/postservice';
import { Post } from './Post';
import { LoadingSpinner } from './LoadingSpinner';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import type { Post as PostType } from '../types'; // تأكد النوع يحتوي على id, content, author, imageUrl

export const PostsList: React.FC = () => {
  const { t } = useTranslation();
  const { dir } = useLanguage();

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<PostType[], Error>({
    queryKey: ['posts'],
    queryFn: () => PostService.getPosts(), // ✅ الربط الفعلي
    staleTime: 60 * 1000, // دقيقة كـ cache
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-4" dir={dir}>
        {t('common.error')}: {error.message}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4" dir={dir}>
        {t('post.noPosts')}
      </p>
    );
  }

  return (
    <div dir={dir} className="space-y-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
