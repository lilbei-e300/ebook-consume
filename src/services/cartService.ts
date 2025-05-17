import { API_URL } from "@/config";

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string | null;
  farmerName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export const cartService = {
  addToCart: async (request: AddToCartRequest): Promise<Cart> => {
    const response = await fetch(`${API_URL}/cart/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Không thể thêm sản phẩm vào giỏ hàng');
    }

    const data = await response.json();
    window.dispatchEvent(new Event('cartUpdated'));
    return data.data;
  },

  getCart: async (): Promise<Cart> => {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        // Trả về giỏ hàng rỗng cho mọi trường hợp lỗi
        return {
          id: 0,
          userId: 0,
          items: [],
          totalAmount: 0,
          totalItems: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      }

      const data = await response.json();
      return data.data;
    } catch {
      // Trả về giỏ hàng rỗng nếu có lỗi
      return {
        id: 0,
        userId: 0,
        items: [],
        totalAmount: 0,
        totalItems: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
  },

  updateCartItem: async (productId: number, quantity: number): Promise<Cart> => {
    const response = await fetch(`${API_URL}/cart/items/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Không thể cập nhật giỏ hàng');
    }

    const data = await response.json();
    window.dispatchEvent(new Event('cartUpdated'));
    return data.data;
  },

  removeCartItem: async (productId: number): Promise<Cart> => {
    const response = await fetch(`${API_URL}/cart/items/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Không thể xóa sản phẩm khỏi giỏ hàng');
    }

    const data = await response.json();
    window.dispatchEvent(new Event('cartUpdated'));
    return data.data;
  },

  clearCart: async (): Promise<Cart> => {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Không thể xóa giỏ hàng');
    }

    const data = await response.json();
    window.dispatchEvent(new Event('cartUpdated'));
    return data.data;
  },
}; 