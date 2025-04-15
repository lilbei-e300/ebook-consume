import React, { useState } from 'react';
import { Modal, Form, Input, Radio, message } from 'antd';
import { Product } from '@/types/product';
import { adminProductService } from '@/services/admin/productService';

interface ProductReviewModalProps {
  product: Product;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ProductReviewModal: React.FC<ProductReviewModalProps> = ({
  product,
  visible,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await adminProductService.reviewProduct({
        productId: product.id,
        status: values.status,
        reason: values.reason
      });
      message.success('Đã cập nhật trạng thái sản phẩm');
      onSuccess();
      onClose();
    } catch (error) {
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