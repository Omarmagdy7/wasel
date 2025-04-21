// src/components/UserProfile.tsx

import React, { useEffect, useState } from 'react';

interface UserProfileDto {
  id: string;
  name: string;
  email: string;
  // أضف الحقول الأخرى حسب الحاجة
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfileDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/User/MyProfile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('فشل في جلب الملف الشخصي');
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>جاري تحميل الملف الشخصي...</div>;
  }

  if (!profile) {
    return <div>لم يتم العثور على الملف الشخصي.</div>;
  }

  return (
    <div>
      <h2>ملفي الشخصي</h2>
      <p>الاسم: {profile.name}</p>
      <p>البريد الإلكتروني: {profile.email}</p>
      {/* أضف المزيد من التفاصيل حسب الحاجة */}
    </div>
  );
};

export default UserProfile;
