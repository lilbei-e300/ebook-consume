import axios from 'axios';
import { API_URL } from '@/config/constants';

export interface UserSearchParams {
  keyword?: string;
  role?: string;
  status?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  page?: number;
  size?: number;
}

export interface UserStatusUpdate {
  userId: number;
  status: 'active' | 'locked' | 'pending';
  reason: string;
}

export interface UserInfoUpdate {
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

// Tạo instance axios với config mặc định
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để tự động thêm token vào header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const userService = {
  searchUsers: async (params: UserSearchParams) => {
    const response = await api.post('/admin/users/search', params);
    return response.data;
  },

  getUserDetail: async (userId: number) => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  updateUserStatus: async (data: UserStatusUpdate) => {
    const response = await api.put('/admin/users/status', data);
    return response.data;
  },

  updateUserInfo: async (data: UserInfoUpdate) => {
    const response = await api.put('/admin/users/info', data);
    return response.data;
  }
};

export default userService; 