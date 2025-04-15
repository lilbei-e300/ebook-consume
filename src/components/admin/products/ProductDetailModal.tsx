import React from 'react';
import { Modal, Descriptions, Image, Tag, Divider } from 'antd';
import { Product } from '@/types/product';

interface ProductDetailModalProps {
  product: Product;
  visible: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  visible,
  onClose,
}) => {
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
      <Descriptions column={2}>
        <Descriptions.Item label="Tên sản phẩm">{product.name}</Descriptions.Item>
        <Descriptions.Item label="Mã QR">{product.qrCode}</Descriptions.Item>
        <Descriptions.Item label="Danh mục">{product.category}</Descriptions.Item>
        <Descriptions.Item label="Giá">{product.price.toLocaleString()} VNĐ</Descriptions.Item>
        <Descriptions.Item label="Số lượng">{product.stock}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color={statusMap[product.status].color}>
            {statusMap[product.status].text}
          </Tag>
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Thông tin nông dân</Divider>
      <Descriptions column={2}>
        <Descriptions.Item label="Tên nông dân">{product.farmerName}</Descriptions.Item>
        <Descriptions.Item label="Email">{product.farmerEmail}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">{product.farmerPhone}</Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Thông tin sản phẩm</Divider>
      <Descriptions column={1}>
        <Descriptions.Item label="Mô tả">{product.description}</Descriptions.Item>
        <Descriptions.Item label="Thông tin nguồn gốc">{product.originInfo}</Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Hình ảnh sản phẩm</Divider>
      <div className="flex gap-2">
        {product.imageUrls.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`Product image ${index + 1}`}
            width={150}
            height={150}
            className="object-cover"
          />
        ))}
      </div>

      <Divider orientation="left">Thông tin kiểm duyệt</Divider>
      <Descriptions column={2}>
        <Descriptions.Item label="Ngày tạo">
          {new Date(product.createdAt).toLocaleString('vi-VN')}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật">
          {new Date(product.updatedAt).toLocaleString('vi-VN')}
        </Descriptions.Item>
        {product.reviewReason && (
          <Descriptions.Item label="Lý do duyệt">{product.reviewReason}</Descriptions.Item>
        )}
        {product.reviewDate && (
          <Descriptions.Item label="Ngày duyệt">
            {new Date(product.reviewDate).toLocaleString('vi-VN')}
          </Descriptions.Item>
        )}
        {product.reviewedBy && (
          <Descriptions.Item label="Người duyệt">{product.reviewedBy}</Descriptions.Item>
        )}
      </Descriptions>
    </Modal>
  );
};

export default ProductDetailModal; 