import axios from 'axios';
import { API_URL } from '@/config/constants';

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const authService = {
  logout: async (token: string): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await axios.post(`${API_URL}/auth/logout`, { token }, {
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