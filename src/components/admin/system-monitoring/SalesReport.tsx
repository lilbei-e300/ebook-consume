"use client";
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { formatCurrency } from '@/lib/utils';
import { adminMonitoringService } from '@/services/admin/monitoringService';

interface SalesData {
  totalRevenue: number;
  totalOrders: number;
  totalProductsSold: number;
  averageOrderValue: number;
  timeSeriesData: Array<{
    label: string;
    revenue: number;
    orderCount: number;
  }>;
  regionData: Array<{
    region: string;
    revenue: number;
    orderCount: number;
  }>;
}

const SalesReport = () => {
  const [salesData, setSalesData] = useState<SalesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        const data = await adminMonitoringService.getSalesData({
          startDate: '2023-10-01',
          endDate: '2023-10-31',
          period: 'day',
          region: 'all',
          category: 'all'
        });
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!salesData) {
    return <div>No data available</div>;
  }

  return (
    <div className="space-y-4">
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={salesData.totalRevenue}
              formatter={(value) => formatCurrency(value as number)}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số đơn hàng"
              value={salesData.totalOrders}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Sản phẩm đã bán"
              value={salesData.totalProductsSold}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Giá trị đơn hàng trung bình"
              value={salesData.averageOrderValue}
              formatter={(value) => formatCurrency(value as number)}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Doanh thu theo thời gian">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData.timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Doanh thu" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Doanh thu theo khu vực">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData.regionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" name="Doanh thu" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SalesReport; 