// src/pages/Profile.tsx

import React, { useEffect, useState } from 'react';
import { MapPin, Link as LinkIcon, Calendar, Camera, Edit } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Post } from '../components/Post';
import { useAuth } from '../contexts/AuthContext';
import { ImageUpload } from '../components/ImageUpload';
import { ImageCropper } from '../components/ImageCropper';
import { CustomToast } from '../components/Toast';
import { UserService } from '../services/user';
import { getUserProfile } from '../services/user';

function Profile() {
  const { dir } = useLanguage();
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();

  const [userPosts, setUserPosts] = useState<any[]>([]); // replace any with actual PostType if available
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showProfilePhotoUpload, setShowProfilePhotoUpload] = useState(false);
  const [showCoverPhotoUpload, setShowCoverPhotoUpload] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isProfilePhoto, setIsProfilePhoto] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfile(response);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfilePhotoClick = () => {
    setIsProfilePhoto(true);
    setShowProfilePhotoUpload(true);
  };

  const handleCoverPhotoClick = () => {
    setIsProfilePhoto(false);
    setShowCoverPhotoUpload(true);
  };

  const handleImageSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setIsCropping(true);
      setShowProfilePhotoUpload(false);
      setShowCoverPhotoUpload(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCropCancel = () => {
    setIsCropping(false);
    setSelectedImage(null);
  };

  const handleCropComplete = async (croppedBlob: Blob, previewUrl: string) => {
    try {
      const file = new File([croppedBlob], isProfilePhoto ? 'profile.jpg' : 'cover.jpg', { type: 'image/jpeg' });
      const safeUsername = (user as Partial<{ username: string }>).username || `${user?.firstName}${user?.lastName}`;
      const updatedUser = {
        name: `${user?.firstName} ${user?.lastName}`,
        username: safeUsername,
        email: user?.email || '',
        avatarFile: file,
      };
      if (isProfilePhoto) {
        await UserService.updateUserProfile(updatedUser);
        showSuccessToast(t('profile.profilePhotoUpdated'));
      } else {
        showSuccessToast(t('profile.coverPhotoUpdated'));
      }
      setIsCropping(false);
      setSelectedImage(null);
    } catch (error) {
      showErrorToast(t('profile.photoUpdateError'));
      setIsCropping(false);
      setSelectedImage(null);
    }
  };

  const showSuccessToast = (message: string) => {
    setToastMessage(message);
    setToastType('success');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const showErrorToast = (message: string) => {
    setToastMessage(message);
    setToastType('error');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (loading) return <div>{t('common.loading')}</div>;

  if (!profile) return <div>{t('profile.notFound')}</div>;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <h1 className={`p-4 text-xl font-bold ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('profile.title')}</h1>
      </header>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600 group">
            <button onClick={handleCoverPhotoClick} className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 opacity-0 group-hover:opacity-100" aria-label={t('profile.changeCoverPhoto')}>
              <div className="bg-white dark:bg-gray-800 p-2 rounded-full">
                <Edit className="w-8 h-8 text-blue-500" />
              </div>
            </button>
          </div>

          <div className="px-4 pb-6">
            <div className="relative -mt-20">
              <div className="relative group w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 bg-white dark:bg-gray-800 overflow-hidden">
                <img src={user?.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format'} alt={t('profile.avatar')} className="w-full h-full object-cover" />
                <button onClick={handleProfilePhotoClick} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 opacity-0 group-hover:opacity-100 rounded-full" aria-label={t('profile.changeProfilePhoto')}>
                  <Camera className="w-8 h-8 text-white" />
                </button>
              </div>
            </div>

            <div className={`mt-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{`${profile.firstName} ${profile.lastName}`}</h2>
                <p className="text-gray-600 dark:text-gray-400">@{(profile as any).username || `${profile.firstName}${profile.lastName}`}</p>
              </div>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Software developer & accessibility advocate. Building tools that make the web more inclusive.
              </p>
              <div className="mt-4 space-y-2">
                <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2 text-gray-600 dark:text-gray-400`}>
                  <MapPin className="w-4 h-4 flex-shrink-0" /><span>San Francisco, CA</span>
                </div>
                <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2 text-gray-600 dark:text-gray-400`}>
                  <LinkIcon className="w-4 h-4 flex-shrink-0" /><a href="#" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:underline">github.com/johndoe</a>
                </div>
                <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2 text-gray-600 dark:text-gray-400`}>
                  <Calendar className="w-4 h-4 flex-shrink-0" /><span>{t('profile.joined')} {t('profile.joinedDate')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-6">
          <h2 className={`px-4 text-lg font-semibold text-gray-900 dark:text-white ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('profile.posts')}</h2>
          <div className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
            {userPosts.map((post) => (
              <Post key={post.id} post={{ ...post, userId: user?.id || '' }} />
            ))}
          </div>
        </div>
      </div>

      {showProfilePhotoUpload && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t('profile.updateProfilePhoto')}</h3>
            <ImageUpload onImageSelect={handleImageSelect} onImageRemove={() => setShowProfilePhotoUpload(false)} isCircular={true} maxSizeMB={2} />
            <div className="mt-4 flex justify-end">
              <button onClick={() => setShowProfilePhotoUpload(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">{t('common.cancel')}</button>
            </div>
          </div>
        </div>
      )}

      {showCoverPhotoUpload && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t('profile.updateCoverPhoto')}</h3>
            <ImageUpload onImageSelect={handleImageSelect} onImageRemove={() => setShowCoverPhotoUpload(false)} isCircular={false} maxSizeMB={5} />
            <div className="mt-4 flex justify-end">
              <button onClick={() => setShowCoverPhotoUpload(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">{t('common.cancel')}</button>
            </div>
          </div>
        </div>
      )}

      {isCropping && selectedImage && (
        <ImageCropper image={selectedImage} onCrop={handleCropComplete} onCancel={handleCropCancel} aspectRatio={isProfilePhoto ? 1 : 16 / 9} circular={isProfilePhoto} />
      )}

      <CustomToast show={showToast} message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
    </main>
  );
}

export default Profile;
