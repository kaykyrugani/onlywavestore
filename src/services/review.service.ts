import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  product: {
    id: string;
    name: string;
    image: string;
  };
}

interface CreateReviewData {
  productId: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
}

interface UpdateReviewData {
  rating?: number;
  title?: string;
  comment?: string;
  images?: string[];
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

interface ReviewFilters {
  productId?: string;
  userId?: string;
  rating?: number;
  isVerifiedPurchase?: boolean;
  page?: number;
  limit?: number;
}

const reviewService = {
  async getReviews(productId: string, page = 1, limit = 10): Promise<PaginatedResponse<Review>> {
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<Review>>>(
        `${API_URL}/products/${productId}/reviews`,
        { params: { page, limit } }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      throw new Error('Não foi possível carregar as avaliações');
    }
  },

  async getReview(id: string): Promise<Review> {
    try {
      const response = await axios.get<ApiResponse<Review>>(
        `${API_URL}/reviews/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar avaliação:', error);
      throw new Error('Não foi possível carregar a avaliação');
    }
  },

  async createReview(data: CreateReviewData): Promise<Review> {
    try {
      const response = await axios.post<ApiResponse<Review>>(
        `${API_URL}/reviews`,
        data
      );
      toast.success('Avaliação criada com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar avaliação:', error);
      throw new Error('Não foi possível criar a avaliação');
    }
  },

  async updateReview(id: string, data: UpdateReviewData): Promise<Review> {
    try {
      const response = await axios.put<ApiResponse<Review>>(
        `${API_URL}/reviews/${id}`,
        data
      );
      toast.success('Avaliação atualizada com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar avaliação:', error);
      throw new Error('Não foi possível atualizar a avaliação');
    }
  },

  async deleteReview(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/reviews/${id}`);
      toast.success('Avaliação excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir avaliação:', error);
      throw new Error('Não foi possível excluir a avaliação');
    }
  },

  async likeReview(id: string): Promise<Review> {
    try {
      const response = await axios.post<ApiResponse<Review>>(
        `${API_URL}/reviews/${id}/like`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao curtir avaliação:', error);
      throw new Error('Não foi possível curtir a avaliação');
    }
  },

  async dislikeReview(id: string): Promise<Review> {
    try {
      const response = await axios.post<ApiResponse<Review>>(
        `${API_URL}/reviews/${id}/dislike`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao não curtir avaliação:', error);
      throw new Error('Não foi possível não curtir a avaliação');
    }
  },

  async reportReview(id: string, reason: string): Promise<void> {
    try {
      await axios.post(`${API_URL}/reviews/${id}/report`, { reason });
      toast.success('Avaliação denunciada com sucesso');
    } catch (error) {
      console.error('Erro ao denunciar avaliação:', error);
      throw new Error('Não foi possível denunciar a avaliação');
    }
  },

  async getProductReviews(productId: string): Promise<PaginatedResponse<Review>> {
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<Review>>>(
        `${API_URL}/products/${productId}/reviews`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar avaliações do produto:', error);
      throw new Error('Não foi possível carregar as avaliações do produto');
    }
  },

  async getUserReviews(userId: string, page = 1, limit = 10): Promise<PaginatedResponse<Review>> {
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<Review>>>(
        `${API_URL}/users/${userId}/reviews`,
        { params: { page, limit } }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar avaliações do usuário:', error);
      throw new Error('Não foi possível carregar as avaliações do usuário');
    }
  },

  async getProductAverageRating(productId: string): Promise<number> {
    try {
      const response = await axios.get<ApiResponse<number>>(
        `${API_URL}/products/${productId}/average-rating`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar média de avaliações:', error);
      throw new Error('Não foi possível carregar a média de avaliações');
    }
  }
};

export default reviewService; 