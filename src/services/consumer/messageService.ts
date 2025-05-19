import axios from 'axios';
import { API_URL } from '@/config/constants';
import { Message, SendMessageRequest, ApiResponse } from '@/types/message';

export const messageService = {
  sendMessage: async (farmerId: number, data: SendMessageRequest, token: string): Promise<Message> => {
    try {
      const response = await axios.post<ApiResponse<Message>>(
        `${API_URL}/consumer/farmers/${farmerId}/messages`,
        data,
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