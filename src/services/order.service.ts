import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  paymentMethod: 'credit_card' | 'debit_card' | 'pix' | 'bank_slip';
  shippingMethod: 'standard' | 'express';
  shippingAddress: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    productId: string;
    quantity: number;
    price: number;
    name: string;
    image: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface CreateOrderData {
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: 'credit_card' | 'debit_card' | 'pix' | 'bank_slip';
  shippingMethod: 'standard' | 'express';
  couponCode?: string;
}

interface UpdateOrderData {
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingCode?: string;
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

const orderService = {
  async getOrders(page = 1, limit = 10): Promise<PaginatedResponse<Order>> {
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<Order>>>(
        `${API_URL}/orders`,
        { params: { page, limit } }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      throw new Error('Não foi possível carregar os pedidos');
    }
  },

  async getOrder(id: string): Promise<Order> {
    try {
      const response = await axios.get<ApiResponse<Order>>(
        `${API_URL}/orders/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      throw new Error('Não foi possível carregar o pedido');
    }
  },

  async createOrder(data: CreateOrderData): Promise<Order> {
    try {
      const response = await axios.post<ApiResponse<Order>>(
        `${API_URL}/orders`,
        data
      );
      toast.success('Pedido criado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw new Error('Não foi possível criar o pedido');
    }
  },

  async updateOrder(id: string, data: UpdateOrderData): Promise<Order> {
    try {
      const response = await axios.put<ApiResponse<Order>>(
        `${API_URL}/orders/${id}`,
        data
      );
      toast.success('Pedido atualizado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      throw new Error('Não foi possível atualizar o pedido');
    }
  },

  async cancelOrder(id: string): Promise<Order> {
    try {
      const response = await axios.put<ApiResponse<Order>>(
        `${API_URL}/orders/${id}/cancel`
      );
      toast.success('Pedido cancelado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
      throw new Error('Não foi possível cancelar o pedido');
    }
  },

  async getUserOrders(userId: string, page = 1, limit = 10): Promise<PaginatedResponse<Order>> {
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<Order>>>(
        `${API_URL}/users/${userId}/orders`,
        { params: { page, limit } }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar pedidos do usuário:', error);
      throw new Error('Não foi possível carregar os pedidos do usuário');
    }
  },

  async getOrderStatus(id: string): Promise<{ status: string; trackingCode?: string }> {
    try {
      const response = await axios.get<ApiResponse<{ status: string; trackingCode?: string }>>(
        `${API_URL}/orders/${id}/status`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar status do pedido:', error);
      throw new Error('Não foi possível carregar o status do pedido');
    }
  },

  async generatePixPayment(orderId: string): Promise<{ qrCode: string }> {
    try {
      const response = await axios.post<ApiResponse<{ qrCode: string }>>(
        `${API_URL}/orders/${orderId}/pix`
      );
      return response.data.data;
    } catch (error) {
      toast.error('Erro ao gerar pagamento Pix');
      throw error;
    }
  }
};

export default orderService; 