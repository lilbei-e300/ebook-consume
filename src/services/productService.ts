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

export interface ProductReview {
  id: number;
  consumerName: string;
  consumerAvatar: string | null;
  rating: number;
  comment: string;
  createdAt: string;
  farmerReply: string | null;
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  originInfo: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  averageRating: number | null;
  totalReviews: number;
  reviews: ProductReview[];
  farmer: {
    id: number;
    fullName: string;
    farmName: string;
    farmAddress: string;
    certification: string;
    bio: string;
    imageUrl: string | null;
    averageRating: number;
    totalProducts: number;
  };
  relatedProducts: {
    id: number;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    averageRating: number | null;
  }[];
  available: boolean;
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
  },
  getProductDetail: async (productId: number): Promise<ProductDetail> => {
    const response = await fetch(`${API_URL}/products/${productId}`);
    if (!response.ok) {
      throw new Error('Không thể lấy thông tin sản phẩm');
    }
    const data = await response.json();
    return data.data;
  }
}; 