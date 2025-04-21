import React, { useState, useRef } from 'react';
import { Image as ImageIcon, X, Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onImageRemove?: () => void;
  currentImage?: string;
  isCircular?: boolean;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  compact?: boolean;
}

export function ImageUpload({
  onImageSelect,
  onImageRemove,
  currentImage,
  isCircular = false,
  maxSizeMB = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  compact = false
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const { dir } = useLanguage();

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      setError(t('upload.invalidType'));
      return;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(t('upload.fileTooLarge', { size: maxSizeMB }));
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);

    onImageSelect(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageRemove?.();
  };

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleInputChange}
        className="sr-only"
        aria-label={t('upload.selectImage')}
      />

      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt={t('upload.preview')}
            className={`w-full object-cover ${
              isCircular 
                ? 'rounded-full aspect-square' 
                : compact 
                  ? 'rounded-lg h-24'
                  : 'rounded-lg max-h-64'
            }`}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-gray-900/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={t('upload.remove')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full flex flex-col items-center justify-center border-2 border-dashed 
            ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'} 
            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer
            ${isCircular 
              ? 'rounded-full aspect-square' 
              : compact 
                ? 'rounded-lg h-24'
                : 'rounded-lg p-8'
            }`}
          aria-label={t('upload.selectImage')}
        >
          <div className={`text-center ${compact ? 'p-2' : 'p-4'}`}>
            <Upload className={`${compact ? 'w-6 h-6' : 'w-8 h-8'} text-gray-400 mx-auto mb-2`} />
            <p className={`text-sm text-gray-500 dark:text-gray-400 ${compact ? 'text-xs' : ''}`}>
              {t('upload.clickToUpload')}
            </p>
            {!compact && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {t('upload.maxSize', { size: maxSizeMB })}
              </p>
            )}
          </div>
        </div>
      )}

      {error && (
        <p className={`mt-2 text-sm text-red-500 dark:text-red-400 ${
          dir === 'rtl' ? 'text-right' : 'text-left'
        }`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}