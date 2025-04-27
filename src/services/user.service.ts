import axios from 'axios';
import { toast } from 'react-hot-toast';
import type { User } from '../types/user';

const API_URL = import.meta.env.VITE_API_URL;

interface Address {
  id: string;
  userId: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserPreferences {
  id: string;
  userId: string;
  language: string;
  currency: string;
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  marketing: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
  cpf?: string;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other';
}

interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface CreateAddressData {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

interface UpdateAddressData extends Partial<CreateAddressData> {
  isDefault?: boolean;
}

interface UpdatePreferencesData {
  language?: string;
  currency?: string;
  theme?: UserPreferences['theme'];
  notifications?: Partial<UserPreferences['notifications']>;
  marketing?: Partial<UserPreferences['marketing']>;
}

interface ApiResponse<T> {
  data: T;
  message: string;
}

const userService = {
  async getProfile(): Promise<User> {
    try {
      const response = await axios.get<ApiResponse<User>>(`${API_URL}/users/profile`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      throw new Error('Não foi possível carregar o perfil');
    }
  },

  async updateProfile(data: UpdateUserData): Promise<User> {
    try {
      const response = await axios.put<ApiResponse<User>>(
        `${API_URL}/users/profile`,
        data
      );
      toast.success('Perfil atualizado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw new Error('Não foi possível atualizar o perfil');
    }
  },

  async updatePassword(data: UpdatePasswordData): Promise<void> {
    try {
      await axios.put<ApiResponse<void>>(
        `${API_URL}/users/password`,
        data
      );
      toast.success('Senha atualizada com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      throw new Error('Não foi possível atualizar a senha');
    }
  },

  async updateAvatar(file: File): Promise<User> {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await axios.put<ApiResponse<User>>(
        `${API_URL}/users/avatar`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success('Avatar atualizado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar avatar:', error);
      throw new Error('Não foi possível atualizar o avatar');
    }
  },

  async getAddresses(): Promise<Address[]> {
    try {
      const response = await axios.get<ApiResponse<Address[]>>(`${API_URL}/users/addresses`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar endereços:', error);
      throw new Error('Não foi possível carregar os endereços');
    }
  },

  async createAddress(data: CreateAddressData): Promise<Address> {
    try {
      const response = await axios.post<ApiResponse<Address>>(
        `${API_URL}/users/addresses`,
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
        `${API_URL}/users/addresses/${id}`,
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
      await axios.delete(`${API_URL}/users/addresses/${id}`);
      toast.success('Endereço excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir endereço:', error);
      throw new Error('Não foi possível excluir o endereço');
    }
  },

  async getPreferences(): Promise<UserPreferences> {
    try {
      const response = await axios.get<ApiResponse<UserPreferences>>(
        `${API_URL}/users/preferences`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar preferências:', error);
      throw new Error('Não foi possível carregar as preferências');
    }
  },

  async updatePreferences(data: UpdatePreferencesData): Promise<UserPreferences> {
    try {
      const response = await axios.put<ApiResponse<UserPreferences>>(
        `${API_URL}/users/preferences`,
        data
      );
      toast.success('Preferências atualizadas com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar preferências:', error);
      throw new Error('Não foi possível atualizar as preferências');
    }
  },

  async deleteAccount(): Promise<void> {
    try {
      await axios.delete<ApiResponse<void>>(`${API_URL}/users/account`);
      toast.success('Conta excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      throw new Error('Não foi possível excluir a conta');
    }
  }
};

export default userService; 