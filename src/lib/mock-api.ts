// Mock API layer for Ituri News platform

import { mockDomains, mockAuthors, mockPosts, mockUsers } from './mock-data';
import { Post, PostsResponse, PostFilters, User, Domain, Author } from '../types';

// Simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockApi = {
  // Public endpoints
  async getDomains(): Promise<Domain[]> {
    await delay(200);
    return mockDomains;
  },

  async getAuthors(): Promise<Author[]> {
    await delay(200);
    return mockAuthors;
  },

  async getPosts(filters: PostFilters = {}): Promise<PostsResponse> {
    await delay(300);
    
    let filteredPosts = mockPosts.filter(post => post.status === 'published');
    
    // Apply filters
    if (filters.domain) {
      filteredPosts = filteredPosts.filter(post => post.domain.slug === filters.domain);
    }
    
    if (filters.author) {
      filteredPosts = filteredPosts.filter(post => post.author.id === filters.author);
    }
    
    if (filters.q) {
      const searchTerm = filters.q.toLowerCase();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt?.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort by date (newest first)
    filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    // Pagination
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 12;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    
    return {
      items: paginatedPosts,
      total: filteredPosts.length,
      page,
      pageSize
    };
  },

  async getPost(slug: string): Promise<Post | null> {
    await delay(200);
    return mockPosts.find(post => post.slug === slug && post.status === 'published') || null;
  },

  // Auth endpoints
  async signInWithGoogle(mockGoogleToken: string): Promise<{ user: User; token: string }> {
    await delay(1000);
    
    // Mock Google sign-in - in real app, this would verify the Google token
    const mockUser = mockUsers.find(u => u.googleId === mockGoogleToken) || mockUsers[3];
    
    return {
      user: mockUser,
      token: `mock_jwt_token_${mockUser.id}`
    };
  },

  async getMe(token: string): Promise<User | null> {
    await delay(200);
    
    // Extract user ID from mock token
    const userId = token.replace('mock_jwt_token_', '');
    return mockUsers.find(u => u.id === userId) || null;
  },

  // Journalist endpoints
  async getMyPosts(token: string): Promise<Post[]> {
    await delay(300);
    
    const user = await this.getMe(token);
    if (!user || (user.role !== 'journalist' && user.role !== 'superadmin')) {
      throw new Error('Unauthorized');
    }
    
    // Return all posts by this journalist (including drafts)
    return mockPosts.filter(post => post.author.id === mockAuthors.find(a => a.email === user.email)?.id);
  },

  async createPost(token: string, postData: Partial<Post>): Promise<Post> {
    await delay(500);
    
    const user = await this.getMe(token);
    if (!user || (user.role !== 'journalist' && user.role !== 'superadmin')) {
      throw new Error('Unauthorized');
    }
    
    const author = mockAuthors.find(a => a.email === user.email);
    if (!author) throw new Error('Author not found');
    
    const newPost: Post = {
      id: `p${Date.now()}`,
      slug: postData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'untitled',
      title: postData.title || 'Untitled',
      coverImageUrl: postData.coverImageUrl,
      domain: postData.domain || mockDomains[5], // Default to "Divers"
      htmlContent: postData.htmlContent || '',
      excerpt: postData.excerpt,
      author,
      createdAt: new Date().toISOString(),
      status: 'draft',
      viewCount: 0,
      commentCount: 0,
      comments: []
    };
    
    mockPosts.push(newPost);
    return newPost;
  },

  async updatePost(token: string, postId: string, updates: Partial<Post>): Promise<Post> {
    await delay(500);
    
    const user = await this.getMe(token);
    if (!user || (user.role !== 'journalist' && user.role !== 'superadmin')) {
      throw new Error('Unauthorized');
    }
    
    const postIndex = mockPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) throw new Error('Post not found');
    
    mockPosts[postIndex] = { ...mockPosts[postIndex], ...updates, updatedAt: new Date().toISOString() };
    return mockPosts[postIndex];
  },

  async publishPost(token: string, postId: string): Promise<Post> {
    return this.updatePost(token, postId, { status: 'published' });
  },

  // Superadmin endpoints
  async getUsers(token: string): Promise<User[]> {
    await delay(300);
    
    const user = await this.getMe(token);
    if (!user || user.role !== 'superadmin') {
      throw new Error('Unauthorized');
    }
    
    return mockUsers;
  },

  async updateUserRole(token: string, userId: string, role: User['role']): Promise<User> {
    await delay(500);
    
    const user = await this.getMe(token);
    if (!user || user.role !== 'superadmin') {
      throw new Error('Unauthorized');
    }
    
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) throw new Error('User not found');
    
    mockUsers[userIndex].role = role;
    return mockUsers[userIndex];
  }
};