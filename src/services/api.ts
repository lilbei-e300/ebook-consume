import { API_URL } from '@/config';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

export const api = {
  get: async (url: string) => {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Có lỗi xảy ra');
    }

    return response.json();
  },

  post: async (url: string, data: Record<string, unknown>) => {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Có lỗi xảy ra');
    }

    return response.json();
  },
}; 