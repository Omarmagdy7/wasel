// src/components/ImageDelete.tsx

import React from 'react';
import { deleteImage } from '../services/image'; // ✅ استدعاء الدالة بشكل مباشر
import { toast } from 'react-hot-toast';
import { CustomToast } from './Toast';

const ImageDelete: React.FC = () => {
  const handleDelete = async () => {
    try {
      const result = await deleteImage();
      toast.custom((t) => (
        <CustomToast
          message={result.message || 'تم حذف الصورة بنجاح ✅'}
          type="success"
          onClose={() => toast.dismiss(t.id)}
        />
      ));
    } catch (error) {
      console.error('Delete failed:', error);
      toast.custom((t) => (
        <CustomToast
          message="حدث خطأ أثناء حذف الصورة ❌"
          type="error"
          onClose={() => toast.dismiss(t.id)}
        />
      ));
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
      >
        حذف الصورة
      </button>
    </div>
  );
};

export default ImageDelete;
