"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Activity {
  id: number;
  action: string;
  time: string;
}

interface DashboardData {
  recentActivities: Activity[];
  totalUsers?: number;
  totalProducts?: number;
  totalOrders?: number;
  activeOrders?: number;
  totalRevenue?: number;
  totalDeliveries?: number;
  completedDeliveries?: number;
  pendingDeliveries?: number;
}

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Kiểm tra role có quyền truy cập
    const allowedRoles = ['admin', 'farmer', 'transporter'];
    if (!user || !allowedRoles.includes(user.role)) {
      router.push('/');
      return;
    }

    // Giả lập tải dữ liệu dashboard
    const fetchDashboardData = async () => {
      try {
        // Trong thực tế, bạn sẽ gọi API để lấy dữ liệu
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/${user.role}`);
        // const data = await response.json();
        
        // Giả lập dữ liệu dựa trên role
        let mockData;
        switch (user.role) {
          case 'admin':
            mockData = {
              totalUsers: 150,
              totalProducts: 320,
              totalOrders: 45,
              recentActivities: [
                { id: 1, action: 'Người dùng mới đăng ký', time: '10 phút trước' },
                { id: 2, action: 'Đơn hàng mới', time: '30 phút trước' },
                { id: 3, action: 'Cập nhật sản phẩm', time: '1 giờ trước' },
              ]
            };
            break;
          case 'farmer':
            mockData = {
              totalProducts: 25,
              activeOrders: 8,
              totalRevenue: 12500000,
              recentActivities: [
                { id: 1, action: 'Đơn hàng mới', time: '15 phút trước' },
                { id: 2, action: 'Cập nhật trạng thái sản phẩm', time: '1 giờ trước' },
                { id: 3, action: 'Nhận đánh giá mới', time: '2 giờ trước' },
              ]
            };
            break;
          case 'transporter':
            mockData = {
              totalDeliveries: 12,
              completedDeliveries: 8,
              pendingDeliveries: 4,
              recentActivities: [
                { id: 1, action: 'Đơn hàng mới cần vận chuyển', time: '20 phút trước' },
                { id: 2, action: 'Hoàn thành vận chuyển', time: '1 giờ trước' },
                { id: 3, action: 'Cập nhật trạng thái vận chuyển', time: '2 giờ trước' },
              ]
            };
            break;
          default:
            mockData = {
              totalUsers: 0,
              totalProducts: 0,
              totalOrders: 0,
              recentActivities: []
            };
        }
        
        setDashboardData(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  // Hiển thị nội dung dashboard dựa trên role
  const renderDashboardContent = () => {
    if (!dashboardData) return null;

    switch (user?.role) {
      case 'admin':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Tổng số người dùng</h3>
              <p className="text-3xl font-bold text-brand-500">{dashboardData.totalUsers}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Tổng số sản phẩm</h3>
              <p className="text-3xl font-bold text-brand-500">{dashboardData.totalProducts}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Tổng số đơn hàng</h3>
              <p className="text-3xl font-bold text-brand-500">{dashboardData.totalOrders}</p>
            </div>
          </div>
        );
      case 'farmer':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Tổng số sản phẩm</h3>
              <p className="text-3xl font-bold text-brand-500">{dashboardData.totalProducts}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Đơn hàng đang hoạt động</h3>
              <p className="text-3xl font-bold text-brand-500">{dashboardData.activeOrders}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Tổng doanh thu</h3>
              <p className="text-3xl font-bold text-brand-500">{dashboardData.totalRevenue?.toLocaleString('vi-VN') || '0'} đ</p>
            </div>
          </div>
        );
      case 'transporter':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Tổng số vận chuyển</h3>
              <p className="text-3xl font-bold text-brand-500">{dashboardData.totalDeliveries}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Vận chuyển đã hoàn thành</h3>
              <p className="text-3xl font-bold text-brand-500">{dashboardData.completedDeliveries}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Vận chuyển đang chờ</h3>
              <p className="text-3xl font-bold text-brand-500">{dashboardData.pendingDeliveries}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        {user?.role === 'admin' ? 'Quản trị hệ thống' : 
         user?.role === 'farmer' ? 'Quản lý nông trại' : 
         user?.role === 'transporter' ? 'Quản lý vận chuyển' : 'Dashboard'}
      </h1>
      
      {renderDashboardContent()}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Hoạt động gần đây</h2>
        <div className="space-y-4">
          {dashboardData?.recentActivities.map((activity: Activity) => (
            <div key={activity.id} className="flex items-start p-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
              <div className="flex-1">
                <p className="text-gray-800 dark:text-gray-200">{activity.action}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}