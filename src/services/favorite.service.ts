import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface Favorite {
  id: string;
  userId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    discountPrice?: number;
    image: string;
  };
  createdAt: string;
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

const favoriteService = {
  async getFavorites(page = 1, limit = 10): Promise<PaginatedResponse<Favorite>> {
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<Favorite>>>(
        `${API_URL}/favorites`,
        { params: { page, limit } }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
      throw new Error('Não foi possível carregar os favoritos');
    }
  },

  async addToFavorites(productId: string): Promise<Favorite> {
    try {
      const response = await axios.post<ApiResponse<Favorite>>(
        `${API_URL}/favorites`,
        { productId }
      );
      toast.success('Produto adicionado aos favoritos');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao adicionar aos favoritos:', error);
      throw new Error('Não foi possível adicionar o produto aos favoritos');
    }
  },

  async removeFromFavorites(productId: string): Promise<void> {
    try {
      await axios.delete<ApiResponse<void>>(
        `${API_URL}/favorites/${productId}`
      );
      toast.success('Produto removido dos favoritos');
    } catch (error) {
      console.error('Erro ao remover dos favoritos:', error);
      throw new Error('Não foi possível remover o produto dos favoritos');
    }
  },

  async isFavorite(productId: string): Promise<boolean> {
    try {
      const response = await axios.get<ApiResponse<boolean>>(
        `${API_URL}/favorites/${productId}/check`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao verificar favorito:', error);
      throw new Error('Não foi possível verificar se o produto é favorito');
    }
  },

  async getFavoriteCount(): Promise<number> {
    try {
      const response = await axios.get<ApiResponse<number>>(
        `${API_URL}/favorites/count`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar contagem de favoritos:', error);
      throw new Error('Não foi possível carregar a contagem de favoritos');
    }
  }
};

export default favoriteService; 