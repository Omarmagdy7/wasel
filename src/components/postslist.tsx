// src/components/PostsList.tsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../services/post';
import { Post } from './Post';
import { LoadingSpinner } from './LoadingSpinner';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import type { Post as PostType } from '../types'; // تأكد إن النوع فيه author.id

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
    queryFn: getAllPosts,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">{t('common.error')}: {error.message}</p>;

  return (
    <div dir={dir} className="space-y-6">
      {posts?.length ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p className="text-gray-500">{t('post.noPosts')}</p>
      )}
    </div>
  );
};
