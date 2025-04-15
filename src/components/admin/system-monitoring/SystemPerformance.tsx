"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { adminMonitoringService } from '@/services/admin/monitoringService';

interface PerformanceData {
  averageResponseTime: number;
  errorRate: number;
  cpuUsage: number;
  memoryUsage: number;
  activeUsers: number;
  activeSessions: number;
  timeSeriesData: Array<{
    timestamp: string;
    responseTime: number;
    errorRate: number;
    cpuUsage: number;
    memoryUsage: number;
    activeUsers: number;
  }>;
  errorStatistics: Array<{
    errorType: string;
    count: number;
    percentage: number;
    severity: string;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SystemPerformance = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        const data = await adminMonitoringService.getSystemPerformance({
          startDate: '2023-10-01',
          endDate: '2023-10-31',
          period: 'day'
        });
        setPerformanceData(data);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!performanceData) {
    return <div>No data available</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Thời gian phản hồi trung bình</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.averageResponseTime?.toFixed(2) || 0}ms</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Tỷ lệ lỗi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.errorRate?.toFixed(2) || 0}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Sử dụng CPU</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.cpuUsage?.toFixed(2) || 0}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Sử dụng bộ nhớ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.memoryUsage?.toFixed(2) || 0}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Hiệu suất theo thời gian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData.timeSeriesData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="responseTime" stroke="#8884d8" name="Thời gian phản hồi (ms)" />
                  <Line type="monotone" dataKey="errorRate" stroke="#ff7300" name="Tỷ lệ lỗi (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phân bố lỗi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceData.errorStatistics || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                    nameKey="errorType"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {performanceData.errorStatistics?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chi tiết lỗi hệ thống</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Loại lỗi</th>
                  <th className="text-right p-2">Số lần</th>
                  <th className="text-right p-2">Tỷ lệ</th>
                  <th className="text-left p-2">Mức độ</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.errorStatistics?.map((error) => (
                  <tr key={error.errorType}>
                    <td className="p-2">{error.errorType}</td>
                    <td className="text-right p-2">{error.count}</td>
                    <td className="text-right p-2">{error.percentage.toFixed(1)}%</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        error.severity === 'high' ? 'bg-red-100 text-red-800' :
                        error.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {error.severity}
                      </span>
                    </td>
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

export default SystemPerformance; 