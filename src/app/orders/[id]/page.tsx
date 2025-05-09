"use client";
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { orderService, Order } from '@/services/orderService';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const { id } = use(params);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/login');
      return;
    }

    fetchOrderDetail();
  }, [isAuthenticated, isLoading, id]);

  const fetchOrderDetail = async () => {
    try {
      const data = await orderService.getOrderDetail(parseInt(id));
      setOrder(data);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin đơn hàng:', error);
      toast.error('Không thể lấy thông tin đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!order || !cancelReason.trim()) {
      toast.error('Vui lòng nhập lý do hủy đơn hàng');
      return;
    }

    try {
      await orderService.cancelOrder(order.id, cancelReason);
      toast.success('Hủy đơn hàng thành công');
      setShowCancelModal(false);
      setCancelReason('');
      fetchOrderDetail();
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error);
      toast.error('Không thể hủy đơn hàng');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipping':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Không tìm thấy đơn hàng
          </h1>
          <Link
            href="/orders"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Quay lại danh sách đơn hàng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/orders"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          <span>Quay lại danh sách đơn hàng</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Đơn hàng {order.orderNumber}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Đặt lúc {new Date(order.createdAt).toLocaleString('vi-VN')}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.statusDescription}
              </span>
            </div>
          </div>
        </div>

        {/* Thông tin đơn hàng */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Thông tin người mua */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Thông tin người mua
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Địa chỉ:</span> {order.shippingAddress}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Số điện thoại:</span> {order.consumerPhone}
                </p>
              </div>
            </div>

            {/* Thông tin người bán */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Thông tin người bán
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Tên:</span> {order.farmerName}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Trang trại:</span> {order.farmName}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Số điện thoại:</span> {order.farmerPhone}
                </p>
              </div>
            </div>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sản phẩm đã đặt
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="relative h-20 w-20 flex-shrink-0">
                    {item.productImage ? (
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
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
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {item.productName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Số lượng: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Đơn giá: {item.price.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {item.subtotal.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tổng tiền */}
            <div className="mt-8 flex justify-end">
              <div className="w-full md:w-1/3">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      Tổng tiền:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {order.totalAmount.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nút hủy đơn hàng */}
          {order.canCancel && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Hủy đơn hàng
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal hủy đơn hàng */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Hủy đơn hàng {order.orderNumber}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lý do hủy đơn hàng
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Nhập lý do hủy đơn hàng..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason('');
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Hủy
              </button>
              <button
                onClick={handleCancelOrder}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Xác nhận hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 