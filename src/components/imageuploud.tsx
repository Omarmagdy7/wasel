// src/components/ImageUpload.tsx

import React, { useState } from 'react';
import imageService from '../services/image';

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (image) {
      try {
        const result = await imageService.uploadImage(image);
        setMessage(result.message);
      } catch (error) {
        setMessage('حدث خطأ أثناء تحميل الصورة.');
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>تحميل الصورة</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUpload;
