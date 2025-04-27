import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface SEO {
  id: string;
  page: string;
  title: string;
  description: string;
  keywords: string;
  image: string;
  canonical: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateSEOData {
  page: string;
  title: string;
  description: string;
  keywords: string;
  image: string;
  canonical: string;
}

interface UpdateSEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonical?: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const seoService = {
  async getSEO(page = 1, limit = 10): Promise<PaginatedResponse<SEO>> {
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<SEO>>>(
        `${API_URL}/seo`,
        { params: { page, limit } }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar configurações de SEO:', error);
      throw new Error('Não foi possível carregar as configurações de SEO');
    }
  },

  async getSEOByPage(page: string): Promise<SEO> {
    try {
      const response = await axios.get<ApiResponse<SEO>>(
        `${API_URL}/seo/${page}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar configurações de SEO:', error);
      throw new Error('Não foi possível carregar as configurações de SEO');
    }
  },

  async createSEO(data: CreateSEOData): Promise<SEO> {
    try {
      const response = await axios.post<ApiResponse<SEO>>(
        `${API_URL}/seo`,
        data
      );
      toast.success('Configurações de SEO criadas com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar configurações de SEO:', error);
      throw new Error('Não foi possível criar as configurações de SEO');
    }
  },

  async updateSEO(page: string, data: UpdateSEOData): Promise<SEO> {
    try {
      const response = await axios.put<ApiResponse<SEO>>(
        `${API_URL}/seo/${page}`,
        data
      );
      toast.success('Configurações de SEO atualizadas com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar configurações de SEO:', error);
      throw new Error('Não foi possível atualizar as configurações de SEO');
    }
  },

  async deleteSEO(page: string): Promise<void> {
    try {
      await axios.delete<ApiResponse<void>>(`${API_URL}/seo/${page}`);
      toast.success('Configurações de SEO excluídas com sucesso');
    } catch (error) {
      console.error('Erro ao excluir configurações de SEO:', error);
      throw new Error('Não foi possível excluir as configurações de SEO');
    }
  },

  async uploadImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post<ApiResponse<{ url: string }>>(
        `${API_URL}/seo/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data.data.url;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw new Error('Não foi possível fazer upload da imagem');
    }
  }
};

export default seoService; 