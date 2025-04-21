import React, { memo, useState } from 'react';
import { Heart, MessageCircle, Share } from 'lucide-react';
import type { Post as PostType } from '../types';
import { getAllPosts, likePost, unlikePost, createComment } from '../services/post';
import { checkForBullying } from '../utils/contentModeration';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { ShareModal } from './ShareModal';

interface PostProps {
  post: PostType;
}

export const Post = memo(function Post({ post }: PostProps) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(post.isLikedByMe);
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [localComments, setLocalComments] = useState(post.comments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const { incrementBullyingAttempts } = useAuth();
  const { dir } = useLanguage();
  const { t } = useTranslation();

  const handleLike = async () => {
    try {
      if (isLiked) {
        await unlikePost(post.id);
        setLocalLikes(prev => prev - 1);
        setIsLiked(false);
      } else {
        await likePost(post.id);
        setLocalLikes(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (err) {
      console.error('Failed to toggle like:', err);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const bullyingCheck = await checkForBullying(comment);
    if (bullyingCheck.hasBullying) {
      incrementBullyingAttempts();
      setError(t('post.errorBullying'));
      return;
    }

    try {
      setIsSubmitting(true);
      const newComment = await createComment(post.id, comment);
      setLocalComments([...localComments, newComment]);
      setComment('');
      setShowCommentBox(false);
    } catch (err) {
      setError(t('post.errorGeneric'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  return (
    <>
      <article className="py-6 px-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className={`flex items-start ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-4`}>
          <div className="flex-shrink-0">
            <img
              src={post.author.avatar}
              alt={`${post.author.name}'s profile picture`}
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className={`flex items-center space-x-2 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
              <h2 className="font-bold truncate text-gray-900 dark:text-white">{post.author.name}</h2>
              <span className="text-gray-500 truncate">@{post.author.username}</span>
              <span className="text-gray-500" aria-label={`Posted on ${post.createdAt}`}>
                · {post.createdAt}
              </span>
            </div>
            
            <p className={`mt-2 text-gray-900 dark:text-gray-100 break-words ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              {post.content}
            </p>

            {post.image && (
              <div className={`mt-3 relative ${!imageLoaded ? 'aspect-[16/9] bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg' : ''}`}>
                <img
                  src={post.image}
                  alt=""
                  className={`max-w-full rounded-lg ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    maxHeight: '512px',
                    width: '100%',
                    objectFit: 'contain',
                    aspectRatio: '16/9',
                    backgroundColor: imageLoaded ? 'transparent' : 'currentColor',
                  }}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            )}
            
            <div className={`mt-4 flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-8`}>
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 transition-colors ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'}`}
                aria-label={isLiked ? t('post.unlike') : t('post.like')}
                disabled={isSubmitting}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} aria-hidden="true" />
                <span>{localLikes}</span>
              </button>
              
              <button
                onClick={() => setShowCommentBox(!showCommentBox)}
                className={`flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors`}
                aria-label={t('post.commentButton')}
                disabled={isSubmitting}
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>{localComments.length}</span>
              </button>

              <button
                onClick={handleShare}
                className={`flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors`}
                aria-label={t('share.sharePost')}
              >
                <Share className="w-5 h-5" aria-hidden="true" />
                <span>{t('share.share')}</span>
              </button>
            </div>

            {showCommentBox && (
              <form onSubmit={handleComment} className="mt-4 space-y-3">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t('post.writeComment')}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  disabled={isSubmitting}
                  dir={dir}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!comment.trim() || isSubmitting}
                    className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? t('common.loading') : t('post.submitComment')}
                  </button>
                </div>
              </form>
            )}

            {localComments.length > 0 && (
              <div className="mt-4 space-y-4">
                {localComments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <img
                      src={comment.author.avatar}
                      alt={`${comment.author.name}'s profile picture`}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium truncate">{comment.author.name}</span>
                        <span className="text-sm text-gray-500 truncate">@{comment.author.username}</span>
                      </div>
                      <p className="text-gray-900 dark:text-gray-100 mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      <ShareModal 
        postId={post.id}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </>
  );
});
