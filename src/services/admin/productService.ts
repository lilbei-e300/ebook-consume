import axios from 'axios';
import { Product, ProductReviewRequest, ProductSearchRequest } from '@/types/product';
import { API_URL } from '@/config/constants';

// Tạo instance axios với config mặc định
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để tự động thêm token vào header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminProductService = {
  // Tìm kiếm sản phẩm
  searchProducts: async (params: ProductSearchRequest) => {
    const response = await api.post('/admin/products/search', params);
    return response.data;
  },

  // Xem chi tiết sản phẩm
  getProductDetail: async (productId: number) => {
    const response = await api.get(`/admin/products/${productId}`);
    return response.data;
  },

  // Duyệt/từ chối sản phẩm
  reviewProduct: async (data: ProductReviewRequest) => {
    const response = await api.post('/admin/products/review', data);
    return response.data;
  },

  // Chỉnh sửa sản phẩm
  updateProduct: async (productId: number, data: Partial<Product>) => {
    const response = await api.put(`/admin/products/${productId}`, data);
    return response.data;
  },

  // Xóa sản phẩm
  deleteProduct: async (productId: number, reason: string) => {
    const response = await api.delete('/admin/products', {
      data: { productId, reason }
    });
    return response.data;
  },

  // Kiểm tra nguồn gốc sản phẩm
  verifyProductOrigin: async (productId: number, isVerified: boolean, notes: string) => {
    const response = await api.post(
      `/admin/products/${productId}/verify-origin`,
      null,
      {
        params: { isVerified, notes }
      }
    );
    return response.data;
  }
}; 