import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  image: string;
}

interface Cart {
  id: string;
  items: CartItem[];
  total: number;
  totalItems: number;
  createdAt: string;
  updatedAt: string;
}

interface AddToCartData {
  productId: string;
  quantity: number;
}

interface UpdateCartItemData {
  quantity: number;
}

interface ApiResponse<T> {
  data: T;
  message: string;
}

const cartService = {
  async getCart(): Promise<Cart> {
    try {
      const response = await axios.get<ApiResponse<Cart>>(`${API_URL}/cart`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar carrinho:', error);
      throw new Error('Não foi possível carregar o carrinho');
    }
  },

  async addToCart(data: AddToCartData): Promise<Cart> {
    try {
      const response = await axios.post<ApiResponse<Cart>>(
        `${API_URL}/cart/items`,
        data
      );
      toast.success('Produto adicionado ao carrinho');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      throw new Error('Não foi possível adicionar o produto ao carrinho');
    }
  },

  async updateCartItem(itemId: string, data: UpdateCartItemData): Promise<Cart> {
    try {
      const response = await axios.put<ApiResponse<Cart>>(
        `${API_URL}/cart/items/${itemId}`,
        data
      );
      toast.success('Carrinho atualizado');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar carrinho:', error);
      throw new Error('Não foi possível atualizar o carrinho');
    }
  },

  async removeFromCart(itemId: string): Promise<Cart> {
    try {
      const response = await axios.delete<ApiResponse<Cart>>(
        `${API_URL}/cart/items/${itemId}`
      );
      toast.success('Produto removido do carrinho');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao remover do carrinho:', error);
      throw new Error('Não foi possível remover o produto do carrinho');
    }
  },

  async clearCart(): Promise<Cart> {
    try {
      const response = await axios.delete<ApiResponse<Cart>>(`${API_URL}/cart`);
      toast.success('Carrinho esvaziado');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao esvaziar carrinho:', error);
      throw new Error('Não foi possível esvaziar o carrinho');
    }
  },

  async applyCoupon(code: string): Promise<Cart> {
    try {
      const response = await axios.post<ApiResponse<Cart>>(`${API_URL}/cart/coupon`, { code });
      toast.success('Cupom aplicado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao aplicar cupom:', error);
      throw new Error('Não foi possível aplicar o cupom');
    }
  },

  async removeCoupon(): Promise<Cart> {
    try {
      const response = await axios.delete<ApiResponse<Cart>>(`${API_URL}/cart/coupon`);
      toast.success('Cupom removido');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao remover cupom:', error);
      throw new Error('Não foi possível remover o cupom');
    }
  }
};

export default cartService; 