import axios from 'axios';
import { API_URL } from '@/config/constants';
import { 
  FarmerProduct, 
  FarmerProductSearchParams, 
  FarmerProductSearchResponse,
  CreateFarmerProductRequest,
  UpdateFarmerProductRequest
} from '@/types/farmerProduct';

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface ProductSearchResponse {
  products: FarmerProduct[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

export const farmerProductService = {
  searchProducts: async (params: FarmerProductSearchParams, token: string): Promise<FarmerProductSearchResponse> => {
    try {
      const response = await axios.get(`${API_URL}/farmer/products`, {
        params,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProductDetail: async (id: number, token: string): Promise<FarmerProduct> => {
    try {
      const response = await axios.get(`${API_URL}/farmer/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  createProduct: async (data: CreateFarmerProductRequest, token: string): Promise<FarmerProduct> => {
    try {
      const response = await axios.post(`${API_URL}/farmer/products`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  updateProduct: async (id: number, data: UpdateFarmerProductRequest, token: string): Promise<FarmerProduct> => {
    try {
      const response = await axios.put(`${API_URL}/farmer/products/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  deleteProduct: async (id: number, token: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/farmer/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error;
    }
  },

  uploadProductImages: async (id: number, images: File[], token: string): Promise<string[]> => {
    try {
      const formData = new FormData();
      images.forEach(image => {
        formData.append('images', image);
      });

      const response = await axios.post(`${API_URL}/farmer/products/${id}/images`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  uploadImages: async (productId: number, files: File[], token: string) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const response = await axios.post<ApiResponse<FarmerProduct>>(
      `${API_URL}/farmer/products/${productId}/images`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }
}; 