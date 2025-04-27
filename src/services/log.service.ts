import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface Log {
  id: string;
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  details: Record<string, unknown>;
  ip: string;
  userAgent: string;
  createdAt: string;
}

interface LogFilters {
  userId?: string;
  action?: string;
  entity?: string;
  entityId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
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

const logService = {
  async getLogs(filters: LogFilters = {}): Promise<PaginatedResponse<Log>> {
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<Log>>>(
        `${API_URL}/logs`,
        { params: filters }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
      throw new Error('Não foi possível carregar os logs');
    }
  },

  async getLog(id: string): Promise<Log> {
    try {
      const response = await axios.get<ApiResponse<Log>>(
        `${API_URL}/logs/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar log:', error);
      throw new Error('Não foi possível carregar o log');
    }
  },

  async getUserLogs(userId: string, filters: LogFilters = {}): Promise<PaginatedResponse<Log>> {
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<Log>>>(
        `${API_URL}/users/${userId}/logs`,
        { params: filters }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar logs do usuário:', error);
      throw new Error('Não foi possível carregar os logs do usuário');
    }
  },

  async getEntityLogs(entity: string, entityId: string, filters: LogFilters = {}): Promise<PaginatedResponse<Log>> {
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<Log>>>(
        `${API_URL}/logs/${entity}/${entityId}`,
        { params: filters }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar logs da entidade:', error);
      throw new Error('Não foi possível carregar os logs da entidade');
    }
  },

  async deleteLog(id: string): Promise<void> {
    try {
      await axios.delete<ApiResponse<void>>(`${API_URL}/logs/${id}`);
      toast.success('Log excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir log:', error);
      throw new Error('Não foi possível excluir o log');
    }
  },

  async deleteUserLogs(userId: string): Promise<void> {
    try {
      await axios.delete<ApiResponse<void>>(`${API_URL}/users/${userId}/logs`);
      toast.success('Logs do usuário excluídos com sucesso');
    } catch (error) {
      console.error('Erro ao excluir logs do usuário:', error);
      throw new Error('Não foi possível excluir os logs do usuário');
    }
  },

  async deleteEntityLogs(entity: string, entityId: string): Promise<void> {
    try {
      await axios.delete<ApiResponse<void>>(`${API_URL}/logs/${entity}/${entityId}`);
      toast.success('Logs da entidade excluídos com sucesso');
    } catch (error) {
      console.error('Erro ao excluir logs da entidade:', error);
      throw new Error('Não foi possível excluir os logs da entidade');
    }
  },

  async exportLogs(filters: LogFilters = {}): Promise<Blob> {
    try {
      const response = await axios.get<Blob>(
        `${API_URL}/logs/export`,
        {
          params: filters,
          responseType: 'blob'
        }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao exportar logs:', error);
      throw new Error('Não foi possível exportar os logs');
    }
  }
};

export default logService; 