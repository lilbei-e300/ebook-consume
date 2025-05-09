import { API_URL } from "@/config";

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  statusDescription: string;
  totalAmount: number;
  shippingAddress: string;
  consumerPhone: string;
  createdAt: string;
  updatedAt: string;
  farmerId: number;
  farmerName: string;
  farmName: string;
  farmerPhone: string;
  transporterId: number | null;
  transporterName: string;
  transporterPhone: string;
  currentLocation: string | null;
  estimatedDeliveryTime: string | null;
  transportUpdates: any[];
  items: OrderItem[];
  canCancel: boolean;
}

export interface OrderSummary {
  id: number;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  statusDescription: string;
  totalAmount: number;
  itemCount: number;
  primaryProductName: string;
  primaryProductImage: string;
  farmerName: string;
  farmName: string;
  createdAt: string;
  updatedAt: string;
  canCancel: boolean;
}

export interface OrderListResponse {
  orders: OrderSummary[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  pendingCount: number;
  confirmedCount: number;
  shippingCount: number;
  deliveredCount: number;
  cancelledCount: number;
}

export interface CancelOrderRequest {
  cancelReason: string;
}

export const orderService = {
  getOrders: async (params: {
    status?: string;
    keyword?: string;
    page?: number;
    size?: number;
  }): Promise<OrderListResponse> => {
    const queryParams = new URLSearchParams();
    if (params.status) queryParams.append('status', params.status);
    if (params.keyword) queryParams.append('keyword', params.keyword);
    if (params.page !== undefined) queryParams.append('page', params.page.toString());
    if (params.size !== undefined) queryParams.append('size', params.size.toString());

    const response = await fetch(`${API_URL}/track/orders?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Không thể lấy danh sách đơn hàng');
    }

    const data = await response.json();
    return data.data;
  },

  getOrderDetail: async (orderId: number): Promise<Order> => {
    const response = await fetch(`${API_URL}/track/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Không thể lấy thông tin đơn hàng');
    }

    const data = await response.json();
    return data.data;
  },

  cancelOrder: async (orderId: number, reason: string): Promise<void> => {
    const response = await fetch(`${API_URL}/track/orders/${orderId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ cancelReason: reason }),
    });

    if (!response.ok) {
      throw new Error('Không thể hủy đơn hàng');
    }
  },

  getOrderHistory: async (params: {
    page?: number;
    size?: number;
  }): Promise<OrderListResponse> => {
    const queryParams = new URLSearchParams();
    if (params.page !== undefined) queryParams.append('page', params.page.toString());
    if (params.size !== undefined) queryParams.append('size', params.size.toString());

    const response = await fetch(`${API_URL}/track/order-history?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Không thể lấy lịch sử đơn hàng');
    }

    const data = await response.json();
    return data.data;
  },
}; 