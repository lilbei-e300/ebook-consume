import axios from 'axios';
import { API_URL } from '@/config/constants';

export interface MarketOverview {
  totalRevenue: number;
  monthlyRevenue: number;
  weeklyRevenue: number;
  dailyRevenue: number;
  revenueGrowth: number;
  topSellingProducts: TopSellingProduct[];
  monthlyRevenueChart: Record<string, number>;
  monthlySalesChart: Record<string, number>;
  totalCompletedOrders: number;
  totalProducts: number;
  totalActiveProducts: number;
  topCustomers: TopCustomer[];
}

export interface TopSellingProduct {
  productId: number;
  productName: string;
  imageUrl: string;
  soldQuantity: number;
  revenue: number;
  growthRate: number;
}

export interface TopCustomer {
  customerId: number;
  customerName: string;
  ordersCount: number;
  totalSpent: number;
}

export interface MarketTrends {
  startDate: string;
  endDate: string;
  period: string | null;
  topTrendingProducts: TrendingProduct[];
  decliningProducts: TrendingProduct[];
  seasonalDemand: Record<string, SeasonalDemand[]>;
  priceFluctuation: Record<string, number>;
  marketForecast: Record<string, MarketForecast>;
}

export interface MarketForecast {
  predictedRevenue: number;
  predictedOrders: number;
  confidence: number;
}

export interface TrendingProduct {
  productId: number;
  productName: string;
  imageUrl: string;
  soldQuantity: number;
  revenue: number;
  growthRate: number;
  priceHistory: PriceHistory[];
}

export interface PriceHistory {
  date: string;
  price: number;
}

export interface SeasonalDemand {
  productId: number;
  productName: string;
  demandQuantity: number;
  averagePrice: number;
}

export interface ProductRevenue {
  productId: number;
  productName: string;
  revenue: number;
  quantity: number;
  percentage: number;
}

export interface TimeBasedData {
  date: string;
  value: number;
}

export interface RegionRevenue {
  region: string;
  revenue: number;
  percentage: number;
}

export interface RevenueAnalysis {
  startDate: string;
  endDate: string;
  period: string | null;
  totalRevenue: number;
  revenueGrowth: number;
  averageOrderValue: number;
  totalOrders: number;
  productRevenues: ProductRevenue[];
  revenueByTime: Record<string, TimeBasedData>;
  ordersByTime: Record<string, TimeBasedData>;
  estimatedProfit: number;
  profitMargin: number;
  revenueByRegion: Record<string, RegionRevenue>;
}

export interface ExportReportRequest {
  startDate: string;
  endDate: string;
  period: string;
  reportFormat: 'pdf' | 'excel';
  sendEmail: boolean;
}

export interface ExportReportResponse {
  reportId: string;
  reportName: string;
  reportFormat: string;
  reportUrl: string;
  fileSize: number;
  generatedAt: string;
  sentByEmail: boolean;
  emailAddress: string;
  reportType: string;
}

export const farmerMarketAnalysisService = {
  getMarketOverview: async (token: string): Promise<MarketOverview> => {
    try {
      const response = await axios.get(`${API_URL}/farmer/market-analysis/overview`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  getMarketTrends: async (token: string): Promise<MarketTrends> => {
    try {
      const response = await axios.get(`${API_URL}/farmer/market-analysis/trends`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  getRevenueAnalysis: async (token: string): Promise<RevenueAnalysis> => {
    try {
      const response = await axios.get(`${API_URL}/farmer/market-analysis/revenue`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  exportReport: async (data: ExportReportRequest, token: string): Promise<ExportReportResponse> => {
    try {
      const response = await axios.post(`${API_URL}/farmer/market-analysis/export-report`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
}; 