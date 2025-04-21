import React, { useState } from 'react';
import { X, Copy, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Toast } from './Toast';

interface ShareModalProps {
  postId: string;
  onClose: () => void;
  isOpen: boolean;
}

export function ShareModal({ postId, onClose, isOpen }: ShareModalProps) {
  const { dir } = useLanguage();
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(false);

  if (!isOpen) return null;

  // Generate post URL
  const postUrl = `${window.location.origin}/post/${postId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

  const handleSocialShare = (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(t('share.twitterText'))}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('share.title')}
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={t('common.close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mb-6">
            <p className={`text-gray-600 dark:text-gray-400 mb-3 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              {t('share.description')}
            </p>
            
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-2 mb-4">
              <input
                type="text"
                value={postUrl}
                readOnly
                className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 dark:text-gray-300 text-sm"
              />
              <button
                onClick={handleCopyLink}
                className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                aria-label={t('share.copyLink')}
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className={`font-medium text-gray-900 dark:text-white mb-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              {t('share.shareOn')}
            </h4>
            
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleSocialShare('facebook')}
                className="flex flex-col items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors"
              >
                <Facebook className="w-6 h-6 mb-1" />
                <span className="text-sm">Facebook</span>
              </button>
              
              <button
                onClick={() => handleSocialShare('twitter')}
                className="flex flex-col items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors"
              >
                <Twitter className="w-6 h-6 mb-1" />
                <span className="text-sm">Twitter</span>
              </button>
              
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <LinkIcon className="w-6 h-6 mb-1" />
                <span className="text-sm">{t('share.copyLink')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Toast
        show={showToast}
        message={t('share.linkCopied')}
        type="success"
        onClose={() => setShowToast(false)}
      />
    </>
  );
}