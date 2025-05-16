import axios from 'axios';
import { API_URL } from '@/config/constants';

export interface DashboardData {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: {
    orderId: string;
    customerName: string;
    totalAmount: number;
    status: 'pending' | 'shipping' | 'delivered' | 'cancelled';
    createdAt: string;
  }[];
  topProducts: {
    productId: string;
    productName: string;
    quantitySold: number;
    revenue: number;
  }[];
  revenueByMonth: {
    month: string;
    revenue: number;
  }[];
}

export const farmerDashboardService = {
  getDashboardData: async (token: string): Promise<DashboardData> => {
    const response = await axios.get(`${API_URL}/farmer/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
}; 