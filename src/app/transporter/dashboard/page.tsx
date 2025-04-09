'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function TransporterDashboard() {
  return (
    <ProtectedRoute allowedRoles={['transporter']}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Đơn Vị Vận Chuyển Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Đơn hàng mới</h2>
            <p className="text-gray-600">Xem và nhận các đơn hàng mới</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Đơn hàng đang giao</h2>
            <p className="text-gray-600">Quản lý các đơn hàng đang trong quá trình giao</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Lịch sử giao hàng</h2>
            <p className="text-gray-600">Xem lịch sử các đơn hàng đã giao</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 