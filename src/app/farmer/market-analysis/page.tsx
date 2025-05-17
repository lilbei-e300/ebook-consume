"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Card, Row, Col, Statistic, Table, Tabs, Button, DatePicker, Select, Space, message } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, DownloadOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import { farmerMarketAnalysisService, MarketOverview, MarketTrends, RevenueAnalysis } from '@/services/farmer/farmerMarketAnalysisService';
import { formatCurrency } from '@/utils/format';
import { Line, Bar } from '@ant-design/plots';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const MarketAnalysisPage = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [overview, setOverview] = useState<MarketOverview | null>(null);
  const [trends, setTrends] = useState<MarketTrends | null>(null);
  const [revenue, setRevenue] = useState<RevenueAnalysis | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(3, 'month'),
    dayjs()
  ]);
  const [period, setPeriod] = useState<string>('month');

  const fetchData = useCallback(async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const [overviewData, trendsData, revenueData] = await Promise.all([
        farmerMarketAnalysisService.getMarketOverview(token),
        farmerMarketAnalysisService.getMarketTrends(token),
        farmerMarketAnalysisService.getRevenueAnalysis(token)
      ]);
      
      setOverview(overviewData);
      setTrends(trendsData);
      setRevenue(revenueData);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải dữ liệu phân tích thị trường';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleExportReport = async () => {
    if (!token) return;

    try {
      setLoading(true);
      await farmerMarketAnalysisService.exportReport({
        startDate: dateRange[0].format('YYYY-MM-DD'),
        endDate: dateRange[1].format('YYYY-MM-DD'),
        period,
        reportFormat: 'pdf',
        sendEmail: true
      }, token);

      message.success('Báo cáo đã được xuất và gửi qua email');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi xuất báo cáo';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange([dates[0], dates[1]]);
    }
  };

  const revenueChartData = overview?.monthlyRevenueChart 
    ? Object.entries(overview.monthlyRevenueChart).map(([month, value]) => ({
        month,
        value
      }))
    : [];

  const salesChartData = overview?.monthlySalesChart
    ? Object.entries(overview.monthlySalesChart).map(([month, value]) => ({
        month,
        value
      }))
    : [];

  const topProductsColumns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Số lượng bán',
      dataIndex: 'soldQuantity',
      key: 'soldQuantity',
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value: number) => formatCurrency(value),
    },
    {
      title: 'Tăng trưởng',
      dataIndex: 'growthRate',
      key: 'growthRate',
      render: (value: number) => (
        <span className={value >= 0 ? 'text-green-500' : 'text-red-500'}>
          {value >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          {Math.abs(value)}%
        </span>
      ),
    },
  ];

  const topCustomersColumns = [
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Số đơn hàng',
      dataIndex: 'ordersCount',
      key: 'ordersCount',
    },
    {
      title: 'Tổng chi tiêu',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (value: number) => formatCurrency(value),
    },
  ];

  const items = [
    {
      key: 'overview',
      label: 'Tổng quan',
      children: (
        <>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Tổng doanh thu"
                  value={overview?.totalRevenue}
                  precision={0}
                  formatter={(value) => formatCurrency(value as number)}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Doanh thu tháng này"
                  value={overview?.monthlyRevenue}
                  precision={0}
                  formatter={(value) => formatCurrency(value as number)}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Tổng đơn hàng"
                  value={overview?.totalCompletedOrders}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Sản phẩm đang bán"
                  value={overview?.totalActiveProducts}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-6">
            <Col span={12}>
              <Card title="Biểu đồ doanh thu theo tháng">
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
            <Col span={12}>
              <Card title="Biểu đồ số lượng bán theo tháng">
                <Bar
                  data={salesChartData}
                  xField="month"
                  yField="value"
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-6">
            <Col span={12}>
              <Card title="Sản phẩm bán chạy">
                <Table
                  columns={topProductsColumns}
                  dataSource={overview?.topSellingProducts}
                  rowKey="productId"
                  pagination={false}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Khách hàng tiềm năng">
                <Table
                  columns={topCustomersColumns}
                  dataSource={overview?.topCustomers}
                  rowKey="customerId"
                  pagination={false}
                />
              </Card>
            </Col>
          </Row>
        </>
      )
    },
    {
      key: 'trends',
      label: 'Xu hướng thị trường',
      children: (
        <>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Sản phẩm đang tăng trưởng">
                <Table
                  columns={topProductsColumns}
                  dataSource={trends?.topTrendingProducts}
                  rowKey="productId"
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-6">
            <Col span={24}>
              <Card title="Sản phẩm đang suy giảm">
                <Table
                  columns={topProductsColumns}
                  dataSource={trends?.decliningProducts}
                  rowKey="productId"
                />
              </Card>
            </Col>
          </Row>
        </>
      )
    },
    {
      key: 'revenue',
      label: 'Phân tích doanh thu',
      children: (
        <>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Tổng doanh thu"
                  value={revenue?.totalRevenue}
                  precision={0}
                  formatter={(value) => formatCurrency(value as number)}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Tăng trưởng doanh thu"
                  value={revenue?.revenueGrowth ?? 0}
                  precision={2}
                  suffix="%"
                  valueStyle={{ color: (revenue?.revenueGrowth ?? 0) >= 0 ? '#3f8600' : '#cf1322' }}
                  prefix={(revenue?.revenueGrowth ?? 0) >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Giá trị đơn hàng trung bình"
                  value={revenue?.averageOrderValue}
                  precision={0}
                  formatter={(value) => formatCurrency(value as number)}
                />
              </Card>
            </Col>
          </Row>
        </>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Phân tích thị trường</h1>
        <Space>
          <RangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
          />
          <Select
            value={period}
            onChange={setPeriod}
            options={[
              { label: 'Theo ngày', value: 'day' },
              { label: 'Theo tuần', value: 'week' },
              { label: 'Theo tháng', value: 'month' },
            ]}
          />
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleExportReport}
            loading={loading}
          >
            Xuất báo cáo
          </Button>
        </Space>
      </div>

      <Tabs 
        defaultActiveKey="overview"
        items={items}
      />
    </div>
  );
};

export default MarketAnalysisPage; 