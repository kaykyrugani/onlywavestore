import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface PaymentMethod {
  id: string;
  type: string;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
  isDefault: boolean;
}

interface PaymentResponse {
  id: string;
  status: string;
  amount: number;
  method: string;
  createdAt: string;
}

interface ApiResponse<T> {
  data: T;
}

const paymentsService = {
  async getPaymentMethods(userId: string): Promise<PaymentMethod[]> {
    try {
      const response = await axios.get<ApiResponse<PaymentMethod[]>>(`${API_URL}/payments/methods/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar métodos de pagamento:', error);
      throw new Error('Não foi possível carregar seus métodos de pagamento');
    }
  },

  async addPaymentMethod(userId: string, method: Omit<PaymentMethod, 'id' | 'isDefault'>): Promise<PaymentMethod> {
    try {
      const response = await axios.post<ApiResponse<PaymentMethod>>(`${API_URL}/payments/methods/${userId}`, method);
      toast.success('Método de pagamento adicionado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao adicionar método de pagamento:', error);
      throw new Error('Não foi possível adicionar o método de pagamento');
    }
  },

  async removePaymentMethod(methodId: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/payments/methods/${methodId}`);
      toast.success('Método de pagamento removido com sucesso');
    } catch (error) {
      console.error('Erro ao remover método de pagamento:', error);
      throw new Error('Não foi possível remover o método de pagamento');
    }
  },

  async processPayment(orderId: string, methodId: string): Promise<PaymentResponse> {
    try {
      const response = await axios.post<ApiResponse<PaymentResponse>>(`${API_URL}/payments/process`, {
        orderId,
        methodId
      });
      return response.data.data;
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      throw new Error('Não foi possível processar o pagamento');
    }
  },

  async setDefaultMethod(methodId: string): Promise<void> {
    try {
      await axios.put(`${API_URL}/payments/methods/${methodId}/default`);
      toast.success('Método de pagamento padrão atualizado');
    } catch (error) {
      console.error('Erro ao definir método padrão:', error);
      throw new Error('Não foi possível definir o método de pagamento padrão');
    }
  }
};

export default paymentsService; 