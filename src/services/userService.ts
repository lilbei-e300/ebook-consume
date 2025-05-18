import axios from 'axios';
import { API_URL } from '../config';

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  status: string;
  createdAt: string;
}

export interface UserSearchParams {
  keyword?: string;
  role?: string;
  status?: string;
  sortBy?: string;
  sortDirection?: string;
  page?: number;
  size?: number;
}

export interface UserStatusUpdate {
  userId: number;
  status: 'active' | 'pending' | 'locked';
  reason: string;
}

export interface UserInfoUpdate {
  userId: number;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface UserSearchResponse {
  users: User[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export const userService = {
  searchUsers: async (params: UserSearchParams, token: string): Promise<ApiResponse<UserSearchResponse>> => {
    try {
      const response = await axios.post(`${API_URL}/admin/users/search`, params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserDetail: async (userId: number, token: string): Promise<ApiResponse<User>> => {
    try {
      const response = await axios.get(`${API_URL}/admin/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUserStatus: async (data: UserStatusUpdate, token: string): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await axios.put(`${API_URL}/admin/users/${data.userId}/status?status=${data.status}`, null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUserInfo: async (data: UserInfoUpdate, token: string): Promise<ApiResponse<User>> => {
    try {
      const response = await axios.put(`${API_URL}/admin/users/info`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 