import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface SiteSettings {
  id: string;
  siteName: string;
  siteDescription: string;
  siteKeywords: string[];
  siteLogo: string;
  siteFavicon: string;
  contactEmail: string;
  contactPhone: string;
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  paymentMethods: string[];
  shippingMethods: string[];
  maintenanceMode: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UpdateSettingsData {
  siteName?: string;
  siteDescription?: string;
  siteKeywords?: string[];
  siteLogo?: string;
  siteFavicon?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: {
    street?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  paymentMethods?: string[];
  shippingMethods?: string[];
  maintenanceMode?: boolean;
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

const settingsService = {
  async getSettings(): Promise<SiteSettings> {
    try {
      const response = await axios.get<ApiResponse<SiteSettings>>(
        `${API_URL}/settings`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar configurações:', error);
      throw new Error('Não foi possível carregar as configurações do site');
    }
  },

  async getSetting(key: string): Promise<Settings> {
    try {
      const response = await axios.get<ApiResponse<Settings>>(
        `${API_URL}/settings/${key}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar configuração:', error);
      throw new Error('Não foi possível carregar a configuração');
    }
  },

  async getPublicSettings(): Promise<Settings[]> {
    try {
      const response = await axios.get<ApiResponse<Settings[]>>(
        `${API_URL}/settings/public`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar configurações públicas:', error);
      throw new Error('Não foi possível carregar as configurações públicas');
    }
  },

  async updateSettings(data: UpdateSettingsData): Promise<SiteSettings> {
    try {
      const response = await axios.patch<ApiResponse<SiteSettings>>(
        `${API_URL}/settings`,
        data
      );
      toast.success('Configurações atualizadas com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
      throw new Error('Não foi possível atualizar as configurações do site');
    }
  },

  async updateSetting(key: string, value: any): Promise<Settings> {
    try {
      const response = await axios.put<ApiResponse<Settings>>(
        `${API_URL}/settings/${key}`,
        { value }
      );
      toast.success('Configuração atualizada com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar configuração:', error);
      throw new Error('Não foi possível atualizar a configuração');
    }
  },

  async deleteSetting(key: string): Promise<void> {
    try {
      await axios.delete<ApiResponse<void>>(`${API_URL}/settings/${key}`);
      toast.success('Configuração excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir configuração:', error);
      throw new Error('Não foi possível excluir a configuração');
    }
  },

  async getSettingsByGroup(group: string): Promise<Settings[]> {
    try {
      const response = await axios.get<ApiResponse<Settings[]>>(
        `${API_URL}/settings/group/${group}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar configurações do grupo:', error);
      throw new Error('Não foi possível carregar as configurações do grupo');
    }
  },

  async exportSettings(): Promise<Blob> {
    try {
      const response = await axios.get<Blob>(
        `${API_URL}/settings/export`,
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao exportar configurações:', error);
      throw new Error('Não foi possível exportar as configurações');
    }
  },

  async importSettings(file: File): Promise<Settings[]> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post<ApiResponse<Settings[]>>(
        `${API_URL}/settings/import`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success('Configurações importadas com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao importar configurações:', error);
      throw new Error('Não foi possível importar as configurações');
    }
  },

  async uploadLogo(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post<ApiResponse<{ url: string }>>(
        `${API_URL}/settings/logo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data.data.url;
    } catch (error) {
      console.error('Erro ao fazer upload do logo:', error);
      throw new Error('Não foi possível fazer upload do logo');
    }
  },

  async uploadFavicon(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post<ApiResponse<{ url: string }>>(
        `${API_URL}/settings/favicon`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data.data.url;
    } catch (error) {
      console.error('Erro ao fazer upload do favicon:', error);
      throw new Error('Não foi possível fazer upload do favicon');
    }
  }
};

export default settingsService; 