"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { messageService } from "@/services/messageService";
import { FarmerChat } from "@/types/message";
import Image from "next/image";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function MessagesPage() {
  const router = useRouter();
  const [chats, setChats] = useState<FarmerChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await messageService.getChatList();
        setChats(response.farmers);
      } catch (err) {
        setError("Không thể tải danh sách tin nhắn");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{error}</h1>
          <button
            onClick={() => router.refresh()}
            className="text-blue-600 hover:underline"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Chưa có tin nhắn nào
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bạn có thể bắt đầu trò chuyện với nông dân từ trang chi tiết sản phẩm
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Tin nhắn của tôi
      </h1>
      <div className="space-y-4">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => router.push(`/messages/${chat.id}`)}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  {chat.avatarUrl ? (
                    <Image
                      src={chat.avatarUrl}
                      alt={chat.fullName}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 text-lg">
                      {chat.fullName.charAt(0)}
                    </span>
                  )}
                </div>
                {!chat.isRead && (
                  <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                    {chat.fullName}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(chat.lastMessageTime), "HH:mm", { locale: vi })}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {chat.farmName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unreadCount > 0 && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-white text-xs font-medium">
                    {chat.unreadCount}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 