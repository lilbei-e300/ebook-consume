'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function FarmerDashboard() {
  return (
    <ProtectedRoute allowedRoles={['farmer']}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Nông Dân Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Quản lý sản phẩm</h2>
            <p className="text-gray-600">Thêm và quản lý sản phẩm của bạn</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Đơn hàng</h2>
            <p className="text-gray-600">Theo dõi và xử lý đơn hàng</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Phân tích thị trường</h2>
            <p className="text-gray-600">Xem báo cáo và phân tích thị trường</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Tương tác khách hàng</h2>
            <p className="text-gray-600">Quản lý tin nhắn và đánh giá</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 