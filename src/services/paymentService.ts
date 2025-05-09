import { API_URL } from '@/config';
import { api } from '@/services/api';

export interface VNPayPaymentRequest {
  amount: number;
  orderId: string;
  orderInfo: string;
  bankCode: string;
}

export interface VNPayPaymentResponse {
  code: number;
  message: string;
  data: {
    paymentUrl: string;
    transactionId: string;
    orderId: string;
    amount: string;
    bankCode: string;
    orderInfo: string;
    responseCode: string;
    message: string;
  };
}

export interface VNPayReturnResponse {
  code: number;
  message: string;
  data: string;
}

export const paymentService = {
  createVNPayPayment: async (data: VNPayPaymentRequest): Promise<VNPayPaymentResponse['data']> => {
    const response = await api.post('/consumer/payments/vnpay/create', data);
    return response.data;
  },

  handleVNPayReturn: async (queryParams: URLSearchParams): Promise<VNPayReturnResponse> => {
    const response = await api.get(`/consumer/payments/vnpay/return?${queryParams.toString()}`);
    return response.data;
  },

  checkPaymentStatus: async (transactionId: string): Promise<any> => {
    const response = await api.get(`/consumer/payments/vnpay/status/${transactionId}`);
    return response.data;
  },
}; 