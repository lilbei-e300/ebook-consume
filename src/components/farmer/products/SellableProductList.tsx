"use client";

import React, { useState, useEffect } from 'react';
import { productSellService, Product } from '@/services/farmer/productSellService';
import { Button, Input, Select, Table, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { TablePaginationConfig } from 'antd/es/table';

const { Option } = Select;

const CATEGORIES = [
  { value: 'Rau củ', label: 'Rau củ' },
  { value: 'Trái cây', label: 'Trái cây' },
];

const SellableProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productSellService.getSellableProducts({
        keyword,
        category,
        page: pagination.current - 1,
        size: pagination.pageSize,
      });
      setProducts(response.products);
      setPagination({
        ...pagination,
        total: response.totalItems,
      });
    } catch {
      message.error('Lỗi khi tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [keyword, category, pagination.current, pagination.pageSize]);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination({
      ...pagination,
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || 10,
    });
  };

  const handleSellProduct = async (productId: number) => {
    try {
      await productSellService.sellProduct({
        productId,
        note: 'Sản phẩm tươi mới, thu hoạch ngày hôm nay',
      });
      message.success('Đăng bán sản phẩm thành công');
      fetchProducts();
    } catch {
      message.error('Lỗi khi đăng bán sản phẩm');
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
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
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
      title: 'Hành động',
      key: 'action',
      render: (_: unknown, record: Product) => (
        <Button type="primary" onClick={() => handleSellProduct(record.id)}>
          Đăng bán
        </Button>
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
          placeholder="Chọn danh mục sản phẩm"
          value={category}
          onChange={setCategory}
          style={{ width: 200 }}
          allowClear
          showSearch
          optionFilterProp="children"
        >
          {CATEGORIES.map((cat) => (
            <Option key={cat.value} value={cat.value}>
              {cat.label}
            </Option>
          ))}
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default SellableProductList; 