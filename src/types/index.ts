// Core domain types for Ituri News platform

export type Domain = {
  id: string;
  name: string;
  slug: string;
  color: 'emerald' | 'rose' | 'indigo' | 'slate' | 'amber' | 'purple';
};

export type Author = {
  id: string;
  fullName: string;
  avatarUrl?: string;
  bio?: string;
  email?: string;
};

export type Comment = {
  id: string;
  postId: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  content: string;
  createdAt: string;
  replies?: Comment[];
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  coverImageUrl?: string;
  domain: Domain;
  htmlContent: string;
  excerpt?: string;
  author: Author;
  createdAt: string;
  updatedAt?: string;
  status: 'draft' | 'published';
  viewCount: number;
  commentCount: number;
  comments: Comment[];
};

export type Role = 'reader' | 'journalist' | 'superadmin';

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  googleId?: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

// API response types
export type PostsResponse = {
  items: Post[];
  total: number;
  page: number;
  pageSize: number;
};

export type PostFilters = {
  domain?: string;
  author?: string;
  q?: string;
  page?: number;
  pageSize?: number;
};