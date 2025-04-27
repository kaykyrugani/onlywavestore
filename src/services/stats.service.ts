import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface Stats {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
  topProducts: {
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }[];
  topCategories: {
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }[];
  monthlyStats: {
    month: string;
    orders: number;
    revenue: number;
    users: number;
  }[];
  dailyStats: {
    date: string;
    orders: number;
    revenue: number;
    users: number;
  }[];
}

interface StatsFilters {
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  productId?: string;
  groupBy?: 'day' | 'month' | 'year';
}

interface ApiResponse<T> {
  data: T;
  message: string;
}

const statsService = {
  async getStats(): Promise<Stats> {
    try {
      const response = await axios.get<ApiResponse<Stats>>(`${API_URL}/stats`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw new Error('Não foi possível carregar as estatísticas');
    }
  },

  async getMonthlyStats(year: number): Promise<Stats['monthlyStats']> {
    try {
      const response = await axios.get<ApiResponse<Stats['monthlyStats']>>(
        `${API_URL}/stats/monthly`,
        { params: { year } }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas mensais:', error);
      throw new Error('Não foi possível carregar as estatísticas mensais');
    }
  },

  async getDailyStats(startDate: string, endDate: string): Promise<Stats['dailyStats']> {
    try {
      const response = await axios.get<ApiResponse<Stats['dailyStats']>>(
        `${API_URL}/stats/daily`,
        { params: { startDate, endDate } }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas diárias:', error);
      throw new Error('Não foi possível carregar as estatísticas diárias');
    }
  },

  async getTopProducts(limit = 10): Promise<Stats['topProducts']> {
    try {
      const response = await axios.get<ApiResponse<Stats['topProducts']>>(
        `${API_URL}/stats/top-products`,
        { params: { limit } }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar produtos mais vendidos:', error);
      throw new Error('Não foi possível carregar os produtos mais vendidos');
    }
  },

  async getTopCategories(limit = 10): Promise<Stats['topCategories']> {
    try {
      const response = await axios.get<ApiResponse<Stats['topCategories']>>(
        `${API_URL}/stats/top-categories`,
        { params: { limit } }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar categorias mais vendidas:', error);
      throw new Error('Não foi possível carregar as categorias mais vendidas');
    }
  },

  async exportStats(filters?: StatsFilters): Promise<Blob> {
    try {
      const response = await axios.get<Blob>(
        `${API_URL}/stats/export`,
        { 
          params: filters,
          responseType: 'blob'
        }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao exportar estatísticas:', error);
      throw new Error('Não foi possível exportar as estatísticas');
    }
  }
};

export default statsService; 