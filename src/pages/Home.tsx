import React, { useState, useEffect } from 'react';
import { CreatePost } from '../components/CreatePost';
import { Post } from '../components/Post';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { mockApi } from '../services/mockApi';
import type { Post as PostType } from '../types';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

const POSTS_PER_PAGE = 10;

function Home() {
  const [postsList, setPostsList] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { dir } = useLanguage();
  const { t } = useTranslation();

  const loadPosts = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await mockApi.getPosts(page, POSTS_PER_PAGE);
      setPostsList(prev => [...prev, ...response.posts]);
      setHasMore(response.hasMore);
      setPage(prev => prev + 1);
    } catch (err) {
      setError(t('errors.failedToLoadPosts'));
      console.error('Failed to load posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const lastPostRef = useInfiniteScroll(loadPosts, hasMore && !loading);

  if (error) {
    return (
      <div className="p-4 text-red-500" role="alert">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16 md:pb-0">
      {/* Header with sticky and backdrop */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <h1 className={`p-4 text-xl font-bold text-gray-800 dark:text-gray-100 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          {t('navigation.home')}
        </h1>
      </header>

      {/* Main Content Container */}
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        {/* Create Post Card */}
        <div className="mt-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <CreatePost
              onPostCreated={() => {
                setPage(1);
                setPostsList([]);
                loadPosts();
              }}
            />
          </div>
        </div>

        {/* Posts Feed Card */}
        <section
          aria-label={t('post.feedTitle')}
          className="bg-white dark:bg-gray-800 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700"
        >
          {postsList.length === 0 && loading ? (
            <div className="p-4 flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : postsList.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {t('post.noPosts')}
            </div>
          ) : (
            postsList.map((post, index) => (
              <div
                key={post.id}
                ref={index === postsList.length - 1 ? lastPostRef : undefined}
              >
                <Post post={post} />
              </div>
            ))
          )}
          {loading && postsList.length > 0 && (
            <div className="p-4 text-center text-gray-500" role="status">
              <LoadingSpinner />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Home;
