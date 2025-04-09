'use client';

import { useState, useEffect } from 'react';
import userService, { UserSearchParams } from '@/services/admin/userService';
import { Button, Input, Select, Table, Modal, Form, message } from 'antd';
import { SearchOutlined, EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import type { TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';

const { Option } = Select;

interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  address: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<UserSearchParams>({
    page: 0,
    size: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc'
  });
  const [total, setTotal] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.searchUsers(searchParams);
      setUsers(response.data.content);
      setTotal(response.data.totalElements);
    } catch (err) {
      message.error('Có lỗi xảy ra khi tải danh sách người dùng');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchParams]);

  const handleSearch = (values: Partial<UserSearchParams>) => {
    setSearchParams(prev => ({
      ...prev,
      ...values,
      page: 0
    }));
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<User> | SorterResult<User>[]
  ) => {
    setSearchParams(prev => ({
      ...prev,
      page: (pagination.current || 1) - 1,
      size: pagination.pageSize || 10,
      sortBy: Array.isArray(sorter) ? sorter[0]?.field as string : sorter.field as string,
      sortDirection: Array.isArray(sorter) 
        ? (sorter[0]?.order === 'descend' ? 'desc' : 'asc')
        : (sorter.order === 'descend' ? 'desc' : 'asc')
    }));
  };

  const handleStatusChange = async (userId: number, newStatus: string) => {
    try {
      await userService.updateUserStatus({
        userId,
        status: newStatus as 'active' | 'locked' | 'pending',
        reason: newStatus === 'active' ? 'Tài khoản đã được kích hoạt' : 'Tài khoản đã bị khóa'
      });
      message.success('Cập nhật trạng thái thành công');
      fetchUsers();
    } catch (err) {
      message.error('Có lỗi xảy ra khi cập nhật trạng thái');
      console.error('Error updating user status:', err);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleUpdateInfo = async (values: Omit<User, 'id' | 'role' | 'status'>) => {
    if (!selectedUser) return;
    
    try {
      await userService.updateUserInfo({
        userId: selectedUser.id,
        ...values
      });
      message.success('Cập nhật thông tin thành công');
      setIsModalVisible(false);
      fetchUsers();
    } catch (err) {
      message.error('Có lỗi xảy ra khi cập nhật thông tin');
      console.error('Error updating user info:', err);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={`status-${status.toLowerCase()}`}>
          {status === 'active' ? 'Hoạt động' : status === 'locked' ? 'Đã khóa' : 'Chờ duyệt'}
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: unknown, record: User) => (
        <div className="space-x-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          {record.status === 'active' ? (
            <Button
              danger
              icon={<LockOutlined />}
              onClick={() => handleStatusChange(record.id, 'locked')}
            >
              Khóa
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<UnlockOutlined />}
              onClick={() => handleStatusChange(record.id, 'active')}
            >
              Mở khóa
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý người dùng</h1>
      
      <Form
        layout="inline"
        onFinish={handleSearch}
        className="mb-6"
      >
        <Form.Item name="keyword">
          <Input
            placeholder="Tìm kiếm theo tên, email..."
            prefix={<SearchOutlined />}
            className="w-64"
          />
        </Form.Item>
        <Form.Item name="role">
          <Select placeholder="Vai trò" className="w-32">
            <Option value="farmer">Nông dân</Option>
            <Option value="consumer">Người tiêu dùng</Option>
            <Option value="transporter">Người vận chuyển</Option>
          </Select>
        </Form.Item>
        <Form.Item name="status">
          <Select placeholder="Trạng thái" className="w-32">
            <Option value="active">Hoạt động</Option>
            <Option value="locked">Đã khóa</Option>
            <Option value="pending">Chờ duyệt</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{
          total,
          current: searchParams.page! + 1,
          pageSize: searchParams.size,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />

      <Modal
        title="Cập nhật thông tin người dùng"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateInfo}
        >
          <Form.Item
            name="fullName"
            label="Họ tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          >
            <Input />
          </Form.Item>
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
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement; 