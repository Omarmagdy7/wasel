import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/user'; // ربط بالسيرفيس

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
        const data = await getAllUsers(); // استدعاء من service
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
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
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">قائمة المستخدمين</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg">
            <p className="text-gray-900 dark:text-white">الاسم: {user.name}</p>
            <p className="text-gray-600 dark:text-gray-300">البريد الإلكتروني: {user.email}</p>
            {/* أضف المزيد من التفاصيل حسب الحاجة */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
