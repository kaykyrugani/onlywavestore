import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface Address {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: number;
  description: string;
}

interface ShippingCalculation {
  options: ShippingOption[];
  totalWeight: number;
  totalVolume: number;
}

interface ApiResponse<T> {
  data: T;
}

const shippingService = {
  async getAddresses(userId: string): Promise<Address[]> {
    try {
      const response = await axios.get<ApiResponse<Address[]>>(`${API_URL}/shipping/addresses/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar endereços:', error);
      throw new Error('Não foi possível carregar seus endereços');
    }
  },

  async addAddress(userId: string, address: Omit<Address, 'id' | 'isDefault'>): Promise<Address> {
    try {
      const response = await axios.post<ApiResponse<Address>>(`${API_URL}/shipping/addresses/${userId}`, address);
      toast.success('Endereço adicionado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error);
      throw new Error('Não foi possível adicionar o endereço');
    }
  },

  async updateAddress(addressId: string, address: Partial<Address>): Promise<Address> {
    try {
      const response = await axios.put<ApiResponse<Address>>(`${API_URL}/shipping/addresses/${addressId}`, address);
      toast.success('Endereço atualizado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar endereço:', error);
      throw new Error('Não foi possível atualizar o endereço');
    }
  },

  async removeAddress(addressId: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/shipping/addresses/${addressId}`);
      toast.success('Endereço removido com sucesso');
    } catch (error) {
      console.error('Erro ao remover endereço:', error);
      throw new Error('Não foi possível remover o endereço');
    }
  },

  async calculateShipping(cartItems: any[], zipCode: string): Promise<ShippingCalculation> {
    try {
      const response = await axios.post<ApiResponse<ShippingCalculation>>(`${API_URL}/shipping/calculate`, {
        items: cartItems,
        zipCode
      });
      return response.data.data;
    } catch (error) {
      console.error('Erro ao calcular frete:', error);
      throw new Error('Não foi possível calcular o frete');
    }
  },

  async setDefaultAddress(addressId: string): Promise<void> {
    try {
      await axios.put(`${API_URL}/shipping/addresses/${addressId}/default`);
      toast.success('Endereço padrão atualizado');
    } catch (error) {
      console.error('Erro ao definir endereço padrão:', error);
      throw new Error('Não foi possível definir o endereço padrão');
    }
  }
};

export default shippingService; 