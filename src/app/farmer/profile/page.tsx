"use client";
import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message, Upload, Row, Col, Statistic } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, HomeOutlined, ShopOutlined, FileTextOutlined, UploadOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import { farmerProfileService, FarmerProfile, UpdateProfileRequest } from '@/services/farmer/farmerProfileService';
import Image from 'next/image';

const { TextArea } = Input;

const FarmerProfilePage = () => {
  const { token } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const data = await farmerProfileService.getProfile(token);
      setProfile(data);
      form.setFieldsValue({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        farmName: data.farmName,
        farmAddress: data.farmAddress,
        certification: data.certification,
        bio: data.bio,
      });
    } catch (error) {
      message.error('Không thể tải thông tin hồ sơ');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (values: UpdateProfileRequest) => {
    if (!token) return;
    try {
      setLoading(true);
      const updatedProfile = await farmerProfileService.updateProfile(values, token);
      setProfile(updatedProfile);
      message.success('Cập nhật hồ sơ thành công');
    } catch (error) {
      message.error('Không thể cập nhật hồ sơ');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadAvatar = async (file: File) => {
    if (!token) return;
    try {
      setUploading(true);
      const updatedProfile = await farmerProfileService.updateAvatar(file, token);
      setProfile(updatedProfile);
      message.success('Cập nhật ảnh đại diện thành công');
    } catch (error) {
      message.error('Không thể cập nhật ảnh đại diện');
    } finally {
      setUploading(false);
    }
    return false;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Hồ sơ của tôi</h1>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card loading={loading}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleUpdateProfile}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                  >
                    <Input prefix={<UserOutlined />} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                  >
                    <Input prefix={<PhoneOutlined />} />
                  </Form.Item>
                </Col>
              </Row>

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
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
              >
                <Input prefix={<HomeOutlined />} />
              </Form.Item>

              <Form.Item
                name="farmName"
                label="Tên trang trại"
                rules={[{ required: true, message: 'Vui lòng nhập tên trang trại' }]}
              >
                <Input prefix={<ShopOutlined />} />
              </Form.Item>

              <Form.Item
                name="farmAddress"
                label="Địa chỉ trang trại"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ trang trại' }]}
              >
                <Input prefix={<HomeOutlined />} />
              </Form.Item>

              <Form.Item
                name="certification"
                label="Chứng nhận"
              >
                <Input prefix={<FileTextOutlined />} />
              </Form.Item>

              <Form.Item
                name="bio"
                label="Giới thiệu"
              >
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Cập nhật hồ sơ
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={8}>
          <Card loading={loading}>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={profile?.imageUrl || '/images/user/user.jpg'}
                  alt="Avatar"
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={handleUploadAvatar}
              >
                <Button icon={<UploadOutlined />} loading={uploading}>
                  Thay đổi ảnh đại diện
                </Button>
              </Upload>

              <div className="mt-6 w-full">
                <h3 className="text-lg font-semibold mb-4">Thống kê</h3>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Statistic
                      title="Sản phẩm"
                      value={profile?.statistics.totalProducts}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Đơn hàng"
                      value={profile?.statistics.totalOrders}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Đánh giá"
                      value={profile?.statistics.totalReviews}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Điểm đánh giá"
                      value={profile?.statistics.averageRating}
                      precision={1}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FarmerProfilePage; 