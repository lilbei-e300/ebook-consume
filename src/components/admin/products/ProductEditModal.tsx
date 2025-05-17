import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import { Product, ProductUpdateRequest } from '@/types/product';
import { adminProductService } from '@/services/admin/productService';

interface ProductEditModalProps {
  product: Product;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  originInfo: string;
  editReason: string;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({
  product,
  visible,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      setLoading(true);
      const { editReason, ...productData } = values;
      const updateData: ProductUpdateRequest = {
        ...productData,
        editReason
      };
      await adminProductService.updateProduct(product.id, updateData);
      message.success('Đã cập nhật thông tin sản phẩm');
      onSuccess();
      onClose();
    } catch {
      message.error('Có lỗi xảy ra khi cập nhật thông tin sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Chỉnh sửa sản phẩm"
      open={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={loading}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
          originInfo: product.originInfo,
        }}
      >
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá"
          rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
        >
          <InputNumber
            min={0}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => {
              const parsed = value ? Number(value.replace(/\$\s?|(,*)/g, '')) : 0;
              return parsed as 0;
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Số lượng"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="category"
          label="Danh mục"
          rules={[{ required: true, message: 'Vui lòng nhập danh mục' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="originInfo"
          label="Thông tin nguồn gốc"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin nguồn gốc' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="editReason"
          label="Lý do chỉnh sửa"
          rules={[{ required: true, message: 'Vui lòng nhập lý do chỉnh sửa' }]}
        >
          <Input.TextArea rows={4} placeholder="Nhập lý do chỉnh sửa thông tin sản phẩm" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductEditModal; 