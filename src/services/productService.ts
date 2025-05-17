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

export interface ProductSearchResponse {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  suggestedCategories: string[];
}

export interface ProductSearchParams {
  keyword?: string;
  category?: string;
  origin?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  page?: number;
  size?: number;
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
  searchProducts: async (params: ProductSearchParams): Promise<ProductSearchResponse> => {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.keyword) queryParams.append('keyword', params.keyword);
      if (params.category) queryParams.append('category', params.category);
      if (params.origin) queryParams.append('origin', params.origin);
      if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
      if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortDirection) queryParams.append('sortDirection', params.sortDirection);
      if (params.page !== undefined) queryParams.append('page', params.page.toString());
      if (params.size) queryParams.append('size', params.size.toString());

      const response = await fetch(`${API_URL}/products/search?${queryParams.toString()}`);
      const data = await response.json();

      if (data.code !== 200) {
        throw new Error(data.message || 'Có lỗi xảy ra khi tìm kiếm sản phẩm');
      }

      return data.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },
  getProductDetail: async (id: number): Promise<ProductDetail> => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`);
      const data = await response.json();

      if (data.code !== 200) {
        throw new Error(data.message || 'Có lỗi xảy ra khi lấy thông tin sản phẩm');
      }

      return data.data;
    } catch (error) {
      console.error('Error getting product detail:', error);
      throw error;
    }
  }
}; 