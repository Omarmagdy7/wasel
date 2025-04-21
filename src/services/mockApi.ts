import { generateSamplePosts, sampleUsers } from '../lib/sampleData';
import type { Post, User } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize with 50 sample posts
let posts = generateSamplePosts(50);

export const mockApi = {
  async getPosts(page: number = 1, limit: number = 10): Promise<{ posts: Post[]; hasMore: boolean }> {
    await delay(800);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedPosts = posts.slice(start, end);
    return {
      posts: paginatedPosts,
      hasMore: end < posts.length
    };
  },

  async search(query: string): Promise<{ posts: Post[]; users: User[] }> {
    await delay(300);
    const lowercaseQuery = query.toLowerCase();
    
    const filteredPosts = posts.filter(post =>
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.author.name.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 5);

    const users = Array.from(new Set(
      posts.filter(post =>
        post.author.name.toLowerCase().includes(lowercaseQuery) ||
        post.author.username.toLowerCase().includes(lowercaseQuery)
      ).map(post => post.author)
    )).slice(0, 3);

    return { posts: filteredPosts, users };
  },

  async likePost(postId: string): Promise<void> {
    await delay(300);
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.likes += 1;
      post.isLikedByMe = true;
    }
  },

  async unlikePost(postId: string): Promise<void> {
    await delay(300);
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.likes -= 1;
      post.isLikedByMe = false;
    }
  },

  async createPost(content: string, image?: File | null): Promise<Post> {
    await delay(300);
    
    let imageUrl: string | undefined;
    if (image) {
      // Simulate image upload by using a placeholder URL
      imageUrl = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80';
    }

    const newPost: Post = {
      id: `post-${Date.now()}`,
      content,
      author: sampleUsers[0], // Use first user as current user
      createdAt: 'Just now',
      likes: 0,
      comments: [],
      isLikedByMe: false,
      image: imageUrl
    };
    
    posts = [newPost, ... posts];
    return newPost;
  },

  async createComment(postId: string, content: string): Promise<Comment> {
    await delay(300);
    const post = posts.find(p => p.id === postId);
    if (!post) {
      throw new Error('Post not found');
    }

    const newComment = {
      id: `comment-${Date.now()}`,
      content,
      author: sampleUsers[0], // Use first user as current user
      createdAt: 'Just now'
    };

    post.comments = [...post.comments, newComment];
    return newComment;
  },
  
  async sharePost(postId: string): Promise<{ success: boolean }> {
    await delay(300);
    // This is a mock function that simulates sharing a post
    // In a real implementation, this would track share metrics or create a share record
    return { success: true };
  }
};