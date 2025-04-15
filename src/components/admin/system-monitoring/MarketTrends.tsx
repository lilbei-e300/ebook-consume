"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { formatCurrency } from '@/lib/utils';
import { adminMonitoringService } from '@/services/admin/monitoringService';

interface MarketTrendsData {
  topProducts: Array<{
    productId: number;
    productName: string;
    quantitySold: number;
    revenue: number;
    growthRate: number;
    category: string;
  }>;
  seasonalTrends: Array<{
    period: string;
    popularCategory: string;
    quantitySold: number;
    revenue: number;
  }>;
  categoryTrends: Array<{
    category: string;
    quantitySold: number;
    revenue: number;
    growthRate: number;
  }>;
  forecasts: Array<{
    forecastPeriod: string;
    estimatedRevenue: number;
    popularCategory: string;
    confidence: number;
  }>;
}

const MarketTrends = () => {
  const [marketData, setMarketData] = useState<MarketTrendsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const data = await adminMonitoringService.getMarketTrends({
          startDate: '2023-10-01',
          endDate: '2023-10-31',
          category: 'all'
        });
        setMarketData(data);
      } catch (error) {
        console.error('Error fetching market trends data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!marketData) {
    return <div>No data available</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Sản phẩm bán chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketData.topProducts || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="productName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" name="Doanh thu" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Xu hướng theo mùa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketData.seasonalTrends || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Doanh thu" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Xu hướng theo danh mục</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketData.categoryTrends || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#82ca9d" name="Doanh thu" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dự báo doanh thu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketData.forecasts || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="forecastPeriod" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="estimatedRevenue" stroke="#ffc658" name="Doanh thu dự kiến" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chi tiết sản phẩm bán chạy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Sản phẩm</th>
                  <th className="text-right p-2">Số lượng bán</th>
                  <th className="text-right p-2">Doanh thu</th>
                  <th className="text-right p-2">Tăng trưởng</th>
                  <th className="text-left p-2">Danh mục</th>
                </tr>
              </thead>
              <tbody>
                {marketData.topProducts.map((product) => (
                  <tr key={product.productId}>
                    <td className="p-2">{product.productName}</td>
                    <td className="text-right p-2">{product.quantitySold}</td>
                    <td className="text-right p-2">{formatCurrency(product.revenue)}</td>
                    <td className="text-right p-2">{product.growthRate.toFixed(1)}%</td>
                    <td className="p-2">{product.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketTrends; 