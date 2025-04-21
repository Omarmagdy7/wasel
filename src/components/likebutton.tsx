// src/components/LikeButton.tsx

import React, { useState, useEffect } from 'react';
import likeService from '../services/like';

interface LikeButtonProps {
  postId?: string;
  commentId?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, commentId }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(0);

  useEffect(() => {
    const fetchLikes = async () => {
      if (postId) {
        const users = await likeService.getUsersLikePost(postId);
        setLikesCount(users.length);
        // تحقق مما إذا كان المستخدم الحالي قد أعجب بالمنشور
      } else if (commentId) {
        const users = await likeService.getUsersLikeComment(commentId);
        setLikesCount(users.length);
        // تحقق مما إذا كان المستخدم الحالي قد أعجب بالتعليق
      }
    };

    fetchLikes();
  }, [postId, commentId]);

  const handleLike = async () => {
    if (liked) {
      if (postId) {
        await likeService.cancelPostLike(postId);
      } else if (commentId) {
        await likeService.cancelCommentLike(commentId);
      }
      setLikesCount((prev) => prev - 1);
    } else {
      if (postId) {
        await likeService.likePost(postId);
      } else if (commentId) {
        await likeService.likeComment(commentId);
      }
      setLikesCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <button onClick={handleLike}>
      {liked ? '❤️' : '🤍'} {likesCount}
    </button>
  );
};

export default LikeButton;
