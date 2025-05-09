"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { cartService, Cart } from '@/services/cartService';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { paymentService } from '@/services/paymentService';

export default function CartPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'VNPAY'>('COD');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [currentTransactionId, setCurrentTransactionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated) {
        if (!isLoading) {
          router.push('/login');
        }
        return;
      }

      try {
        const data = await cartService.getCart();
        setCart(data);
      } catch (error) {
        console.error('Lỗi khi lấy giỏ hàng:', error);
        if (error instanceof Error && error.message !== 'Giỏ hàng trống') {
          toast.error('Không thể lấy thông tin giỏ hàng');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const handlePaymentReturn = async () => {
      const vnpResponseCode = searchParams.get('vnp_ResponseCode');
      const vnpTransactionStatus = searchParams.get('vnp_TransactionStatus');
      
      if (vnpResponseCode && vnpTransactionStatus) {
        try {
          setPaymentStatus('processing');
          const result = await paymentService.handleVNPayReturn(searchParams);
          
          if (result.code === 200) {
            setPaymentStatus('success');
            toast.success(result.message);
            // Refresh giỏ hàng sau khi thanh toán thành công
            const updatedCart = await cartService.getCart();
            setCart(updatedCart);
            // Phát ra sự kiện cập nhật giỏ hàng để cập nhật số lượng trên navbar
            window.dispatchEvent(new Event('cartUpdated'));
            // Xóa các tham số URL để tránh reload lại
            router.replace('/cart');
          } else {
            setPaymentStatus('failed');
            toast.error(result.message);
          }
        } catch (error) {
          setPaymentStatus('failed');
          console.error('Lỗi khi xử lý kết quả thanh toán:', error);
          toast.error(error instanceof Error ? error.message : 'Không thể xử lý kết quả thanh toán');
        }
      }
    };

    handlePaymentReturn();
  }, [searchParams, router]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (paymentStatus === 'processing' && currentTransactionId) {
      const checkStatus = async () => {
        try {
          const result = await paymentService.checkPaymentStatus(currentTransactionId);
          console.log('Payment status result:', result);
          
          // Kiểm tra trực tiếp responseCode và transactionStatus
          if (result.responseCode === '00' && result.transactionStatus === '00') {
            console.log('Payment successful, updating status...');
            setPaymentStatus('success');
            toast.success(result.message);
            // Refresh giỏ hàng sau khi thanh toán thành công
            const updatedCart = await cartService.getCart();
            setCart(updatedCart);
            // Phát ra sự kiện cập nhật giỏ hàng để cập nhật số lượng trên navbar
            window.dispatchEvent(new Event('cartUpdated'));
            // Xóa các tham số URL để tránh reload lại
            router.replace('/cart');
          }
        } catch (error) {
          console.error('Lỗi khi kiểm tra kết quả thanh toán:', error);
        }
      };

      // Kiểm tra ngay lập tức
      checkStatus();
      
      // Sau đó kiểm tra mỗi 10 giây
      intervalId = setInterval(checkStatus, 10000);
    }

    // Cleanup interval khi component unmount hoặc paymentStatus thay đổi
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [paymentStatus, currentTransactionId, router]);

  const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      toast.error('Số lượng phải lớn hơn 0');
      return;
    }

    try {
      const updatedCart = await cartService.updateCartItem(productId, newQuantity);
      setCart(updatedCart);
      toast.success('Đã cập nhật số lượng');
    } catch (error) {
      console.error('Lỗi khi cập nhật số lượng:', error);
      toast.error(error instanceof Error ? error.message : 'Không thể cập nhật số lượng');
    }
  };

  const handleRemoveItem = async (productId: number) => {
    try {
      const updatedCart = await cartService.removeCartItem(productId);
      setCart(updatedCart);
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      toast.error(error instanceof Error ? error.message : 'Không thể xóa sản phẩm');
    }
  };

  const handlePayment = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      setLoading(true);
      if (!cart || cart.items.length === 0) {
        toast.error('Giỏ hàng trống');
        return;
      }

      if (paymentMethod === 'COD') {
        // Xử lý thanh toán khi nhận hàng
        toast.success('Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.');
        router.push('/orders');
      } else {
        // Xử lý thanh toán qua VNPay
        setPaymentStatus('processing');
        const orderId = `ORDER_${Date.now()}`;
        const orderInfo = `Thanh toan don hang ${orderId}`;
        const paymentData = {
          amount: cart.totalAmount,
          orderId,
          orderInfo,
          bankCode: 'NCB',
        };
        const result = await paymentService.createVNPayPayment(paymentData);
        setCurrentTransactionId(result.transactionId);
        window.open(result.paymentUrl, '_blank');
      }
    } catch (error) {
      setPaymentStatus('failed');
      console.error('Lỗi khi xử lý thanh toán:', error);
      toast.error(error instanceof Error ? error.message : 'Không thể xử lý thanh toán');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
                <div className="h-24 w-24 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Giỏ hàng trống</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Giỏ hàng</h1>

      {paymentStatus === 'processing' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Đang chờ thanh toán
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Vui lòng hoàn tất thanh toán trong cửa sổ mới.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Hệ thống sẽ tự động kiểm tra kết quả thanh toán.
              </p>
            </div>
          </div>
        </div>
      )}

      {paymentStatus === 'success' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Thanh toán thành công
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setPaymentStatus('idle');
                    router.push('/orders');
                  }}
                  className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Vào đơn hàng
                </button>
                <button
                  onClick={() => {
                    setPaymentStatus('idle');
                    router.push('/products');
                  }}
                  className="w-full bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {paymentStatus === 'failed' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Thanh toán thất bại
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.
              </p>
              <button
                onClick={() => setPaymentStatus('idle')}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                <div className="relative h-24 w-24 flex-shrink-0">
                  {item.productImage ? (
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      fill
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {item.productName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Nhà cung cấp: {item.farmerName}
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                    {item.price.toLocaleString('vi-VN')}đ
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                      className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-gray-900 dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                      className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Tổng đơn hàng
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tổng số sản phẩm</span>
                <span className="text-gray-900 dark:text-white">{cart.totalItems}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tổng tiền</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {cart.totalAmount.toLocaleString('vi-VN')}đ
                </span>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phương thức thanh toán
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'COD')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Thanh toán khi nhận hàng (COD)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="VNPAY"
                      checked={paymentMethod === 'VNPAY'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'VNPAY')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Thanh toán qua ngân hàng</span>
                  </label>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang xử lý...' : paymentMethod === 'COD' ? 'Đặt hàng' : 'Thanh toán'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 