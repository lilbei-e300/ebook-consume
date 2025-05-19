export interface CustomerInteraction {
  type: 'review' | 'message';
  id: number;
  customerId: number;
  customerName: string;
  customerAvatar: string | null;
  content: string;
  timestamp: string;
  relatedEntityId: number;
  relatedEntityName: string;
  status: 'unreplied' | 'replied';
}

export interface CustomerInteractionResponse {
  totalUnreadMessages: number;
  totalUnrepliedReviews: number;
  recentInteractions: CustomerInteraction[];
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
} 