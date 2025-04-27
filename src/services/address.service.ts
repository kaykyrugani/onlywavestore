import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

export interface Address {
  id: string;
  userId: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressData {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

interface UpdateAddressData {
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  isDefault?: boolean;
}

interface ApiResponse<T> {
  data: T;
  message: string;
}

const addressService = {
  async getAddresses(): Promise<Address[]> {
    try {
      const response = await axios.get<ApiResponse<Address[]>>(
        `${API_URL}/addresses`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar endereços:', error);
      throw new Error('Não foi possível carregar os endereços');
    }
  },

  async getAddress(id: string): Promise<Address> {
    try {
      const response = await axios.get<ApiResponse<Address>>(
        `${API_URL}/addresses/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      throw new Error('Não foi possível carregar o endereço');
    }
  },

  async createAddress(data: CreateAddressData): Promise<Address> {
    try {
      const response = await axios.post<ApiResponse<Address>>(
        `${API_URL}/addresses`,
        data
      );
      toast.success('Endereço criado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar endereço:', error);
      throw new Error('Não foi possível criar o endereço');
    }
  },

  async updateAddress(id: string, data: UpdateAddressData): Promise<Address> {
    try {
      const response = await axios.put<ApiResponse<Address>>(
        `${API_URL}/addresses/${id}`,
        data
      );
      toast.success('Endereço atualizado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar endereço:', error);
      throw new Error('Não foi possível atualizar o endereço');
    }
  },

  async deleteAddress(id: string): Promise<void> {
    try {
      await axios.delete<ApiResponse<void>>(`${API_URL}/addresses/${id}`);
      toast.success('Endereço excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir endereço:', error);
      throw new Error('Não foi possível excluir o endereço');
    }
  },

  async setDefaultAddress(id: string): Promise<Address> {
    try {
      const response = await axios.put<ApiResponse<Address>>(
        `${API_URL}/addresses/${id}/default`
      );
      toast.success('Endereço padrão atualizado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao definir endereço padrão:', error);
      throw new Error('Não foi possível definir o endereço padrão');
    }
  }
};

export default addressService; 