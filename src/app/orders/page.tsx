"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { orderService, OrderSummary, OrderListResponse } from '@/services/orderService';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [orders, setOrders] = useState<OrderListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderSummary | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/login');
      return;
    }

    fetchOrders();
  }, [isAuthenticated, isLoading, selectedStatus, searchKeyword, currentPage]);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getOrders({
        status: selectedStatus,
        keyword: searchKeyword,
        page: currentPage,
        size: 10,
      });
      setOrders(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      toast.error('Không thể lấy danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(0);
  };

  const handleCancelOrder = async () => {
    if (!selectedOrder || !cancelReason.trim()) {
      toast.error('Vui lòng nhập lý do hủy đơn hàng');
      return;
    }

    try {
      await orderService.cancelOrder(selectedOrder.id, cancelReason);
      toast.success('Hủy đơn hàng thành công');
      setShowCancelModal(false);
      setCancelReason('');
      fetchOrders();
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Đơn hàng của tôi</h1>

      {/* Thống kê đơn hàng */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Chờ xử lý</div>
          <div className="text-2xl font-bold text-yellow-600">{orders?.pendingCount || 0}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Đã xác nhận</div>
          <div className="text-2xl font-bold text-blue-600">{orders?.confirmedCount || 0}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Đang giao</div>
          <div className="text-2xl font-bold text-purple-600">{orders?.shippingCount || 0}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Đã giao</div>
          <div className="text-2xl font-bold text-green-600">{orders?.deliveredCount || 0}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Đã hủy</div>
          <div className="text-2xl font-bold text-red-600">{orders?.cancelledCount || 0}</div>
        </div>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex space-x-2">
              <button
                onClick={() => handleStatusChange('')}
                className={`px-4 py-2 rounded-md ${
                  selectedStatus === ''
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => handleStatusChange('pending')}
                className={`px-4 py-2 rounded-md ${
                  selectedStatus === 'pending'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Chờ xử lý
              </button>
              <button
                onClick={() => handleStatusChange('confirmed')}
                className={`px-4 py-2 rounded-md ${
                  selectedStatus === 'confirmed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Đã xác nhận
              </button>
              <button
                onClick={() => handleStatusChange('shipping')}
                className={`px-4 py-2 rounded-md ${
                  selectedStatus === 'shipping'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Đang giao
              </button>
              <button
                onClick={() => handleStatusChange('delivered')}
                className={`px-4 py-2 rounded-md ${
                  selectedStatus === 'delivered'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Đã giao
              </button>
            </div>

            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Tìm kiếm đơn hàng..."
                className="w-full md:w-64 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Tìm kiếm
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Danh sách đơn hàng */}
      <div className="space-y-4">
        {orders?.orders.map((order) => (
          <div
            key={order.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
          >
            <div className="p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    {order.primaryProductImage ? (
                      <Image
                        src={order.primaryProductImage}
                        alt={order.primaryProductName}
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
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {order.orderNumber}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {order.primaryProductName} và {order.itemCount - 1} sản phẩm khác
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Nhà cung cấp: {order.farmerName}
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.statusDescription}
                  </span>
                  <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                    {order.totalAmount.toLocaleString('vi-VN')}đ
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Link
                  href={`/orders/${order.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Chi tiết
                </Link>
                {order.canCancel && (
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowCancelModal(true);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Hủy đơn
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      {orders && orders.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!orders.hasPrevious}
              className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trước
            </button>
            <span className="text-gray-700 dark:text-gray-300">
              Trang {currentPage + 1} / {orders.totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!orders.hasNext}
              className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </nav>
        </div>
      )}

      {/* Modal hủy đơn hàng */}
      {showCancelModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Hủy đơn hàng {selectedOrder.orderNumber}
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