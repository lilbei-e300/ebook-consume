"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, Descriptions, Table, Tag, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import { farmerOrderService, FarmerOrder } from '@/services/farmer/farmerOrderService';
import { formatCurrency, formatDate } from '@/utils/format';
import toast from 'react-hot-toast';

const OrderDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<FarmerOrder | null>(null);

  const fetchOrderDetail = async () => {
    if (!token || !id) return;
    
    try {
      setLoading(true);
      const response = await farmerOrderService.getOrderDetail(Number(id), token);
      setOrder(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải thông tin đơn hàng';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [token, id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'shipping':
        return 'processing';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'shipping':
        return 'Đang giao hàng';
      case 'delivered':
        return 'Đã giao hàng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => formatCurrency(price),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'subTotal',
      key: 'subTotal',
      render: (subTotal: number) => formatCurrency(subTotal),
    },
  ];

  if (!order) {
    return null;
  }

  return (
    <div className="p-6">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => router.back()}
        className="mb-4"
      >
        Quay lại
      </Button>

      <Card title={`Chi tiết đơn hàng ${order.orderCode}`} loading={loading}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Mã đơn hàng">{order.orderCode}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag color={getStatusColor(order.status)}>
              {getStatusText(order.status)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Tên khách hàng">{order.consumerName}</Descriptions.Item>
          <Descriptions.Item label="Email">{order.consumerEmail}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{order.consumerPhone}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ giao hàng">{order.shippingAddress}</Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">{formatDate(order.createdAt)}</Descriptions.Item>
          <Descriptions.Item label="Cập nhật lần cuối">{formatDate(order.updatedAt)}</Descriptions.Item>
          <Descriptions.Item label="Tổng tiền" span={2}>
            <span className="text-lg font-bold text-red-500">
              {formatCurrency(order.totalAmount)}
            </span>
          </Descriptions.Item>
        </Descriptions>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Danh sách sản phẩm</h3>
          <Table
            columns={columns}
            dataSource={order.items}
            rowKey="id"
            pagination={false}
          />
        </div>

        {order.transportUpdates.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Cập nhật vận chuyển</h3>
            <Table
              dataSource={order.transportUpdates}
              rowKey="id"
              pagination={false}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default OrderDetailPage; 