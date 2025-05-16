"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MenuIcon, XIcon } from "@/icons/ui";
import { usePathname, useRouter } from "next/navigation";
import ConsumerUserDropdown from "@/components/header/ConsumerUserDropdown";
import { cartService } from "@/services/cartService";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (isAuthenticated) {
        try {
          const cart = await cartService.getCart();
          setCartCount(cart.totalItems);
        } catch (error) {
          console.error('Lỗi khi lấy số lượng giỏ hàng:', error);
          setCartCount(0);
        }
      }
    };

    fetchCartCount();

    // Thêm event listener để lắng nghe sự kiện cập nhật giỏ hàng
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [isAuthenticated]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push('/login');
    }
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white shadow-md dark:bg-gray-800 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-brand-500">
                EBook CS
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`${
                  isActive('/')
                    ? 'border-brand-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Trang chủ
              </Link>
              <Link
                href="/products"
                className={`${
                  isActive('/products')
                    ? 'border-brand-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Sản phẩm
              </Link>
              <Link
                href="/about"
                className={`${
                  isActive('/about')
                    ? 'border-brand-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Giới thiệu
              </Link>
              <Link
                href="/contact"
                className={`${
                  isActive('/contact')
                    ? 'border-brand-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Liên hệ
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* Tìm kiếm */}
            <form onSubmit={handleSearch} className="flex items-center mr-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-48 pl-3 pr-10 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </form>

            {/* Icon giỏ hàng */}
            <Link 
              href={isAuthenticated ? "/cart" : "/login"} 
              onClick={handleCartClick}
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-4"
              title={isAuthenticated ? "Giỏ hàng" : "Đăng nhập để xem giỏ hàng"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user?.role === 'consumer' ? (
                  <ConsumerUserDropdown />
                ) : (
                  <>
                    <span className="text-gray-700 dark:text-gray-300">
                      Xin chào, {user?.username}
                    </span>
                    <button
                      onClick={logout}
                      className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Đăng xuất
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500"
            >
              <span className="sr-only">Mở menu</span>
              {isMenuOpen ? (
                <XIcon className="block h-6 w-6" />
              ) : (
                <MenuIcon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`${
                isActive('/')
                  ? 'bg-brand-50 border-brand-500 text-brand-700'
                  : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Trang chủ
            </Link>
            <Link
              href="/products"
              className={`${
                isActive('/products')
                  ? 'bg-brand-50 border-brand-500 text-brand-700'
                  : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Sản phẩm
            </Link>
            <Link
              href="/about"
              className={`${
                isActive('/about')
                  ? 'bg-brand-50 border-brand-500 text-brand-700'
                  : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Giới thiệu
            </Link>
            <Link
              href="/contact"
              className={`${
                isActive('/contact')
                  ? 'bg-brand-50 border-brand-500 text-brand-700'
                  : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Liên hệ
            </Link>
            <Link
              href={isAuthenticated ? "/cart" : "/login"}
              onClick={handleCartClick}
              className={`${
                isActive('/cart')
                  ? 'bg-brand-50 border-brand-500 text-brand-700'
                  : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Giỏ hàng {cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            {isAuthenticated ? (
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <span className="text-gray-700 dark:text-gray-300">
                    Xin chào, {user?.username}
                  </span>
                </div>
                <div className="ml-3">
                  <button
                    onClick={logout}
                    className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 