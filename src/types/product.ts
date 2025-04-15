export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  originInfo: string;
  qrCode: string;
  status: 'pending' | 'approved' | 'rejected';
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  farmerId: number;
  farmerName: string;
  farmerEmail: string;
  farmerPhone: string;
  reviewReason: string | null;
  reviewDate: string | null;
  reviewedBy: string | null;
}

export interface ProductSearchResponse {
  products: Product[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ProductSearchRequest {
  page: number;
  size: number;
  status?: 'pending' | 'approved' | 'rejected';
  farmerName?: string;
  category?: string;
}

export interface ProductReviewRequest {
  productId: number;
  status: 'approved' | 'rejected';
  reason: string;
}

export interface ProductUpdateRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  originInfo?: string;
  imageUrls?: string[];
  editReason: string;
} 