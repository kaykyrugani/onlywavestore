import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  sku: string;
}

interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  categoryId: string;
  brand: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isOnSale: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  specifications: {
    key: string;
    value: string;
  }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateProductData {
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  categoryId: string;
  brand: string;
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isOnSale: boolean;
  specifications: {
    key: string;
    value: string;
  }[];
}

interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  discountPrice?: number;
  images?: string[];
  categoryId?: string;
  brand?: string;
  stock?: number;
  isAvailable?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  specifications?: {
    key: string;
    value: string;
  }[];
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

interface ProductFilters {
  categoryId?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  search?: string;
  sortBy?: 'price' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

const productService = {
  async getProducts(filters: ProductFilters = {}, page = 1, limit = 10): Promise<PaginatedResponse<Product>> {
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<Product>>>(
        `${API_URL}/products`,
        { params: { ...filters, page, limit } }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw new Error('Não foi possível carregar os produtos');
    }
  },

  async getProduct(id: string): Promise<Product> {
    try {
      const response = await axios.get<ApiResponse<Product>>(
        `${API_URL}/products/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw new Error('Não foi possível carregar o produto');
    }
  },

  async createProduct(data: CreateProductData): Promise<Product> {
    try {
      const response = await axios.post<ApiResponse<Product>>(
        `${API_URL}/products`,
        data
      );
      toast.success('Produto criado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw new Error('Não foi possível criar o produto');
    }
  },

  async updateProduct(id: string, data: UpdateProductData): Promise<Product> {
    try {
      const response = await axios.put<ApiResponse<Product>>(
        `${API_URL}/products/${id}`,
        data
      );
      toast.success('Produto atualizado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw new Error('Não foi possível atualizar o produto');
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      toast.success('Produto excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      throw new Error('Não foi possível excluir o produto');
    }
  },

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const response = await axios.get<ApiResponse<Product[]>>(
        `${API_URL}/products/featured`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar produtos em destaque:', error);
      throw new Error('Não foi possível carregar os produtos em destaque');
    }
  },

  async getNewProducts(): Promise<Product[]> {
    try {
      const response = await axios.get<ApiResponse<Product[]>>(
        `${API_URL}/products/new`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar novos produtos:', error);
      throw new Error('Não foi possível carregar os novos produtos');
    }
  },

  async getOnSaleProducts(): Promise<Product[]> {
    try {
      const response = await axios.get<ApiResponse<Product[]>>(
        `${API_URL}/products/on-sale`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar produtos em promoção:', error);
      throw new Error('Não foi possível carregar os produtos em promoção');
    }
  },

  async getRelatedProducts(productId: string): Promise<Product[]> {
    try {
      const response = await axios.get<ApiResponse<Product[]>>(
        `${API_URL}/products/${productId}/related`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar produtos relacionados:', error);
      throw new Error('Não foi possível carregar os produtos relacionados');
    }
  },

  async getCategories(): Promise<string[]> {
    try {
      const response = await axios.get<ApiResponse<string[]>>(
        `${API_URL}/products/categories`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw new Error('Não foi possível carregar as categorias');
    }
  },

  async getBrands(): Promise<string[]> {
    try {
      const response = await axios.get<ApiResponse<string[]>>(
        `${API_URL}/products/brands`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar marcas:', error);
      throw new Error('Não foi possível carregar as marcas');
    }
  },

  async getProductBySlug(slug: string): Promise<Product> {
    try {
      const response = await axios.get<ApiResponse<Product>>(`${API_URL}/products/slug/${slug}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw new Error('Não foi possível carregar o produto');
    }
  },

  async getProductReviews(productId: string): Promise<ProductReview[]> {
    try {
      const response = await axios.get<ApiResponse<ProductReview[]>>(
        `${API_URL}/products/${productId}/reviews`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      throw new Error('Não foi possível carregar as avaliações');
    }
  },

  async createReview(productId: string, data: Omit<ProductReview, 'id' | 'userId' | 'userName' | 'userAvatar' | 'createdAt' | 'updatedAt'>): Promise<ProductReview> {
    try {
      const response = await axios.post<ApiResponse<ProductReview>>(
        `${API_URL}/products/${productId}/reviews`,
        data
      );
      toast.success('Avaliação criada com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar avaliação:', error);
      throw new Error('Não foi possível criar a avaliação');
    }
  },

  async updateReview(productId: string, reviewId: string, data: Partial<ProductReview>): Promise<ProductReview> {
    try {
      const response = await axios.put<ApiResponse<ProductReview>>(
        `${API_URL}/products/${productId}/reviews/${reviewId}`,
        data
      );
      toast.success('Avaliação atualizada com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar avaliação:', error);
      throw new Error('Não foi possível atualizar a avaliação');
    }
  },

  async deleteReview(productId: string, reviewId: string): Promise<void> {
    try {
      await axios.delete<ApiResponse<void>>(`${API_URL}/products/${productId}/reviews/${reviewId}`);
      toast.success('Avaliação excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir avaliação:', error);
      throw new Error('Não foi possível excluir a avaliação');
    }
  },

  async uploadProductImage(productId: string, file: File): Promise<ProductImage> {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post<ApiResponse<ProductImage>>(
        `${API_URL}/products/${productId}/images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      toast.success('Imagem enviada com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      throw new Error('Não foi possível enviar a imagem');
    }
  },

  async deleteProductImage(productId: string, imageId: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/products/${productId}/images/${imageId}`);
      toast.success('Imagem excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir imagem:', error);
      throw new Error('Não foi possível excluir a imagem');
    }
  }
};

export default productService; 