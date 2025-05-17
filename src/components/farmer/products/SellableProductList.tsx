"use client";

import React, { useState, useEffect, useCallback } from 'react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productSellService.getSellableProducts({
        keyword,
        category,
        page: currentPage - 1,
        size: pageSize,
      });
      setProducts(response.products);
      setTotal(response.totalItems);
    } catch {
      message.error('Lỗi khi tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  }, [keyword, category, currentPage, pageSize]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setCurrentPage(newPagination.current || 1);
    setPageSize(newPagination.pageSize || 10);
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

export default SellableProductList; 