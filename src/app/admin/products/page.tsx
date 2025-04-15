'use client';

import React, { useState, useEffect } from 'react';
import { adminProductService } from '@/services/admin/productService';
import { Product, ProductSearchRequest, ProductSearchResponse } from '@/types/product';
import { Table, Button, Input, Select, Modal, Form, message, Tag, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ProductDetailModal from '@/components/admin/products/ProductDetailModal';
import ProductReviewModal from '@/components/admin/products/ProductReviewModal';
import ProductEditModal from '@/components/admin/products/ProductEditModal';

const { Search } = Input;
const { Option } = Select;

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useState<ProductSearchRequest>({
    page: 0,
    size: 10,
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await adminProductService.searchProducts(searchParams);
      const data = response.data as ProductSearchResponse;
      setProducts(data.products);
      setTotal(data.totalElements);
    } catch (error) {
      message.error('Có lỗi xảy ra khi tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const handleSearch = (value: string) => {
    setSearchParams(prev => ({
      ...prev,
      farmerName: value,
      page: 0
    }));
  };

  const handleStatusChange = (value: string) => {
    setSearchParams(prev => ({
      ...prev,
      status: value as 'pending' | 'approved' | 'rejected',
      page: 0
    }));
  };

  const handleTableChange = (pagination: any) => {
    setSearchParams(prev => ({
      ...prev,
      page: pagination.current - 1,
      size: pagination.pageSize
    }));
  };

  const handleDelete = async () => {
    if (!selectedProduct || !deleteReason) return;

    try {
      await adminProductService.deleteProduct(selectedProduct.id, deleteReason);
      message.success('Đã xóa sản phẩm thành công');
      setIsDeleteModalVisible(false);
      setDeleteReason('');
      fetchProducts();
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa sản phẩm');
    }
  };

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Nông dân',
      dataIndex: 'farmerName',
      key: 'farmerName',
      width: 150,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price: number) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: 'Số lượng',
      dataIndex: 'stock',
      key: 'stock',
      width: 100,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        const statusMap = {
          pending: { text: 'Chờ duyệt', color: 'orange' },
          approved: { text: 'Đã duyệt', color: 'green' },
          rejected: { text: 'Từ chối', color: 'red' }
        };
        return (
          <Tag color={statusMap[status as keyof typeof statusMap].color}>
            {statusMap[status as keyof typeof statusMap].text}
          </Tag>
        );
      }
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (text: string, record: Product) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedProduct(record);
              setIsDetailModalVisible(true);
            }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedProduct(record);
              setIsEditModalVisible(true);
            }}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setSelectedProduct(record);
              setIsDeleteModalVisible(true);
            }}
          />
          {record.status === 'pending' && (
            <Button
              type="primary"
              onClick={() => {
                setSelectedProduct(record);
                setIsReviewModalVisible(true);
              }}
            >
              Duyệt
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-4 flex gap-4">
        <Search
          placeholder="Tìm kiếm theo tên nông dân"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        <Select
          placeholder="Lọc theo trạng thái"
          style={{ width: 200 }}
          onChange={handleStatusChange}
          allowClear
        >
          <Option value="pending">Chờ duyệt</Option>
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
          total,
          pageSize: searchParams.size,
          current: searchParams.page + 1,
        }}
        onChange={handleTableChange}
        scroll={{ x: 1200 }}
      />

      {selectedProduct && (
        <>
          <ProductDetailModal
            product={selectedProduct}
            visible={isDetailModalVisible}
            onClose={() => setIsDetailModalVisible(false)}
          />
          <ProductReviewModal
            product={selectedProduct}
            visible={isReviewModalVisible}
            onClose={() => setIsReviewModalVisible(false)}
            onSuccess={fetchProducts}
          />
          <ProductEditModal
            product={selectedProduct}
            visible={isEditModalVisible}
            onClose={() => setIsEditModalVisible(false)}
            onSuccess={fetchProducts}
          />
          <Modal
            title="Xác nhận xóa sản phẩm"
            open={isDeleteModalVisible}
            onOk={handleDelete}
            onCancel={() => {
              setIsDeleteModalVisible(false);
              setDeleteReason('');
            }}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <p>Bạn có chắc chắn muốn xóa sản phẩm "{selectedProduct.name}" không?</p>
            <Form layout="vertical">
              <Form.Item
                label="Lý do xóa"
                required
                rules={[{ required: true, message: 'Vui lòng nhập lý do xóa' }]}
              >
                <Input.TextArea
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  placeholder="Nhập lý do xóa sản phẩm"
                  rows={4}
                />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default AdminProductsPage; 