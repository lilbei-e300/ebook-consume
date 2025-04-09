import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra token trong localStorage khi component mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
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
        const { token, user } = data.data;
        
        // Lưu thông tin đăng nhập
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Điều hướng dựa trên role
        const redirectPath = getRedirectPath(user.role);
        console.log('Redirecting to:', redirectPath); // Debug log
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
      case 'farmer':
      case 'transporter':
        return '/dashboard';
      case 'consumer':
        return '/';
      default:
        return '/';
    }
  };

  // Thêm useEffect để kiểm tra và điều hướng khi user thay đổi
  useEffect(() => {
    if (user) {
      const currentPath = window.location.pathname;
      const redirectPath = getRedirectPath(user.role);
      
      // Chỉ chuyển hướng nếu đang không ở đúng path
      if (currentPath !== redirectPath) {
        console.log('User changed, redirecting to:', redirectPath);
        router.push(redirectPath);
      }
    }
  }, [user, router]);

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          console.error('Logout failed');
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Xóa token và user khỏi state và localStorage
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Chuyển về trang login
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!token }}>
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