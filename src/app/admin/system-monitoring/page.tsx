"use client";
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { Button } from 'antd';
import { DownloadOutlined, LineChartOutlined, ShoppingCartOutlined, UserOutlined, CloudServerOutlined, DashboardOutlined } from '@ant-design/icons';
import SalesReport from '../../../components/admin/system-monitoring/SalesReport';
import OrderReport from '../../../components/admin/system-monitoring/OrderReport';
import MarketTrends from '../../../components/admin/system-monitoring/MarketTrends';
import SystemPerformance from '../../../components/admin/system-monitoring/SystemPerformance';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';


const SystemMonitoringPage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('sales');

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const items = [
    {
      key: 'sales',
      label: (
        <span className="flex items-center gap-2">
          <LineChartOutlined className="text-blue-500" />
          <span className="font-medium">Doanh số</span>
        </span>
      ),
      children: <SalesReport />
    },
    {
      key: 'orders',
      label: (
        <span className="flex items-center gap-2">
          <ShoppingCartOutlined className="text-green-500" />
          <span className="font-medium">Đơn hàng</span>
        </span>
      ),
      children: <OrderReport />
    },
    {
      key: 'market',
      label: (
        <span className="flex items-center gap-2">
          <UserOutlined className="text-purple-500" />
          <span className="font-medium">Thị trường</span>
        </span>
      ),
      children: <MarketTrends />
    },
    {
      key: 'performance',
      label: (
        <span className="flex items-center gap-2">
          <CloudServerOutlined className="text-orange-500" />
          <span className="font-medium">Hiệu suất</span>
        </span>
      ),
      children: <SystemPerformance />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DashboardOutlined className="text-2xl text-brand-500" />
              <h1 className="text-2xl font-bold text-gray-800">Theo dõi hệ thống</h1>
            </div>
            <div className="flex gap-3">
              <Button 
                type="primary" 
                icon={<DownloadOutlined />} 
                onClick={() => window.open('/api/v1/admin/monitoring/export/sales?format=pdf', '_blank')}
                className=""
              >
                Xuất báo cáo doanh số
              </Button>
              <Button 
                type="primary" 
                icon={<DownloadOutlined />} 
                onClick={() => window.open('/api/v1/admin/monitoring/export/orders?format=excel', '_blank')}
                className=""
              >
                Xuất báo cáo đơn hàng
              </Button>
              <Button 
                type="primary" 
                icon={<DownloadOutlined />} 
                onClick={() => window.open('/api/v1/admin/monitoring/export/market-trends?format=pdf', '_blank')}
                className=""
              >
                Xuất báo cáo thị trường
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            items={items}
            className="p-4 [&_.ant-tabs-tab-active]:text-brand-500 [&_.ant-tabs-ink-bar]:bg-brand-500"
            tabBarStyle={{
              padding: '0 16px',
              marginBottom: '16px',
              borderBottom: '1px solid #f0f0f0'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoringPage; 