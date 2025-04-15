export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  role: 'admin' | 'farmer' | 'transporter' | 'consumer';
  status: 'active' | 'locked' | 'pending';
  createdAt: string;
  address?: string;
}

export interface UserSearchParams {
  page: number;
  size: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  keyword?: string;
  role?: string;
  status?: string;
}

export interface UserSearchResponse {
  users: User[];
  totalElements: number;
  totalPages: number;
}

export interface UpdateUserInfoRequest {
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
}

export interface UpdateUserStatusRequest {
  userId: number;
  status: 'active' | 'locked' | 'pending';
  reason: string;
} 