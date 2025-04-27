import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface Backup {
  id: string;
  name: string;
  type: 'full' | 'partial';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  size: number;
  createdAt: string;
  completedAt?: string;
  error?: string;
}

interface CreateBackupData {
  name: string;
  type: 'full' | 'partial';
  entities?: string[];
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

const backupService = {
  async getBackups(page = 1, limit = 10): Promise<PaginatedResponse<Backup>> {
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<Backup>>>(
        `${API_URL}/backups`,
        { params: { page, limit } }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar backups:', error);
      throw new Error('Não foi possível carregar os backups');
    }
  },

  async getBackup(id: string): Promise<Backup> {
    try {
      const response = await axios.get<ApiResponse<Backup>>(
        `${API_URL}/backups/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar backup:', error);
      throw new Error('Não foi possível carregar o backup');
    }
  },

  async createBackup(data: CreateBackupData): Promise<Backup> {
    try {
      const response = await axios.post<ApiResponse<Backup>>(
        `${API_URL}/backups`,
        data
      );
      toast.success('Backup iniciado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar backup:', error);
      throw new Error('Não foi possível criar o backup');
    }
  },

  async deleteBackup(id: string): Promise<void> {
    try {
      await axios.delete<ApiResponse<void>>(`${API_URL}/backups/${id}`);
      toast.success('Backup excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir backup:', error);
      throw new Error('Não foi possível excluir o backup');
    }
  },

  async downloadBackup(id: string): Promise<Blob> {
    try {
      const response = await axios.get<Blob>(
        `${API_URL}/backups/${id}/download`,
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao baixar backup:', error);
      throw new Error('Não foi possível baixar o backup');
    }
  },

  async restoreBackup(id: string): Promise<void> {
    try {
      await axios.post<ApiResponse<void>>(`${API_URL}/backups/${id}/restore`);
      toast.success('Backup restaurado com sucesso');
    } catch (error) {
      console.error('Erro ao restaurar backup:', error);
      throw new Error('Não foi possível restaurar o backup');
    }
  },

  async getBackupStatus(id: string): Promise<Backup> {
    try {
      const response = await axios.get<ApiResponse<Backup>>(
        `${API_URL}/backups/${id}/status`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar status do backup:', error);
      throw new Error('Não foi possível carregar o status do backup');
    }
  },

  async cancelBackup(id: string): Promise<void> {
    try {
      await axios.post<ApiResponse<void>>(`${API_URL}/backups/${id}/cancel`);
      toast.success('Backup cancelado com sucesso');
    } catch (error) {
      console.error('Erro ao cancelar backup:', error);
      throw new Error('Não foi possível cancelar o backup');
    }
  }
};

export default backupService; 