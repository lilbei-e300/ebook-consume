"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { productSellService, Product } from '@/services/farmer/productSellService';
import { Button, Input, Select, Table, Tag, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { TablePaginationConfig } from 'antd/es/table';

const { Option } = Select;

const SellingProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [sellStatus, setSellStatus] = useState<'approved' | 'rejected'>('approved');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productSellService.getSellingProducts({
        keyword,
        sellStatus,
        page: currentPage - 1,
        size: pageSize,
      });
      setProducts(response.products);
      setTotal(response.totalElements);
    } catch {
      message.error('Lỗi khi tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  }, [keyword, sellStatus, currentPage, pageSize]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setCurrentPage(newPagination.current || 1);
    setPageSize(newPagination.pageSize || 10);
  };

  const handleUpdateStatus = async (productId: number, newStatus: 'draft' | 'approved' | 'rejected') => {
    try {
      await productSellService.updateSellStatus({
        productId,
        newStatus,
        note: `Cập nhật trạng thái thành ${newStatus}`,
      });
      message.success('Cập nhật trạng thái thành công');
      fetchProducts();
    } catch {
      message.error('Lỗi khi cập nhật trạng thái');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString('vi-VN')}đ`,
    },
    {
      title: 'Số lượng',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status === 'approved' ? 'Đã duyệt' : 'Từ chối'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: unknown, record: Product) => (
        <div className="flex gap-2">
          <Button onClick={() => handleUpdateStatus(record.id, 'draft')}>
            Hủy đăng bán
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Tìm kiếm sản phẩm"
          prefix={<SearchOutlined />}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Chọn trạng thái"
          value={sellStatus}
          onChange={setSellStatus}
          style={{ width: 200 }}
        >
          <Option value="approved">Đã duyệt</Option>
          <Option value="rejected">Từ chối</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default SellingProductList; 