import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'farmer' | 'consumer' | 'transporter';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    fullName: string;
    phone: string;
    role: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Hàm kiểm tra token hết hạn
  const checkTokenExpiration = () => {
    const storedToken = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    
    if (storedToken && tokenExpiration) {
      const expirationTime = parseInt(tokenExpiration);
      const currentTime = Date.now();
      
      if (currentTime >= expirationTime) {
        // Token đã hết hạn, đăng xuất
        logout();
      }
    }
  };

  // Khởi tạo state từ localStorage và kiểm tra token hết hạn
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Nếu có lỗi khi đọc localStorage, xóa dữ liệu không hợp lệ
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenExpiration');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Kiểm tra token hết hạn mỗi phút
  useEffect(() => {
    const interval = setInterval(checkTokenExpiration, 60000); // 60000ms = 1 phút
    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error('Vui lòng nhập đầy đủ thông tin đăng nhập');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại');
      }

      if (data.code === 200 && data.data) {
        const { token, user, expiresIn } = data.data;
        
        // Tính thời gian hết hạn của token
        const expirationTime = Date.now() + (expiresIn * 1000); // Chuyển đổi giây thành milliseconds
        
        // Lưu thông tin đăng nhập vào localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('tokenExpiration', expirationTime.toString());
        
        // Cập nhật state
        setToken(token);
        setUser(user);

        // Điều hướng dựa trên role
        const redirectPath = getRedirectPath(user.role);
        router.push(redirectPath);
      } else {
        throw new Error(data.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Hàm helper để lấy đường dẫn điều hướng
  const getRedirectPath = (role: string): string => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'farmer':
        return '/farmer/dashboard';
      case 'transporter':
        return '/transporter/dashboard';
      case 'consumer':
        return '/';
      default:
        return '/';
    }
  };

  // Thêm useEffect để kiểm tra và điều hướng khi user thay đổi
  useEffect(() => {
    if (user && !isLoading) {
      const currentPath = window.location.pathname;
      const redirectPath = getRedirectPath(user.role);
      
      // Chỉ chuyển hướng nếu đang ở trang login hoặc trang không tồn tại
      if (currentPath === '/login' || currentPath === '/') {
        router.push(redirectPath);
      }
    }
  }, [user, router, isLoading]);

  const register = async (data: {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    fullName: string;
    phone: string;
    role: string;
  }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.code !== 200) {
        throw new Error(responseData.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await authService.logout(token);
      }
      
      // Xóa dữ liệu khỏi localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiration');
      
      // Cập nhật state
      setToken(null);
      setUser(null);
      
      // Chuyển về trang login
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Ngay cả khi có lỗi, vẫn xóa dữ liệu và chuyển về trang login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiration');
      setToken(null);
      setUser(null);
      router.push('/login');
    }
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 