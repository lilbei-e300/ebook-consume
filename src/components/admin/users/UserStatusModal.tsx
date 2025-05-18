import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { User } from '@/types/user';

interface UserStatusModalProps {
  user: User | null;
  visible: boolean;
  onClose: () => void;
  onConfirm: (userId: number, status: string) => Promise<void>;
  action: 'lock' | 'unlock' | 'approve';
}

const UserStatusModal: React.FC<UserStatusModalProps> = ({
  user,
  visible,
  onClose,
  onConfirm,
  action
}) => {
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(user.id, action === 'lock' ? 'locked' : 'active');
      onClose();
    } catch (error) {
      console.error('Error updating user status:', error);
      message.error('Có lỗi xảy ra khi cập nhật trạng thái người dùng');
    } finally {
      setLoading(false);
    }
  };

  const getModalTitle = () => {
    switch (action) {
      case 'lock':
        return 'Khóa tài khoản';
      case 'unlock':
        return 'Mở khóa tài khoản';
      case 'approve':
        return 'Duyệt tài khoản';
      default:
        return '';
    }
  };

  const getModalContent = () => {
    switch (action) {
      case 'lock':
        return `Bạn có chắc chắn muốn khóa tài khoản của ${user.fullName}?`;
      case 'unlock':
        return `Bạn có chắc chắn muốn mở khóa tài khoản của ${user.fullName}?`;
      case 'approve':
        return `Bạn có chắc chắn muốn duyệt tài khoản của ${user.fullName}?`;
      default:
        return '';
    }
  };

  const getOkText = () => {
    switch (action) {
      case 'lock':
        return 'Khóa';
      case 'unlock':
        return 'Mở khóa';
      case 'approve':
        return 'Duyệt';
      default:
        return '';
    }
  };

  return (
    <Modal
      title={getModalTitle()}
      open={visible}
      onOk={handleConfirm}
      onCancel={onClose}
      confirmLoading={loading}
      okText={getOkText()}
      cancelText="Hủy"
      okButtonProps={{ danger: action === 'lock' }}
    >
      <div className="space-y-4">
        <p>{getModalContent()}</p>
      </div>
    </Modal>
  );
};

export default UserStatusModal; 