// src/components/FollowButton.tsx

import React, { useState } from 'react';
import followingService from '../services/follow';

interface FollowButtonProps {
  userId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    try {
      const input = { userId };
      const result = isFollowing
        ? await followingService.cancelFollow(input)
        : await followingService.sendFollow(input);
      setIsFollowing(!isFollowing);
      alert(result.message);
    } catch (error) {
      alert('حدث خطأ. يرجى المحاولة لاحقًا.');
    }
  };

  return (
    <button onClick={handleFollow}>
      {isFollowing ? 'إلغاء المتابعة' : 'متابعة'}
    </button>
  );
};

export default FollowButton;
