// src/components/CreatePost.tsx

import React, { useState } from 'react';
import { Send, Image as ImageIcon } from 'lucide-react';
import { checkForBullying } from '../utils/contentModeration';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { ImageUpload } from './ImageUpload';
import { toast } from 'react-hot-toast';
import { CustomToast } from './Toast';
import { PostService } from '../services/postservice';

interface CreatePostProps {
  onPostCreated?: () => void;
}

export function CreatePost({ onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const { user, incrementBullyingAttempts } = useAuth();
  const { dir } = useLanguage();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const bullyingCheck = await checkForBullying(content);
    if (bullyingCheck.hasBullying) {
      incrementBullyingAttempts();
      setError(t('post.errorBullying'));
      return;
    }

    try {
      setIsSubmitting(true);
      await PostService.createPost({ content, image: image || undefined });

      toast.custom((t) => (
        <CustomToast
          message="تم النشر بنجاح ✅"
          type="success"
          onClose={() => toast.dismiss(t.id)}
        />
      ));
      

      setContent('');
      setImage(null);
      setShowImageUpload(false);
      onPostCreated?.();
    } catch (err) {
      console.error('Failed to create post:', err);
      toast.custom((t) => (
        <CustomToast
          message="تم النشر بنجاح ✅"
          type="success"
          onClose={() => toast.dismiss(t.id)}
        />
      ));
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSelect = (file: File) => {
    setImage(file);
  };

  const handleImageRemove = () => {
    setImage(null);
    setShowImageUpload(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="p-4">
        <div className={`flex items-start ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-3`}>
          <img
            src={user?.avatarUrl || 'https://via.placeholder.com/48'}
            alt={t('profile.avatar')}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('post.createPlaceholder')}
              className={`w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                dir === 'rtl' ? 'text-right' : 'text-left'
              }`}
              rows={3}
              aria-label={t('post.createPlaceholder')}
              dir={dir}
            />

            {showImageUpload && (
              <div className="mt-3">
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  onImageRemove={handleImageRemove}
                  maxSizeMB={5}
                  compact
                />
              </div>
            )}

            {error && (
              <p className={`text-red-500 text-sm mt-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`} role="alert">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={`flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700`}>
        <div>
          {!showImageUpload && (
            <button
              type="button"
              onClick={() => setShowImageUpload(true)}
              className="p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
              aria-label={t('post.addImage')}
            >
              <ImageIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className={`px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center ${
            dir === 'rtl' ? 'space-x-reverse' : ''
          } space-x-2`}
          aria-label={t('post.postButton')}
        >
          <Send className={`w-5 h-5 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} aria-hidden="true" />
          <span>{isSubmitting ? t('post.posting') : t('post.postButton')}</span>
        </button>
      </div>
    </form>
  );
}
