"use client";
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { adminMonitoringService } from '@/services/admin/monitoringService';

interface OrderData {
  totalOrders: number;
  completedOrders: number;
  processingOrders: number;
  cancelledOrders: number;
  completionRate: number;
  cancellationRate: number;
  timeSeriesData: Array<{
    label: string;
    orderCount: number;
    completedCount: number;
    cancelledCount: number;
  }>;
  statusData: Array<{
    status: string;
    count: number;
    percentage: number;
  }>;
}

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const OrderReport = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        const data = await adminMonitoringService.getOrdersData({
          startDate: '2023-10-01',
          endDate: '2023-10-31',
          period: 'day',
          status: 'all'
        });
        setOrderData(data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderData) {
    return <div>No data available</div>;
  }

  const columns = [
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Số lượng',
      dataIndex: 'count',
      key: 'count',
      align: 'right' as const,
    },
    {
      title: 'Tỷ lệ',
      dataIndex: 'percentage',
      key: 'percentage',
      align: 'right' as const,
      render: (value: number) => `${value.toFixed(1)}%`,
    },
  ];

  return (
    <div className="space-y-4">
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số đơn hàng"
              value={orderData.totalOrders}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đơn hàng hoàn thành"
              value={orderData.completedOrders}
              valueStyle={{ color: '#00C49F' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đơn hàng đang xử lý"
              value={orderData.processingOrders}
              valueStyle={{ color: '#FFBB28' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đơn hàng đã hủy"
              value={orderData.cancelledOrders}
              valueStyle={{ color: '#FF8042' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Đơn hàng theo thời gian">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={orderData.timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="orderCount" stroke="#8884d8" name="Tổng đơn hàng" />
                  <Line type="monotone" dataKey="completedCount" stroke="#00C49F" name="Đã hoàn thành" />
                  <Line type="monotone" dataKey="cancelledCount" stroke="#FF8042" name="Đã hủy" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Phân bố trạng thái đơn hàng">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderData.statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                    nameKey="status"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  >
                    {orderData.statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="Chi tiết trạng thái đơn hàng">
        <Table
          columns={columns}
          dataSource={orderData.statusData}
          rowKey="status"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default OrderReport; 