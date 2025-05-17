'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/userService';
import { Table, Input, Select, Button, Space, Tag, message, TablePaginationConfig } from 'antd';
import { ReloadOutlined, EyeOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import UserDetailModal from '@/components/admin/users/UserDetailModal';
import UserStatusModal from '@/components/admin/users/UserStatusModal';
import { User, UserSearchParams } from '@/types/user';

interface UserUpdateInfo {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

const { Search } = Input;

export default function UserManagement() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useState<UserSearchParams>({
    page: 0,
    size: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc'
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [statusAction, setStatusAction] = useState<'lock' | 'unlock'>('lock');

  const fetchUsers = useCallback(async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await userService.searchUsers(searchParams, token);
      if (response.code === 200) {
        const filteredUsers = response.data.users.filter(user => user.role !== 'admin').map(user => ({
          ...user,
          role: user.role as 'admin' | 'farmer' | 'transporter' | 'consumer',
          status: user.status as 'active' | 'locked' | 'pending'
        }));
        setUsers(filteredUsers);
        setTotal(filteredUsers.length);
      } else {
        message.error(response.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('Có lỗi xảy ra khi tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  }, [token, searchParams]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (value: string) => {
    setSearchParams(prev => ({
      ...prev,
      keyword: value,
      page: 0
    }));
  };

  const handleRoleChange = (value: string) => {
    setSearchParams(prev => ({
      ...prev,
      role: value,
      page: 0
    }));
  };

  const handleStatusChange = (value: string) => {
    setSearchParams(prev => ({
      ...prev,
      status: value,
      page: 0
    }));
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setSearchParams(prev => ({
      ...prev,
      page: (pagination.current || 1) - 1,
      size: pagination.pageSize || 10
    }));
  };

  const handleViewDetail = (user: User) => {
    setSelectedUser(user);
    setIsDetailModalVisible(true);
  };

  const handleUpdateStatus = async (userId: number, status: string, reason: string) => {
    if (!token) return;

    try {
      const response = await userService.updateUserStatus({
        userId,
        status: status as 'active' | 'locked' | 'pending',
        reason
      }, token);

      if (response.code === 200) {
        message.success(`Đã ${status === 'locked' ? 'khóa' : 'mở khóa'} tài khoản thành công`);
        fetchUsers();
      } else {
        message.error(response.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      message.error('Có lỗi xảy ra khi cập nhật trạng thái người dùng');
    }
  };

  const handleUpdateInfo = async (user: User, formData: UserUpdateInfo) => {
    if (!token) return;

    try {
      const response = await userService.updateUserInfo({
        userId: user.id,
        ...formData
      }, token);

      if (response.code === 200) {
        message.success('Cập nhật thông tin thành công');
        fetchUsers();
      } else {
        message.error(response.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      message.error('Có lỗi xảy ra khi cập nhật thông tin người dùng');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
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
      render: (role: string) => {
        const color = role === 'admin' ? 'red' : 
                     role === 'farmer' ? 'green' : 
                     role === 'transporter' ? 'blue' : 'default';
        return <Tag color={color}>{role}</Tag>;
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'active' ? 'success' : 
                     status === 'pending' ? 'warning' : 'error';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: unknown, record: User) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          />
          {record.status === 'active' ? (
            <Button 
              icon={<LockOutlined />}
              danger
              onClick={() => {
                setSelectedUser(record);
                setStatusAction('lock');
                setIsStatusModalVisible(true);
              }}
            />
          ) : record.status === 'locked' ? (
            <Button 
              icon={<UnlockOutlined />}
              onClick={() => {
                setSelectedUser(record);
                setStatusAction('unlock');
                setIsStatusModalVisible(true);
              }}
            />
          ) : null}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-4 flex gap-4">
        <Search
          placeholder="Tìm kiếm người dùng"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        <Select
          placeholder="Vai trò"
          style={{ width: 120 }}
          onChange={handleRoleChange}
          allowClear
        >
          <Select.Option value="farmer">Nông dân</Select.Option>
          <Select.Option value="transporter">Vận chuyển</Select.Option>
          <Select.Option value="consumer">Người dùng</Select.Option>
        </Select>
        <Select
          placeholder="Trạng thái"
          style={{ width: 120 }}
          onChange={handleStatusChange}
          allowClear
        >
          <Select.Option value="active">Hoạt động</Select.Option>
          <Select.Option value="locked">Đã khóa</Select.Option>
          <Select.Option value="pending">Chờ duyệt</Select.Option>
        </Select>
        <Button 
          icon={<ReloadOutlined />}
          onClick={() => {
            setSearchParams({
              page: 0,
              size: 10,
              sortBy: 'createdAt',
              sortDirection: 'desc'
            });
          }}
        >
          Làm mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{
          total,
          pageSize: searchParams.size,
          current: searchParams.page + 1,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} người dùng`
        }}
        onChange={handleTableChange}
        scroll={{ x: 1200 }}
      />

      <UserDetailModal
        user={selectedUser}
        visible={isDetailModalVisible}
        onClose={() => setIsDetailModalVisible(false)}
        onUpdateStatus={(user, status) => {
          setSelectedUser(user);
          setStatusAction(status === 'locked' ? 'lock' : 'unlock');
          setIsStatusModalVisible(true);
        }}
        onUpdateInfo={handleUpdateInfo}
      />

      <UserStatusModal
        user={selectedUser}
        visible={isStatusModalVisible}
        onClose={() => setIsStatusModalVisible(false)}
        onConfirm={handleUpdateStatus}
        action={statusAction}
      />
    </div>
  );
} 