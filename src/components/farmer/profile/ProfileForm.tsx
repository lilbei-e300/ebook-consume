"use client";
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Card, Row, Col, Statistic, Avatar } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import { farmerProfileService, FarmerProfile, UpdateProfileRequest } from '@/services/farmer/farmerProfileService';
import type { RcFile, UploadFile as AntUploadFile } from 'antd/es/upload/interface';

interface UploadFile extends AntUploadFile {
  originFileObj?: RcFile;
}

const ProfileForm: React.FC = () => {
  const [form] = Form.useForm();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const response = await farmerProfileService.getProfile(token);
      setProfile(response.data);
      
      // Cập nhật form với dữ liệu từ API
      form.setFieldsValue({
        fullName: response.data.fullName,
        email: response.data.email,
        phone: response.data.phone,
        address: response.data.address,
        farmName: response.data.farmName,
        farmAddress: response.data.farmAddress,
        certification: response.data.certification,
        bio: response.data.bio
      });

      // Cập nhật ảnh đại diện nếu có
      if (response.data.imageUrl) {
        setFileList([{
          uid: '-1',
          name: 'avatar.jpg',
          status: 'done',
          url: response.data.imageUrl
        }]);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      message.error('Lỗi khi tải thông tin profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: UpdateProfileRequest) => {
    if (!token) return;
    
    try {
      setLoading(true);
      await farmerProfileService.updateProfile(values, token);
      message.success('Cập nhật thông tin thành công');
      fetchProfile(); // Tải lại thông tin sau khi cập nhật
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Lỗi khi cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: RcFile) => {
    if (!token) return false;

    try {
      // Tạo URL preview ngay lập tức
      const previewUrl = URL.createObjectURL(file);
      
      // Thêm file vào danh sách với trạng thái done và lưu file gốc
      setFileList([{
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: previewUrl,
        originFileObj: file,
      }]);

      // Upload file lên server
      const response = await farmerProfileService.updateAvatar(file, token);
      
      // Cập nhật URL từ server
      setFileList([{
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: response.data.imageUrl,
      }]);

      message.success('Cập nhật ảnh đại diện thành công');
      return false;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      message.error('Lỗi khi tải lên ảnh đại diện');
      return false;
    }
  };

  return (
    <div className="p-6">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Thông tin cá nhân" loading={loading}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập email' },
                      { type: 'email', message: 'Email không hợp lệ' }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="farmName"
                    label="Tên trang trại"
                    rules={[{ required: true, message: 'Vui lòng nhập tên trang trại' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="farmAddress"
                    label="Địa chỉ trang trại"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ trang trại' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="certification"
                label="Chứng nhận"
                rules={[{ required: true, message: 'Vui lòng nhập chứng nhận' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="bio"
                label="Giới thiệu"
                rules={[{ required: true, message: 'Vui lòng nhập giới thiệu' }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item label="Ảnh đại diện">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={handleUpload}
                  maxCount={1}
                >
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Tải lên</div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Cập nhật thông tin
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>

      {profile && (
        <Row gutter={[16, 16]} className="mt-4">
          <Col span={6}>
            <Card>
              <Statistic title="Tổng số sản phẩm" value={profile.statistics.totalProducts} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Tổng số đơn hàng" value={profile.statistics.totalOrders} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Tổng số đánh giá" value={profile.statistics.totalReviews} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic 
                title="Đánh giá trung bình" 
                value={profile.statistics.averageRating} 
                precision={1}
                suffix="/ 5"
              />
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProfileForm; 