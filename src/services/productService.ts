import axios from 'axios';
import { API_URL } from '@/config/constants';

export interface Product {
  id: number;
  name: string;
  shortDescription: string;
  price: number;
  imageUrl: string | null;
  category: string;
  originInfo: string;
  farmerName: string;
  averageRating: number | null;
  reviewCount: number;
  stock: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const productService = {
  getSuggestedProducts: async (limit: number = 10): Promise<Product[]> => {
    try {
      const response = await axios.get<ApiResponse<Product[]>>(`${API_URL}/products/suggested`, {
        params: { limit }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching suggested products:', error);
      return [];
    }
  }
}; 