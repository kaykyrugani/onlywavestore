import api from '../lib/api';

export interface TopProduct {
  id: string;
  name: string;
  totalSold: number;
  revenue: number;
}

export interface RecentOrder {
  id: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
}

export interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: TopProduct[];
  recentOrders: RecentOrder[];
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  averageTicket: number;
  salesByMonth: Array<{
    month: string;
    sales: number;
  }>;
  topProducts: Array<{
    name: string;
    quantity: number;
  }>;
}

export interface DashboardFilters {
  startDate?: Date;
  endDate?: Date;
  categories?: string[];
  paymentMethods?: string[];
  orderStatus?: string[];
}

class DashboardService {
  async getMetrics(): Promise<DashboardMetrics> {
    const response = await api.get<DashboardMetrics>('/dashboard/metrics');
    return response.data;
  }

  async getStats(filters: DashboardFilters = {}): Promise<{ data: DashboardStats }> {
    const response = await api.get('/dashboard/stats', { params: filters });
    return response.data;
  }

  async exportCSV(filters: DashboardFilters): Promise<void> {
    const response = await api.get('/dashboard/export/csv', {
      params: filters,
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `relatorio-vendas-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async exportPDF(filters: DashboardFilters): Promise<void> {
    const response = await api.get('/dashboard/export/pdf', {
      params: filters,
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `relatorio-vendas-${new Date().toISOString().split('T')[0]}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

export const dashboardService = new DashboardService(); 