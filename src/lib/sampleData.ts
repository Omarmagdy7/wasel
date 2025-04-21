import { Post, Comment, User } from '../types';

// Sample users with diverse backgrounds
export const sampleUsers: User[] = [
  {
    id: 'user1',
    name: 'Sarah Johnson',
    username: 'sarahj',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'user2',
    name: 'محمد أحمد',
    username: 'mohammed.a',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'user3',
    name: 'Alex Rivera',
    username: 'alexr',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'user4',
    name: 'فاطمة علي',
    username: 'fatima.ali',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'user5',
    name: 'David Kim',
    username: 'davidk',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

// Sample comments for posts
const generateComments = (postId: string): Comment[] => {
  return [
    {
      id: `comment-${postId}-1`,
      content: 'Great post! Really insightful.',
      author: sampleUsers[Math.floor(Math.random() * sampleUsers.length)],
      createdAt: '2h ago'
    },
    {
      id: `comment-${postId}-2`,
      content: 'Thanks for sharing this!',
      author: sampleUsers[Math.floor(Math.random() * sampleUsers.length)],
      createdAt: '1h ago'
    }
  ];
};

// Sample posts with diverse content
export const generateSamplePosts = (count: number): Post[] => {
  const posts: Post[] = [];
  const topics = ['tech', 'design', 'development', 'accessibility', 'web'];
  const images = [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  ];

  const englishContent = [
    'Just launched our new accessibility features! 🚀 #a11y #webdev',
    'Working on improving our platform\'s performance! 💻',
    'Excited to share my latest project using React and TypeScript! 🎉',
    'Great discussion about web accessibility today. We need to make the web more inclusive! 🌐',
    'Check out this amazing design system I\'ve been working on! 🎨'
  ];

  const arabicContent = [
    'أطلقنا للتو ميزات إمكانية الوصول الجديدة! 🚀 #a11y',
    'نعمل على تحسين أداء منصتنا! 💻',
    'متحمس لمشاركة مشروعي الأخير باستخدام React و TypeScript! 🎉',
    'نقاش رائع حول إمكانية الوصول على الويب اليوم. نحتاج إلى جعل الويب أكثر شمولاً! 🌐',
    'ألقوا نظرة على نظام التصميم المذهل الذي كنت أعمل عليه! 🎨'
  ];

  for (let i = 0; i < count; i++) {
    const user = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
    const isArabic = Math.random() > 0.5;
    const content = isArabic 
      ? arabicContent[Math.floor(Math.random() * arabicContent.length)]
      : englishContent[Math.floor(Math.random() * englishContent.length)];
    
    const hasImage = Math.random() > 0.7;
    const image = hasImage ? images[Math.floor(Math.random() * images.length)] : undefined;
    
    const hoursAgo = Math.floor(Math.random() * 24);
    const likes = Math.floor(Math.random() * 200);
    
    posts.push({
      id: `post-${i + 1}`,
      content,
      author: user,
      createdAt: `${hoursAgo}h ago`,
      likes,
      comments: generateComments(`post-${i + 1}`),
      isLikedByMe: Math.random() > 0.5,
      image
    });
  }

  return posts;
};