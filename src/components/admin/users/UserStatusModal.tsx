import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import { User } from '@/types/user';

interface UserStatusModalProps {
  user: User | null;
  visible: boolean;
  onClose: () => void;
  onConfirm: (userId: number, status: string, reason: string) => Promise<void>;
  action: 'lock' | 'unlock';
}

const UserStatusModal: React.FC<UserStatusModalProps> = ({
  user,
  visible,
  onClose,
  onConfirm,
  action
}) => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleConfirm = async () => {
    if (!reason) {
      message.error('Vui lòng nhập lý do');
      return;
    }

    setLoading(true);
    try {
      await onConfirm(user.id, action === 'lock' ? 'locked' : 'active', reason);
      setReason('');
      onClose();
    } catch (error) {
      console.error('Error updating user status:', error);
      message.error('Có lỗi xảy ra khi cập nhật trạng thái người dùng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={action === 'lock' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
      open={visible}
      onOk={handleConfirm}
      onCancel={onClose}
      confirmLoading={loading}
      okText={action === 'lock' ? 'Khóa' : 'Mở khóa'}
      cancelText="Hủy"
      okButtonProps={{ danger: action === 'lock' }}
    >
      <div className="space-y-4">
        <p>
          {action === 'lock' 
            ? `Bạn có chắc chắn muốn khóa tài khoản của ${user.fullName}?`
            : `Bạn có chắc chắn muốn mở khóa tài khoản của ${user.fullName}?`
          }
        </p>
        <div>
          <p className="text-gray-500 mb-1">Lý do</p>
          <Input.TextArea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder={action === 'lock' ? 'Nhập lý do khóa tài khoản' : 'Nhập lý do mở khóa tài khoản'}
            rows={3}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UserStatusModal; 