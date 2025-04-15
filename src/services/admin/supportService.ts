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

export interface SupportTicket {
  id: string;
  title: string;
  content: string;
  status: 'PENDING' | 'PROCESSING' | 'RESOLVED' | 'CLOSED';
  type: 'COMPLAINT' | 'SUGGESTION' | 'QUESTION' | 'OTHER';
  createdAt: string;
  updatedAt: string;
  userId: string;
  userName: string;
  userEmail: string;
}

export interface SupportTicketResponse {
  tickets: SupportTicket[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export const supportService = {
  // Lấy danh sách ticket
  getSupportTickets: async (page: number = 0, size: number = 10, status?: string, type?: string) => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...(status && { status }),
      ...(type && { type }),
    });

    const response = await api.get(`/admin/support/tickets?${params}`);
    return response.data.data;
  },

  // Cập nhật trạng thái ticket
  updateTicketStatus: async (ticketId: string, status: string) => {
    const response = await api.put(`/admin/support/tickets/${ticketId}/status`, { status });
    return response.data;
  },

  // Gửi phản hồi cho ticket
  replyToTicket: async (ticketId: string, content: string) => {
    const response = await api.post(`/admin/support/tickets/${ticketId}/reply`, { content });
    return response.data;
  }
}; 