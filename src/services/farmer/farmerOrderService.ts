import axios from 'axios';
import { API_URL } from '@/config/constants';

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  quantity: number;
  price: number;
  subTotal: number;
}

export interface FarmerOrder {
  id: number;
  orderCode: string;
  consumerName: string;
  consumerEmail: string;
  consumerPhone: string;
  totalAmount: number;
  status: 'pending' | 'shipping' | 'delivered' | 'cancelled';
  shippingAddress: string;
  phone: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  canConfirmDelivery: boolean;
}

export interface FarmerOrderSearchParams {
  orderCode?: string;
  status?: string;
  isHistory?: boolean;
  keyword?: string;
  page?: number;
  size?: number;
}

export interface FarmerOrderSearchResponse {
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
  orders: FarmerOrder[];
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const farmerOrderService = {
  getOrders: async (params: FarmerOrderSearchParams, token: string): Promise<FarmerOrderSearchResponse> => {
    try {
      const response = await axios.get(`${API_URL}/farmer/orders`, {
        params,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  getOrderDetail: async (id: number, token: string): Promise<FarmerOrder> => {
    try {
      const response = await axios.get(`${API_URL}/farmer/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  updateOrderStatus: async (id: number, status: string, token: string): Promise<FarmerOrder> => {
    try {
      const response = await axios.put(
        `${API_URL}/farmer/orders/${id}/status`,
        { status },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
}; 