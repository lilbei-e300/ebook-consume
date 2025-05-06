"use client";
import React from 'react';
import { Tabs } from 'antd';
import ProfileForm from '@/components/farmer/profile/ProfileForm';
import ChangePasswordForm from '@/components/farmer/profile/ChangePasswordForm';

const ProfilePage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý thông tin cá nhân</h1>
      
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: '1',
            label: 'Thông tin cá nhân',
            children: <ProfileForm />,
          },
          {
            key: '2',
            label: 'Thay đổi mật khẩu',
            children: <ChangePasswordForm />,
          },
        ]}
      />
    </div>
  );
};

export default ProfilePage; 