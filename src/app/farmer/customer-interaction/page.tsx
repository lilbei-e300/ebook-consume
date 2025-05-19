"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { customerInteractionService } from '@/services/farmer/customerInteractionService';
import { CustomerInteraction } from '@/types/customerInteraction';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function CustomerInteractionPage() {
  const { token } = useAuth();
  const [interactions, setInteractions] = useState<CustomerInteraction[]>([]);
  const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);
  const [totalUnrepliedReviews, setTotalUnrepliedReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<CustomerInteraction | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<CustomerInteraction | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        if (!token) return;
        const response = await customerInteractionService.getUnreadInteractions(token);
        setInteractions(response.recentInteractions);
        setTotalUnreadMessages(response.totalUnreadMessages);
        setTotalUnrepliedReviews(response.totalUnrepliedReviews);
      } catch (error) {
        console.error('Error fetching interactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInteractions();
  }, [token]);

  const handleReply = async () => {
    if (!selectedReview || !replyContent.trim() || !token) return;

    try {
      setIsSubmitting(true);
      await customerInteractionService.replyReview({
        reviewId: selectedReview.id,
        content: replyContent,
        isHighlighted
      }, token);

      setInteractions(prev => prev.filter(i => i.id !== selectedReview.id));
      setTotalUnrepliedReviews(prev => prev - 1);
      setSelectedReview(null);
      setReplyContent('');
      setIsHighlighted(false);
    } catch (error) {
      console.error('Error replying to review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedMessage || !messageContent.trim() || !token) return;

    try {
      setIsSubmitting(true);
      await customerInteractionService.sendMessage({
        receiverId: selectedMessage.customerId,
        content: messageContent,
        orderId: selectedMessage.relatedEntityId
      }, token);

      setInteractions(prev => prev.filter(i => i.id !== selectedMessage.id));
      setTotalUnreadMessages(prev => prev - 1);
      setSelectedMessage(null);
      setMessageContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tương tác với khách hàng</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Tin nhắn chưa đọc</h2>
          <p className="text-3xl font-bold text-blue-600">{totalUnreadMessages}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Đánh giá chưa phản hồi</h2>
          <p className="text-3xl font-bold text-orange-600">{totalUnrepliedReviews}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold p-6 border-b">Tương tác gần đây</h2>
        <div className="divide-y">
          {interactions.map((interaction) => (
            <div key={interaction.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{interaction.customerName}</span>
                    <span className="text-sm text-gray-500">
                      {format(new Date(interaction.timestamp), 'HH:mm dd/MM/yyyy', { locale: vi })}
                    </span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      interaction.type === 'review' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {interaction.type === 'review' ? 'Đánh giá' : 'Tin nhắn'}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{interaction.content}</p>
                  <p className="text-sm text-gray-500">
                    Sản phẩm: {interaction.relatedEntityName}
                  </p>
                </div>
                {interaction.type === 'review' ? (
                  <button 
                    onClick={() => setSelectedReview(interaction)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Phản hồi
                  </button>
                ) : (
                  <button 
                    onClick={() => setSelectedMessage(interaction)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Trả lời
                  </button>
                )}
              </div>
            </div>
          ))}
          {interactions.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              Không có tương tác nào
            </div>
          )}
        </div>
      </div>

      {/* Modal phản hồi đánh giá */}
      {selectedReview && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-[5000]">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl transform transition-all">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Phản hồi đánh giá</h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2">Đánh giá từ {selectedReview.customerName}:</p>
              <p className="text-gray-600 italic bg-gray-50 p-3 rounded-lg border border-gray-100">&ldquo;{selectedReview.content}&rdquo;</p>
            </div>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Nhập nội dung phản hồi..."
              className="w-full p-3 border border-gray-200 rounded-lg mb-4 h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="highlight"
                checked={isHighlighted}
                onChange={(e) => setIsHighlighted(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="highlight" className="ml-2 text-gray-700">Đánh dấu là phản hồi nổi bật</label>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedReview(null);
                  setReplyContent('');
                  setIsHighlighted(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleReply}
                disabled={!replyContent.trim() || isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi phản hồi'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal trả lời tin nhắn */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-[5000]">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl transform transition-all">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Trả lời tin nhắn</h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2">Tin nhắn từ {selectedMessage.customerName}:</p>
              <p className="text-gray-600 italic bg-gray-50 p-3 rounded-lg border border-gray-100">&ldquo;{selectedMessage.content}&rdquo;</p>
            </div>
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Nhập nội dung tin nhắn..."
              className="w-full p-3 border border-gray-200 rounded-lg mb-4 h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedMessage(null);
                  setMessageContent('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageContent.trim() || isSubmitting}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 