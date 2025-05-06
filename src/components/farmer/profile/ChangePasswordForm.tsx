"use client";
import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useAuth } from '@/context/AuthContext';
import { farmerProfileService, ChangePasswordRequest } from '@/services/farmer/farmerProfileService';

const ChangePasswordForm: React.FC = () => {
  const [form] = Form.useForm();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ChangePasswordRequest) => {
    if (!token) return;
    
    try {
      setLoading(true);
      await farmerProfileService.changePassword(values, token);
      message.success('Thay đổi mật khẩu thành công');
      form.resetFields();
    } catch (error) {
      console.error('Error changing password:', error);
      message.error('Lỗi khi thay đổi mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card title="Thay đổi mật khẩu">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="oldPassword"
            label="Mật khẩu cũ"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Thay đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePasswordForm; 