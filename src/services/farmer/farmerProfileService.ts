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
  getProfile: async (token: string): Promise<ApiResponse<FarmerProfile>> => {
    try {
      const response = await axios.get(`${API_URL}/farmer/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy thông tin profile');
    }
  },

  // Cập nhật thông tin profile
  updateProfile: async (data: UpdateProfileRequest, token: string): Promise<ApiResponse<FarmerProfile>> => {
    try {
      const response = await axios.put(`${API_URL}/farmer/profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Lỗi khi cập nhật thông tin profile');
    }
  },

  // Thay đổi mật khẩu
  changePassword: async (data: ChangePasswordRequest, token: string): Promise<ApiResponse<null>> => {
    try {
      const response = await axios.post(`${API_URL}/farmer/profile/change-password`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Lỗi khi thay đổi mật khẩu');
    }
  },

  // Cập nhật ảnh đại diện
  updateAvatar: async (image: File, token: string): Promise<ApiResponse<{ imageUrl: string }>> => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.post(`${API_URL}/farmer/profile/update-avatar`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Lỗi khi cập nhật ảnh đại diện');
    }
  }
}; 