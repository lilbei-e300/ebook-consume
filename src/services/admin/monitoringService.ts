import axios from 'axios';
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

export const adminMonitoringService = {
  // Lấy dữ liệu doanh số
  getSalesData: async (params: {
    startDate: string;
    endDate: string;
    period: string;
    region: string;
    category: string;
  }) => {
    const response = await api.post('/admin/monitoring/sales', params);
    return response.data;
  },

  // Lấy dữ liệu đơn hàng
  getOrdersData: async (params: {
    startDate: string;
    endDate: string;
    period: string;
    status: string;
  }) => {
    const response = await api.post('/admin/monitoring/orders', params);
    return response.data;
  },

  // Lấy dữ liệu thị trường
  getMarketTrends: async (params: {
    startDate: string;
    endDate: string;
    category: string;
  }) => {
    const response = await api.post('/admin/monitoring/market-trends', params);
    return response.data;
  },

  // Lấy dữ liệu hiệu suất hệ thống
  getSystemPerformance: async (params: {
    startDate: string;
    endDate: string;
    period: string;
  }) => {
    const response = await api.post('/admin/monitoring/performance', params);
    return response.data;
  }
}; 