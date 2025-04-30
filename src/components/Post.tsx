import React, { memo, useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, Trash } from 'lucide-react';
import { PostService } from '../services/postservice';
import { CommentService } from '../services/comment';
import { checkForBullying } from '../utils/contentModeration';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { ShareModal } from './ShareModal';
import { toast } from 'react-hot-toast';
import { CustomToast } from './Toast';
import { useQuery } from '@tanstack/react-query';
import { PostType } from '../types';
import { NotificationService } from '../services/notification'; // تأكد من أنك استوردت NotificationService

interface PostProps {
  post: PostType;
}

export const Post = memo(function Post({ post }: PostProps) {
  const [localPosts, setLocalPosts] = useState<PostType[]>([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(post.isLikedByMe);
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [localNewComments, setLocalNewComments] = useState<any[]>([]);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [togglingLike, setTogglingLike] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null); // إضافة الردود على التعليقات
  const [replyContent, setReplyContent] = useState('');
  
  const [showToast, setShowToast] = useState(false);  // إضافة حالة showToast لعرض الإشعار
  const [toastMessage, setToastMessage] = useState('');  // رسالة الإشعار
  const [toastType, setToastType] = useState<'success' | 'error'>('success');  // نوع الإشعار

  const { incrementBullyingAttempts } = useAuth();
  const { dir } = useLanguage();
  const { t } = useTranslation();

  const { data: serverComments = [], isLoading: loadingComments, isError: errorLoadingComments } = useQuery({
    queryKey: ['comments', post.id],
    queryFn: () => CommentService.getComments(post.id),
  });

  const allComments = [...serverComments, ...localNewComments];

  const handleLike = async () => {
    try {
      setTogglingLike(true);
      if (isLiked) {
        await PostService.unlikePost(post.id);
        setLocalLikes(prev => prev - 1);
        setIsLiked(false);
      } else {
        await PostService.likePost(post.id);
        setLocalLikes(prev => prev + 1);
        setIsLiked(true);
      }

      // إرسال إشعار للمستخدم الذي كتب المنشور
      if (post.userId) {
        await NotificationService.sendNotification(post.userId, `أعجب بـ منشورك`);
      }

    } catch (err) {
      setToastMessage("حدث خطأ أثناء تسجيل الإعجاب");
      setToastType('error');
      setShowToast(true);
    } finally {
      setTogglingLike(false);
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
      setSubmittingComment(true);
      const newComment = await CommentService.createComment(post.id, comment);
      setLocalNewComments((prev) => [...prev, newComment]);
      setComment('');
      setShowCommentBox(false);

      // إرسال إشعار للمستخدم الذي كتب المنشور
      if (post.userId) {
        await NotificationService.sendNotification(post.userId, `علق على منشورك`);
      }

    } catch (err) {
      setError(t('post.errorGeneric'));
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingTo) return;

    const bullyingCheck = await checkForBullying(replyContent);
    if (bullyingCheck.hasBullying) {
      incrementBullyingAttempts();
      setError(t('post.errorBullying'));
      return;
    }

    try {
      const newReply = await CommentService.replyToComment(replyingTo, post.id, replyContent);
      setLocalNewComments((prev) => {
        return prev.map(comment => 
          comment.id === replyingTo 
            ? { ...comment, replies: [...comment.replies, newReply] } 
            : comment
        );
      });
      setReplyContent('');
      setReplyingTo(null);

      // إرسال إشعار للمستخدم الذي كتب التعليق
      await NotificationService.sendNotification(replyingTo, `رد على تعليقك`);

    } catch (err) {
      setError(t('post.errorGeneric'));
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleDelete = async () => {
    try {
      await PostService.deletePost(post.id);

      // حذف البوست من الـ local state فورًا
      setLocalPosts(prevPosts => prevPosts.filter(item => item.id !== post.id));

      setToastMessage("تم حذف البوست بنجاح");
      setToastType('success');
      setShowToast(true);
    } catch (err) {
      setToastMessage("حدث خطأ أثناء حذف البوست");
      setToastType('error');
      setShowToast(true);
    }
  };

  return (
    <>
      <article className="py-6 px-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className={`flex items-start ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-4`}>
          <div className="flex-shrink-0">
            <img
              src={post.author.avatar}
              alt={post.author.name}
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
                disabled={togglingLike}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{localLikes}</span>
              </button>

              <button
                onClick={() => setShowCommentBox(!showCommentBox)}
                className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                aria-label={t('post.commentButton')}
                disabled={submittingComment}
              >
                <MessageCircle className="w-5 h-5" />
                <span>{allComments.length}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors"
                aria-label={t('share.sharePost')}
              >
                <Share className="w-5 h-5" />
                <span>{t('share.share')}</span>
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
                aria-label={t('post.deleteButton')}
              >
                <Trash className="w-5 h-5" />
                <span>{t('post.delete')}</span>
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
                  disabled={submittingComment}
                  dir={dir}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!comment.trim() || submittingComment}
                    className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    {submittingComment ? t('common.loading') : t('post.submitComment')}
                  </button>
                </div>
              </form>
            )}

            {allComments.length > 0 && (
              <div className="mt-4 space-y-4">
                {allComments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium truncate">{comment.author.name}</span>
                        <span className="text-sm text-gray-500 truncate">@{comment.author.username}</span>
                      </div>
                      <p className="text-gray-900 dark:text-gray-100 mt-1">{comment.content}</p>
                      {/* إضافة ردود داخل التعليق */}
                      <button
                        onClick={() => setReplyingTo(comment.id)}
                        className="text-blue-500 text-sm"
                      >
                        {t('post.reply')}
                      </button>
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

      {/* Custom Toast Notification */}
      <CustomToast
        show={showToast}  // Show notification when needed
        message={toastMessage}  // Set the message dynamically
        type={toastType}  // Type of notification (success/error)
        onClose={() => setShowToast(false)}  // Close the notification when clicked
      />
    </>
  );
});
