"use client";

import React from 'react';
import { Tabs } from 'antd';
import SellableProductList from '@/components/farmer/products/SellableProductList';
import SellingProductList from '@/components/farmer/products/SellingProductList';

const AddProductPage: React.FC = () => {
  const items = [
    {
      key: 'sellable',
      label: 'Sản phẩm có thể đăng bán',
      children: <SellableProductList />,
    },
    {
      key: 'selling',
      label: 'Sản phẩm đang bán',
      children: <SellingProductList />,
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý đăng bán sản phẩm</h1>
      <Tabs items={items} />
    </div>
  );
};

export default AddProductPage; 