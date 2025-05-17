"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { Card, Form, Input, Button, message, Upload } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, UploadOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import { farmerProfileService, UpdateProfileRequest } from '@/services/farmer/farmerProfileService';
import { useRouter } from 'next/navigation';
import type { UploadFile } from 'antd/es/upload/interface';
import { RcFile } from 'antd/es/upload';

const ProfilePage = () => {
  const { token } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await farmerProfileService.getProfile(token);
      form.setFieldsValue(response);
      if (response.imageUrl) {
        setFileList([{
          uid: '-1',
          name: 'avatar.png',
          status: 'done',
          url: response.imageUrl,
        }]);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải thông tin cá nhân';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [token, form]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleUpdateProfile = async (values: UpdateProfileRequest) => {
    if (!token) return;
    try {
      setLoading(true);
      await farmerProfileService.updateProfile(values, token);
      message.success('Cập nhật thông tin thành công');
      fetchProfile();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi cập nhật thông tin';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: RcFile) => {
    if (!token) return false;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      await farmerProfileService.updateAvatar(file, token);
      message.success('Tải lên ảnh đại diện thành công');
      fetchProfile();
      return false;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải lên ảnh đại diện';
      message.error(errorMessage);
      return false;
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file: RcFile) => {
      setFileList([file]);
      handleUpload(file);
      return false;
    },
    fileList,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Thông tin cá nhân</h1>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
        >
          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ' }
            ]}
          >
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>

          <Form.Item label="Ảnh đại diện">
            <Upload {...uploadProps} listType="picture">
              <Button icon={<UploadOutlined />} loading={uploading}>
                Tải lên ảnh đại diện
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Cập nhật thông tin
            </Button>
            <Button 
              type="link" 
              onClick={() => router.push('/farmer/profile/change-password')}
              className="ml-4"
            >
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProfilePage; 