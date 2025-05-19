import { API_URL } from "@/config";
import { ChatListResponse, MessageListResponse } from "@/types/message";

export const messageService = {
  // Lấy danh sách chat với nông dân
  getChatList: async (page: number = 0, size: number = 10): Promise<ChatListResponse> => {
    const response = await fetch(`${API_URL}/consumer/farmers/chat?page=${page}&size=${size}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Không thể tải danh sách tin nhắn');
    }

    const data = await response.json();
    return {
      farmers: data.farmers || [],
      totalUnread: data.totalUnread || 0,
      totalFarmers: data.totalFarmers || 0,
      currentPage: data.currentPage || 0,
      totalPages: data.totalPages || 0
    };
  },

  // Lấy chi tiết tin nhắn với một nông dân
  getMessages: async (farmerId: number, page: number = 0, size: number = 20): Promise<MessageListResponse> => {
    const response = await fetch(`${API_URL}/consumer/farmers/${farmerId}/messages?page=${page}&size=${size}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Không thể tải tin nhắn');
    }

    const data = await response.json();
    return {
      content: data.content || [],
      pageable: data.pageable || {
        pageNumber: 0,
        pageSize: size,
        sort: { empty: true, sorted: false, unsorted: true },
        offset: 0,
        paged: true,
        unpaged: false
      },
      last: data.last || true,
      totalElements: data.totalElements || 0,
      totalPages: data.totalPages || 0,
      numberOfElements: data.numberOfElements || 0,
      size: data.size || size,
      number: data.number || 0,
      sort: data.sort || { empty: true, sorted: false, unsorted: true },
      first: data.first || true,
      empty: data.empty || false
    };
  },

  // Gửi tin nhắn mới
  sendMessage: async (farmerId: number, content: string): Promise<void> => {
    const response = await fetch(`${API_URL}/consumer/farmers/${farmerId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Không thể gửi tin nhắn');
    }
  }
}; 