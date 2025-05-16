'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, Row, Col, Statistic, Alert } from 'antd';
import { 
  UserOutlined, 
  ShoppingOutlined, 
  ShoppingCartOutlined, 
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  WarningOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface DashboardData {
  salesSummary: {
    totalRevenue: number;
    revenueGrowth: number;
    totalOrders: number;
    orderGrowth: number;
    averageOrderValue: number;
  };
  userSummary: {
    totalUsers: number;
    newUsers: number;
    activeUsers: number;
    farmerCount: number;
    consumerCount: number;
    transporterCount: number;
  };
  productSummary: {
    totalProducts: number;
    newProducts: number;
    pendingProducts: number;
    approvedProducts: number;
    rejectedProducts: number;
  };
  alerts: Array<{
    type: 'info' | 'warning' | 'error';
    message: string;
    timestamp: string;
    priority: 'low' | 'medium' | 'high';
  }>;
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/monitoring/dashboard`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data) {
          throw new Error('No data received from server');
        }

        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải dữ liệu');
        
        // Sử dụng dữ liệu mẫu khi API thất bại
        const mockData: DashboardData = {
          salesSummary: {
            totalRevenue: 1500000,
            revenueGrowth: 15.5,
            totalOrders: 150,
            orderGrowth: 10.2,
            averageOrderValue: 10000
          },
          userSummary: {
            totalUsers: 1000,
            newUsers: 50,
            activeUsers: 750,
            farmerCount: 200,
            consumerCount: 750,
            transporterCount: 50
          },
          productSummary: {
            totalProducts: 500,
            newProducts: 30,
            pendingProducts: 20,
            approvedProducts: 450,
            rejectedProducts: 30
          },
          alerts: [
            {
              type: 'info',
              message: 'Có 5 sản phẩm mới đang chờ duyệt',
              timestamp: new Date().toISOString(),
              priority: 'medium'
            },
            {
              type: 'warning',
              message: 'Doanh số giảm 5% so với tuần trước',
              timestamp: new Date().toISOString(),
              priority: 'high'
            }
          ]
        };
        setDashboardData(mockData);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const getAlertType = (type: string) => {
    switch (type) {
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <InfoCircleOutlined />;
      case 'warning':
        return <WarningOutlined />;
      case 'error':
        return <WarningOutlined />;
      default:
        return <InfoCircleOutlined />;
    }
  };

  const formatNumber = (value: number | string | undefined) => {
    if (value === undefined) return '0';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return Math.round(numValue).toLocaleString('vi-VN');
  };

  const formatPercentage = (value: number | string | undefined) => {
    if (value === undefined) return '0';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return Math.round(numValue * 100) / 100;
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Quản trị hệ thống</h1>
        
        {error && (
          <Alert
            message="Lỗi"
            description={error}
            type="error"
            showIcon
            className="mb-6"
          />
        )}
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
          </div>
        ) : (
          <>
            {/* Alerts Section */}
            {dashboardData?.alerts && dashboardData.alerts.length > 0 && (
              <div className="mb-6 space-y-4">
                {dashboardData.alerts.map((alert, index) => (
                  <Alert
                    key={index}
                    message={alert.message}
                    type={getAlertType(alert.type)}
                    icon={getAlertIcon(alert.type)}
                    showIcon
                    className="mb-2"
                  />
                ))}
              </div>
            )}

            {/* Sales Summary */}
            <Row gutter={[16, 16]} className="mb-6">
              <Col xs={24} sm={12} lg={8}>
                <Card>
                  <Statistic
                    title="Tổng doanh thu"
                    value={dashboardData?.salesSummary.totalRevenue}
                    prefix={<DollarOutlined />}
                    formatter={(value) => `${formatNumber(value)} đ`}
                  />
                  <div className="mt-2 text-sm">
                    <span className={dashboardData?.salesSummary.revenueGrowth && dashboardData.salesSummary.revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {dashboardData?.salesSummary.revenueGrowth && dashboardData.salesSummary.revenueGrowth >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                      {formatPercentage(dashboardData?.salesSummary.revenueGrowth)}%
                    </span>
                    <span className="text-gray-500 ml-2">so với tháng trước</span>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card>
                  <Statistic
                    title="Tổng đơn hàng"
                    value={dashboardData?.salesSummary.totalOrders}
                    prefix={<ShoppingCartOutlined />}
                    formatter={(value) => formatNumber(value)}
                  />
                  <div className="mt-2 text-sm">
                    <span className={dashboardData?.salesSummary.orderGrowth && dashboardData.salesSummary.orderGrowth >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {dashboardData?.salesSummary.orderGrowth && dashboardData.salesSummary.orderGrowth >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                      {formatPercentage(Math.abs(dashboardData?.salesSummary.orderGrowth || 0))}%
                    </span>
                    <span className="text-gray-500 ml-2">so với tháng trước</span>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card>
                  <Statistic
                    title="Giá trị đơn hàng trung bình"
                    value={dashboardData?.salesSummary.averageOrderValue}
                    prefix={<DollarOutlined />}
                    formatter={(value) => `${formatNumber(value)} đ`}
                  />
                </Card>
              </Col>
            </Row>

            {/* User Summary */}
            <Row gutter={[16, 16]} className="mb-6">
              <Col xs={24} sm={12} lg={8}>
                <Card>
                  <Statistic
                    title="Tổng số người dùng"
                    value={dashboardData?.userSummary.totalUsers}
                    prefix={<UserOutlined />}
                    formatter={(value) => formatNumber(value)}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card>
                  <Statistic
                    title="Người dùng mới"
                    value={dashboardData?.userSummary.newUsers}
                    prefix={<UserOutlined />}
                    formatter={(value) => formatNumber(value)}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card>
                  <Statistic
                    title="Người dùng đang hoạt động"
                    value={dashboardData?.userSummary.activeUsers}
                    prefix={<UserOutlined />}
                    formatter={(value) => formatNumber(value)}
                  />
                </Card>
              </Col>
            </Row>

            {/* Product Summary */}
            <Row gutter={[16, 16]} className="mb-6">
              <Col xs={24} sm={12} lg={8}>
                <Card>
                  <Statistic
                    title="Tổng số sản phẩm"
                    value={dashboardData?.productSummary.totalProducts}
                    prefix={<ShoppingOutlined />}
                    formatter={(value) => formatNumber(value)}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card>
                  <Statistic
                    title="Sản phẩm mới"
                    value={dashboardData?.productSummary.newProducts}
                    prefix={<ShoppingOutlined />}
                    formatter={(value) => formatNumber(value)}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card>
                  <Statistic
                    title="Sản phẩm đang chờ duyệt"
                    value={dashboardData?.productSummary.pendingProducts}
                    prefix={<ShoppingOutlined />}
                    formatter={(value) => formatNumber(value)}
                  />
                </Card>
              </Col>
            </Row>

            {/* User Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Nông dân</h2>
                <p className="text-3xl font-bold text-brand-500">{formatNumber(dashboardData?.userSummary.farmerCount)}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Người tiêu dùng</h2>
                <p className="text-3xl font-bold text-brand-500">{formatNumber(dashboardData?.userSummary.consumerCount)}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Đơn vị vận chuyển</h2>
                <p className="text-3xl font-bold text-brand-500">{formatNumber(dashboardData?.userSummary.transporterCount)}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
} 