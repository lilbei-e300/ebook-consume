export interface FarmerChat {
  id: number;
  fullName: string;
  avatarUrl: string | null;
  farmName: string;
  lastMessage: string;
  lastMessageTime: string;
  isRead: boolean;
  unreadCount: number;
}

export interface ChatListResponse {
  farmers: FarmerChat[];
  totalUnread: number;
  totalFarmers: number;
  currentPage: number;
  totalPages: number;
}

export interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderAvatar: string | null;
  farmerId: number;
  farmerName: string;
  farmerAvatar: string | null;
  content: string;
  attachmentUrls: string[] | null;
  isRead: boolean;
  createdAt: string;
}

export interface MessageListResponse {
  content: Message[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  empty: boolean;
}

export interface SendMessageRequest {
  content: string;
  attachmentUrls?: string[];
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
} 