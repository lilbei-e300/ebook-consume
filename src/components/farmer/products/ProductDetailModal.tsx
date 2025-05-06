import React from 'react';
import { Modal, Descriptions, Image, Tag } from 'antd';
import { FarmerProduct } from '@/types/farmerProduct';

interface ProductDetailModalProps {
  product: FarmerProduct | null;
  visible: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  visible,
  onClose,
}) => {
  if (!product) return null;

  const statusMap = {
    pending: { text: 'Chờ duyệt', color: 'orange' },
    approved: { text: 'Đã duyệt', color: 'green' },
    rejected: { text: 'Từ chối', color: 'red' }
  };

  return (
    <Modal
      title="Chi tiết sản phẩm"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Tên sản phẩm" span={2}>
          {product.name}
        </Descriptions.Item>
        <Descriptions.Item label="Mô tả" span={2}>
          {product.description}
        </Descriptions.Item>
        <Descriptions.Item label="Giá">
          {product.price.toLocaleString()} VNĐ
        </Descriptions.Item>
        <Descriptions.Item label="Số lượng">
          {product.stock}
        </Descriptions.Item>
        <Descriptions.Item label="Danh mục">
          {product.category}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color={statusMap[product.status as keyof typeof statusMap].color}>
            {statusMap[product.status as keyof typeof statusMap].text}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Mã QR" span={2}>
          {product.qrCode}
        </Descriptions.Item>
        <Descriptions.Item label="Thông tin nguồn gốc" span={2}>
          {product.originInfo}
        </Descriptions.Item>
        <Descriptions.Item label="Hình ảnh" span={2}>
          <div className="flex gap-4">
            {product.imageUrls.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`${product.name} ${index + 1}`}
                width={150}
                height={150}
                className="object-cover"
              />
            ))}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">
          {new Date(product.createdAt).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật">
          {new Date(product.updatedAt).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ProductDetailModal; 