export interface FarmerProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  originInfo: string;
  qrCode: string;
  status: 'approved' | 'pending' | 'rejected';
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FarmerProductSearchParams {
  page?: number;
  size?: number;
  keyword?: string;
  category?: string;
  status?: string;
}

export interface FarmerProductSearchResponse {
  code: number;
  message: string;
  data: {
    products: FarmerProduct[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface CreateFarmerProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  originInfo: string;
  imageUrls: string[];
}

export interface UpdateFarmerProductRequest extends CreateFarmerProductRequest {
  id: number;
} 