import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateNotificationData {
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface UpdateNotificationData {
  read?: boolean;
}

interface ApiResponse<T> {
  data: T;
  message: string;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const notificationService = {
  async getNotifications(page = 1, limit = 10): Promise<PaginatedResponse<Notification>> {
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<Notification>>>(
        `${API_URL}/notifications`,
        { params: { page, limit } }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      throw new Error('Não foi possível carregar as notificações');
    }
  },

  async getUnreadNotifications(): Promise<Notification[]> {
    try {
      const response = await axios.get<ApiResponse<Notification[]>>(
        `${API_URL}/notifications/unread`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar notificações não lidas:', error);
      throw new Error('Não foi possível carregar as notificações não lidas');
    }
  },

  async createNotification(data: CreateNotificationData): Promise<Notification> {
    try {
      const response = await axios.post<ApiResponse<Notification>>(
        `${API_URL}/notifications`,
        data
      );
      toast.success('Notificação criada com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar notificação:', error);
      throw new Error('Não foi possível criar a notificação');
    }
  },

  async updateNotification(id: string, data: UpdateNotificationData): Promise<Notification> {
    try {
      const response = await axios.patch<ApiResponse<Notification>>(
        `${API_URL}/notifications/${id}`,
        data
      );
      toast.success('Notificação atualizada com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar notificação:', error);
      throw new Error('Não foi possível atualizar a notificação');
    }
  },

  async markAsRead(id: string): Promise<Notification> {
    try {
      const response = await axios.patch<ApiResponse<Notification>>(
        `${API_URL}/notifications/${id}/read`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
      throw new Error('Não foi possível marcar a notificação como lida');
    }
  },

  async markAllAsRead(): Promise<void> {
    try {
      await axios.patch(`${API_URL}/notifications/read-all`);
    } catch (error) {
      console.error('Erro ao marcar todas as notificações como lidas:', error);
      throw new Error('Não foi possível marcar todas as notificações como lidas');
    }
  },

  async deleteNotification(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/notifications/${id}`);
      toast.success('Notificação excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir notificação:', error);
      throw new Error('Não foi possível excluir a notificação');
    }
  }
};

export default notificationService; 