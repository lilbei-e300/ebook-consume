"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Table, Card, Input, Select, Button, Tag } from 'antd';
import { SearchOutlined, ReloadOutlined, EyeOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import { farmerOrderService, FarmerOrder, FarmerOrderSearchParams } from '@/services/farmer/farmerOrderService';
import { formatCurrency, formatDate } from '@/utils/format';
import toast from 'react-hot-toast';
import type { TablePaginationConfig } from 'antd/es/table';
import Link from 'next/link';

const { Option } = Select;

const FarmerOrdersPage = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<FarmerOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchParams, setSearchParams] = useState<FarmerOrderSearchParams>({
    page: 0,
    size: 10,
    isHistory: false
  });

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await farmerOrderService.getOrders(searchParams, token);
      setOrders(response.orders);
      setTotal(response.totalElements);
      setCurrentPage(response.currentPage + 1);
      setPageSize(response.pageSize);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải danh sách đơn hàng';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [token, searchParams]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearch = (value: string) => {
    setSearchParams(prev => ({
      ...prev,
      keyword: value,
      page: 0
    }));
  };

  const handleStatusChange = (value: string) => {
    setSearchParams(prev => ({
      ...prev,
      status: value,
      page: 0
    }));
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setSearchParams(prev => ({
      ...prev,
      page: (pagination.current || 1) - 1,
      size: pagination.pageSize || 10
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'shipping':
        return 'processing';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'shipping':
        return 'Đang giao hàng';
      case 'delivered':
        return 'Đã giao hàng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderCode',
      key: 'orderCode',
      render: (text: string, record: FarmerOrder) => (
        <Link href={`/farmer/my-orders/${record.id}`} className="text-blue-500 hover:text-blue-700">
          {text}
        </Link>
      ),
    },
    {
      title: 'Khách hàng',
      dataIndex: 'consumerName',
      key: 'consumerName',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'totalItems',
      key: 'totalItems',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Cập nhật lần cuối',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: unknown, record: FarmerOrder) => (
        <Link href={`/farmer/my-orders/${record.id}`}>
          <Button type="primary" icon={<EyeOutlined />}>
            Chi tiết
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card title="Quản lý đơn hàng" className="mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <Input
            placeholder="Tìm kiếm theo mã đơn hàng hoặc tên khách hàng"
            prefix={<SearchOutlined />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            style={{ width: 300 }}
          />
          <Select
            placeholder="Trạng thái đơn hàng"
            style={{ width: 200 }}
            onChange={handleStatusChange}
            allowClear
          >
            <Option value="pending">Chờ xử lý</Option>
            <Option value="shipping">Đang giao hàng</Option>
            <Option value="delivered">Đã giao hàng</Option>
            <Option value="cancelled">Đã hủy</Option>
          </Select>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => fetchOrders()}
          >
            Làm mới
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showTotal: (total: number) => `Tổng số ${total} đơn hàng`,
          }}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default FarmerOrdersPage; 