import axios from 'axios';
import { API_URL } from '@/config';
import { useAuth } from '@/context/AuthContext';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  originInfo: string;
  qrCode: string | null;
  status: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface SellableProductsResponse {
  products: Product[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

export interface SellingProductsResponse {
  products: Product[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface SellProductRequest {
  productId: number;
  note: string;
}

export interface UpdateSellStatusRequest {
  productId: number;
  newStatus: 'draft' | 'pending' | 'approved' | 'rejected';
  note: string;
}

export const productSellService = {
  // Lấy danh sách sản phẩm có thể đăng bán
  getSellableProducts: async (
    params: {
      keyword?: string;
      category?: string;
      page?: number;
      size?: number;
    } = {}
  ) => {
    const token = localStorage.getItem('token');
    const response = await axios.get<ApiResponse<SellableProductsResponse>>(
      `${API_URL}/farmer/products/sellable`,
      { 
        params,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data.data;
  },

  // Đăng bán sản phẩm
  sellProduct: async (data: SellProductRequest) => {
    const token = localStorage.getItem('token');
    const response = await axios.post<ApiResponse<any>>(
      `${API_URL}/farmer/products/sell`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  },

  // Cập nhật trạng thái đăng bán
  updateSellStatus: async (data: UpdateSellStatusRequest) => {
    const token = localStorage.getItem('token');
    const response = await axios.put<ApiResponse<any>>(
      `${API_URL}/farmer/products/sell/status`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  },

  // Xem trạng thái đăng bán của sản phẩm
  getProductSellStatus: async (productId: number) => {
    const token = localStorage.getItem('token');
    const response = await axios.get<ApiResponse<any>>(
      `${API_URL}/farmer/products/${productId}/sell-status`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  },

  // Lấy danh sách sản phẩm đang bán
  getSellingProducts: async (
    params: {
      sellStatus?: 'pending' | 'approved' | 'rejected';
      keyword?: string;
      page?: number;
      size?: number;
    } = {}
  ) => {
    const token = localStorage.getItem('token');
    const response = await axios.get<ApiResponse<SellingProductsResponse>>(
      `${API_URL}/farmer/products/selling`,
      { 
        params,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data.data;
  },
}; 