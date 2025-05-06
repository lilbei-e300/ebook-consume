"use client";

import { Card, Col, Row, Statistic } from "antd";
import { ShoppingCartOutlined, DollarOutlined, UserOutlined, ProductOutlined } from "@ant-design/icons";
import React from "react";

export default function FarmerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <ShoppingCartOutlined className="text-2xl" />
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng sản phẩm"
                value={0}
                prefix={<ProductOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Đơn hàng"
                value={0}
                prefix={<ShoppingCartOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Doanh thu"
                value={0}
                prefix={<DollarOutlined />}
                suffix="đ"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Khách hàng"
                value={0}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
} 