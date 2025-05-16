import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import { farmerProductService } from '@/services/farmer/farmerProductService';
import { FarmerProduct, FarmerProductSearchParams } from '@/types/farmerProduct';
import ProductDetailModal from './ProductDetailModal';
import ProductFormModal from './ProductFormModal';
import { toast } from 'react-hot-toast';

const { Search } = Input;
const { Option } = Select;

const ProductList: React.FC = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState<FarmerProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchParams, setSearchParams] = useState<FarmerProductSearchParams>({});
  const [selectedProduct, setSelectedProduct] = useState<FarmerProduct | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const fetchProducts = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const response = await farmerProductService.searchProducts({
        ...searchParams,
        page: currentPage - 1,
        size: pageSize
      }, token);
      
      setProducts(response.data.products);
      setTotal(response.data.totalElements);
    } catch (error: unknown) {
      console.error('Error fetching products:', error);
      toast.error('Lỗi khi tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, pageSize, searchParams, token]);

  const handleSearch = (value: string) => {
    setSearchParams(prev => ({ ...prev, keyword: value }));
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSearchParams(prev => ({ ...prev, category: value }));
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setSearchParams(prev => ({ ...prev, status: value }));
    setCurrentPage(1);
  };

  const handleViewDetail = (product: FarmerProduct) => {
    setSelectedProduct(product);
    setIsDetailModalVisible(true);
  };

  const handleEdit = (product: FarmerProduct) => {
    setSelectedProduct(product);
    setFormMode('edit');
    setIsFormModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    
    try {
      await farmerProductService.deleteProduct(id, token);
      toast.success('Xóa sản phẩm thành công');
      fetchProducts();
    } catch (error: unknown) {
      console.error('Error deleting product:', error);
      toast.error('Lỗi khi xóa sản phẩm');
    }
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setFormMode('create');
    setIsFormModalVisible(true);
  };

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: 'Số lượng',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          'approved': { text: 'Đã duyệt', color: 'text-green-500' },
          'pending': { text: 'Chờ duyệt', color: 'text-yellow-500' },
          'rejected': { text: 'Từ chối', color: 'text-red-500' }
        };
        const statusInfo = statusMap[status as keyof typeof statusMap] || { text: status, color: 'text-gray-500' };
        return <span className={statusInfo.color}>{statusInfo.text}</span>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: unknown, record: FarmerProduct) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => handleViewDetail(record)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          Thêm sản phẩm
        </Button>
      </div>

      <div className="flex gap-4 mb-4">
        <Search
          placeholder="Tìm kiếm sản phẩm"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        <Select
          placeholder="Danh mục"
          style={{ width: 200 }}
          onChange={handleCategoryChange}
          allowClear
        >
          <Option value="Rau củ">Rau củ</Option>
          <Option value="Trái cây">Trái cây</Option>
        </Select>
        <Select
          placeholder="Trạng thái"
          style={{ width: 200 }}
          onChange={handleStatusChange}
          allowClear
        >
          <Option value="approved">Đã duyệt</Option>
          <Option value="pending">Chờ duyệt</Option>
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
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
      />

      {isDetailModalVisible && (
      <ProductDetailModal
        product={selectedProduct}
        visible={isDetailModalVisible}
        onClose={() => setIsDetailModalVisible(false)}
      />
      )}

      {isFormModalVisible && (
      <ProductFormModal
        mode={formMode}
        product={selectedProduct}
        visible={isFormModalVisible}
        onClose={() => setIsFormModalVisible(false)}
        onSuccess={fetchProducts}
      />
      )}
    </div>
  );
};

export default ProductList; 