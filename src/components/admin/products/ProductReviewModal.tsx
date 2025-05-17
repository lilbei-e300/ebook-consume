import React, { useState } from 'react';
import { Modal, Form, Input, Radio, message } from 'antd';
import { Product, ProductReviewRequest } from '@/types/product';
import { adminProductService } from '@/services/admin/productService';

interface ProductReviewModalProps {
  product: Product;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ProductReviewFormValues {
  status: 'approved' | 'rejected';
  reason: string;
}

const ProductReviewModal: React.FC<ProductReviewModalProps> = ({
  product,
  visible,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ProductReviewFormValues) => {
    try {
      setLoading(true);
      const reviewData: ProductReviewRequest = {
        productId: product.id,
        status: values.status,
        reason: values.reason
      };
      await adminProductService.reviewProduct(reviewData);
      message.success('Đã cập nhật trạng thái sản phẩm');
      onSuccess();
      onClose();
    } catch {
      message.error('Có lỗi xảy ra khi cập nhật trạng thái sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Duyệt sản phẩm"
      open={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ status: 'approved' }}
      >
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Radio.Group>
            <Radio value="approved">Duyệt</Radio>
            <Radio value="rejected">Từ chối</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="reason"
          label="Lý do"
          rules={[{ required: true, message: 'Vui lòng nhập lý do' }]}
        >
          <Input.TextArea rows={4} placeholder="Nhập lý do duyệt/từ chối sản phẩm" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductReviewModal; 