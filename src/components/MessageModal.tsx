"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { messageService } from '@/services/consumer/messageService';

interface MessageModalProps {
  farmerId: number;
  farmerName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function MessageModal({ farmerId, farmerName, isOpen, onClose, onSuccess }: MessageModalProps) {
  const { token } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() || !token) return;

    try {
      setIsSubmitting(true);
      await messageService.sendMessage(farmerId, { content }, token);
      setContent('');
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-[5000]">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl transform transition-all">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Nhắn tin với {farmerName}
        </h3>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nhập nội dung tin nhắn..."
          className="w-full p-3 border border-gray-200 rounded-lg mb-4 h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
          </button>
        </div>
      </div>
    </div>
  );
} 