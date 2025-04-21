// src/components/FollowersList.tsx

import React, { useEffect, useState } from 'react';
import followingService from '../services/follow';
import { UserPostDto } from '../services/followd';

const FollowersList: React.FC = () => {
  const [followers, setFollowers] = useState<UserPostDto[]>([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const data = await followingService.getFollowers();
        setFollowers(data);
      } catch (error) {
        alert('حدث خطأ في تحميل قائمة المتابعين.');
      }
    };

    fetchFollowers();
  }, []);

  return (
    <div>
      <h3>قائمة المتابعين</h3>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>{follower.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;
