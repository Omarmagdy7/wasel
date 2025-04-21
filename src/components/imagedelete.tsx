// src/components/ImageDelete.tsx

import React, { useState } from 'react';
import imageService from '../services/image';

const ImageDelete: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  const handleDelete = async () => {
    try {
      const result = await imageService.deleteImage();
      setMessage(result.message);
    } catch (error) {
      setMessage('حدث خطأ أثناء حذف الصورة.');
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>حذف الصورة</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageDelete;
