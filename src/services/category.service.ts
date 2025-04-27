import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  parent?: Category;
  children?: Category[];
}

interface CreateCategoryData {
  name: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive?: boolean;
}

interface UpdateCategoryData {
  name?: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive?: boolean;
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

export default {
  async getCategories(page = 1, limit = 10): Promise<PaginatedResponse<Category>> {
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<Category>>>(
        `${API_URL}/categories`,
        { params: { page, limit } }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw new Error('Não foi possível carregar as categorias');
    }
  },

  async getCategory(id: string): Promise<Category> {
    try {
      const response = await axios.get<ApiResponse<Category>>(
        `${API_URL}/categories/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar categoria:', error);
      throw new Error('Não foi possível carregar a categoria');
    }
  },

  async createCategory(data: CreateCategoryData): Promise<Category> {
    try {
      const response = await axios.post<ApiResponse<Category>>(
        `${API_URL}/categories`,
        data
      );
      toast.success('Categoria criada com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw new Error('Não foi possível criar a categoria');
    }
  },

  async updateCategory(id: string, data: UpdateCategoryData): Promise<Category> {
    try {
      const response = await axios.put<ApiResponse<Category>>(
        `${API_URL}/categories/${id}`,
        data
      );
      toast.success('Categoria atualizada com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      throw new Error('Não foi possível atualizar a categoria');
    }
  },

  async deleteCategory(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/categories/${id}`);
      toast.success('Categoria excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      throw new Error('Não foi possível excluir a categoria');
    }
  },

  async getParentCategories(): Promise<Category[]> {
    try {
      const response = await axios.get<ApiResponse<Category[]>>(
        `${API_URL}/categories/parents`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar categorias pai:', error);
      throw new Error('Não foi possível carregar as categorias pai');
    }
  },

  async getChildCategories(parentId: string): Promise<Category[]> {
    try {
      const response = await axios.get<ApiResponse<Category[]>>(
        `${API_URL}/categories/${parentId}/children`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar categorias filhas:', error);
      throw new Error('Não foi possível carregar as categorias filhas');
    }
  },

  async getCategoryTree(): Promise<Category[]> {
    try {
      const response = await axios.get<ApiResponse<Category[]>>(
        `${API_URL}/categories/tree`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar árvore de categorias:', error);
      throw new Error('Não foi possível carregar a árvore de categorias');
    }
  }
}; 