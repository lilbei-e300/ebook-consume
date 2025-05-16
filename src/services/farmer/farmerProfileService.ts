import axios from 'axios';
import { API_URL } from '@/config/constants';

export interface FarmerProfile {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  farmName: string;
  farmAddress: string;
  certification: string;
  bio: string;
  imageUrl: string | null;
  status: string | null;
  createdAt: string;
  updatedAt: string;
  statistics: {
    totalProducts: number;
    totalOrders: number;
    totalReviews: number;
    averageRating: number;
  };
}

export interface UpdateProfileRequest {
  fullName: string;
  phone: string;
  address: string;
  email: string;
  farmName: string;
  farmAddress: string;
  certification: string;
  bio: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const farmerProfileService = {
  // Lấy thông tin profile
  getProfile: async (token: string): Promise<FarmerProfile> => {
    const response = await axios.get(`${API_URL}/farmer/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  },

  // Cập nhật thông tin profile
  updateProfile: async (data: UpdateProfileRequest, token: string): Promise<FarmerProfile> => {
    const response = await axios.put(`${API_URL}/farmer/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.data;
  },

  // Thay đổi mật khẩu
  changePassword: async (data: ChangePasswordRequest, token: string): Promise<void> => {
    await axios.post(`${API_URL}/farmer/profile/change-password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  },

  // Cập nhật ảnh đại diện
  updateAvatar: async (file: File, token: string): Promise<FarmerProfile> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(`${API_URL}/farmer/profile/update-avatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.data;
  }
}; 