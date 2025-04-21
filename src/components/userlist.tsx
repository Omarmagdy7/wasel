// src/components/UsersList.tsx

import React, { useEffect, useState } from 'react';

interface ReturnUsersDto {
  id: string;
  name: string;
  email: string;
  // أضف الحقول الأخرى حسب الحاجة
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<ReturnUsersDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/User', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('فشل في جلب المستخدمين');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>جاري تحميل المستخدمين...</div>;
  }

  return (
    <div>
      <h2>قائمة المستخدمين</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>الاسم: {user.name}</p>
            <p>البريد الإلكتروني: {user.email}</p>
            {/* أضف المزيد من التفاصيل حسب الحاجة */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
