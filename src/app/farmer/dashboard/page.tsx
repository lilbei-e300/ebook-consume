"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { Card, Row, Col, Statistic, Table, Tag } from 'antd';
import { ArrowUpOutlined, ShoppingCartOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import { farmerDashboardService, DashboardData } from '@/services/farmer/farmerDashboardService';
import { formatCurrency } from '@/utils/format';
import { Line } from '@ant-design/plots';
import dayjs from 'dayjs';
import { message } from 'antd';

const FarmerDashboard = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const fetchDashboardData = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const data = await farmerDashboardService.getDashboardData(token);
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      message.error('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const recentOrdersColumns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (value: number) => formatCurrency(value),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          pending: { color: 'warning', text: 'Chờ xác nhận' },
          shipping: { color: 'processing', text: 'Đang giao' },
          delivered: { color: 'success', text: 'Đã giao' },
          cancelled: { color: 'error', text: 'Đã hủy' },
        };
        const { color, text } = statusMap[status as keyof typeof statusMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
  ];

  const topProductsColumns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Số lượng đã bán',
      dataIndex: 'quantitySold',
      key: 'quantitySold',
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value: number) => formatCurrency(value),
    },
  ];

  const revenueChartData = dashboardData?.revenueByMonth.map(item => ({
    month: dayjs(item.month).format('MM/YYYY'),
    value: item.revenue,
  })) || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tổng quan</h1>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card loading={loading}>
            <Statistic
              title="Tổng doanh thu"
              value={dashboardData?.totalRevenue}
              precision={0}
              formatter={(value) => formatCurrency(value as number)}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={loading}>
            <Statistic
              title="Tổng đơn hàng"
              value={dashboardData?.totalOrders}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={loading}>
            <Statistic
              title="Tổng sản phẩm"
              value={dashboardData?.totalProducts}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={loading}>
            <Statistic
              title="Tổng khách hàng"
              value={dashboardData?.totalCustomers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col span={16}>
          <Card title="Đơn hàng gần đây" loading={loading}>
            <Table
              columns={recentOrdersColumns}
              dataSource={dashboardData?.recentOrders}
              rowKey="orderId"
              pagination={false}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Sản phẩm bán chạy" loading={loading}>
            <Table
              columns={topProductsColumns}
              dataSource={dashboardData?.topProducts}
              rowKey="productId"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col span={24}>
          <Card title="Biểu đồ doanh thu theo tháng" loading={loading}>
            <Line
              data={revenueChartData}
              xField="month"
              yField="value"
              point={{
                size: 5,
                shape: 'diamond',
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FarmerDashboard; 