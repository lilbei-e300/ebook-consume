import axios from 'axios';
import { API_URL } from '@/config/constants';
import { CustomerInteractionResponse, ApiResponse } from '@/types/customerInteraction';

interface ReplyReviewRequest {
  reviewId: number;
  content: string;
  isHighlighted: boolean;
}

interface SendMessageRequest {
  receiverId: number;
  content: string;
  orderId?: number;
  imageUrl?: string | null;
}

export const customerInteractionService = {
  getUnreadInteractions: async (token: string): Promise<CustomerInteractionResponse> => {
    try {
      const response = await axios.get<ApiResponse<CustomerInteractionResponse>>(
        `${API_URL}/farmer/customer-interaction/unread`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  replyReview: async (data: ReplyReviewRequest, token: string): Promise<void> => {
    try {
      await axios.post(
        `${API_URL}/farmer/customer-interaction/reply-review`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      throw error;
    }
  },

  sendMessage: async (data: SendMessageRequest, token: string): Promise<void> => {
    try {
      await axios.post(
        `${API_URL}/farmer/customer-interaction/send-message`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      throw error;
    }
  }
}; 