import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface Order {
  id: string;
  status: string;
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  createdAt: string;
  shippingAddress: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
}

interface ApiResponse<T> {
  data: T;
}

const ordersService = {
  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const response = await axios.get<ApiResponse<Order[]>>(`${API_URL}/orders/user/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      throw new Error('Não foi possível carregar seus pedidos');
    }
  },

  async getOrderById(orderId: string): Promise<Order> {
    try {
      const response = await axios.get<ApiResponse<Order>>(`${API_URL}/orders/${orderId}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      throw new Error('Não foi possível carregar o pedido');
    }
  },

  async cancelOrder(orderId: string): Promise<void> {
    try {
      await axios.post(`${API_URL}/orders/${orderId}/cancel`);
      toast.success('Pedido cancelado com sucesso');
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
      throw new Error('Não foi possível cancelar o pedido');
    }
  },

  async trackOrder(orderId: string): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}/orders/${orderId}/tracking`);
      return response.data;
    } catch (error) {
      console.error('Erro ao rastrear pedido:', error);
      throw new Error('Não foi possível rastrear o pedido');
    }
  },
};

export default ordersService; 