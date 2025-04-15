import React, { useState } from 'react';
import { Modal, Button, Tag, Input } from 'antd';
import { UpdateUserInfoRequest, User } from '@/types/user';


interface UserDetailModalProps {
  user: User | null;
  visible: boolean;
  onClose: () => void;
  onUpdateStatus: (user: User, newStatus: string) => void;
  onUpdateInfo: (user: User, formData: UpdateUserInfoRequest) => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  user,
  visible,
  onClose,
  onUpdateStatus,
  onUpdateInfo
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });

  if (!user) return null;

  return (
    <Modal
      title="Chi tiết người dùng"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <div className="space-y-4">
        {!isEditing ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">ID</p>
                <p className="font-medium">{user.id}</p>
              </div>
              <div>
                <p className="text-gray-500">Tên đăng nhập</p>
                <p className="font-medium">{user.username}</p>
              </div>
              <div>
                <p className="text-gray-500">Họ tên</p>
                <p className="font-medium">{user.fullName}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Số điện thoại</p>
                <p className="font-medium">{user.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Vai trò</p>
                <p className="font-medium">
                  <Tag color={
                    user.role === 'farmer' ? 'green' :
                    user.role === 'transporter' ? 'blue' : 'default'
                  }>
                    {user.role}
                  </Tag>
                </p>
              </div>
              <div>
                <p className="text-gray-500">Trạng thái</p>
                <p className="font-medium">
                  <Tag color={
                    user.status === 'active' ? 'success' :
                    user.status === 'locked' ? 'error' : 'warning'
                  }>
                    {user.status}
                  </Tag>
                </p>
              </div>
              <div>
                <p className="text-gray-500">Ngày tạo</p>
                <p className="font-medium">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
              {user.status === 'active' ? (
                <Button danger onClick={() => onUpdateStatus(user, 'locked')}>
                  Khóa tài khoản
                </Button>
              ) : user.status === 'locked' ? (
                <Button type="primary" onClick={() => onUpdateStatus(user, 'active')}>
                  Mở khóa tài khoản
                </Button>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 mb-1">Họ tên</p>
                <Input
                  value={editForm.fullName}
                  onChange={e => setEditForm({...editForm, fullName: e.target.value})}
                  placeholder="Nhập họ tên"
                  autoFocus
                />
              </div>
              <div>
                <p className="text-gray-500 mb-1">Email</p>
                <Input
                  value={editForm.email}
                  onChange={e => setEditForm({...editForm, email: e.target.value})}
                  placeholder="Nhập email"
                />
              </div>
              <div>
                <p className="text-gray-500 mb-1">Số điện thoại</p>
                <Input
                  value={editForm.phone}
                  onChange={e => setEditForm({...editForm, phone: e.target.value})}
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div>
                <p className="text-gray-500 mb-1">Địa chỉ</p>
                <Input.TextArea
                  value={editForm.address}
                  onChange={e => setEditForm({...editForm, address: e.target.value})}
                  placeholder="Nhập địa chỉ"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button onClick={() => setIsEditing(false)}>Hủy</Button>
              <Button type="primary" onClick={() => onUpdateInfo(user, {
                userId: user.id,
                fullName: editForm.fullName,
                email: editForm.email,
                phone: editForm.phone,
                address: editForm.address
              })}>Lưu thay đổi</Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default UserDetailModal; 