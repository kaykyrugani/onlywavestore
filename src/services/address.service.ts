import api from '../lib/api';

export interface Address {
  id: number;
  userId: number;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
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

export interface UpdateAddressData extends Partial<CreateAddressData> {}

class AddressService {
  async list(): Promise<Address[]> {
    const response = await api.get<Address[]>('/addresses');
    return response.data;
  }

  async getById(id: number): Promise<Address> {
    const response = await api.get<Address>(`/addresses/${id}`);
    return response.data;
  }

  async create(data: CreateAddressData): Promise<Address> {
    const response = await api.post<Address>('/addresses', data);
    return response.data;
  }

  async update(id: number, data: UpdateAddressData): Promise<Address> {
    const response = await api.put<Address>(`/addresses/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await api.delete(`/addresses/${id}`);
  }

  async setDefault(id: number): Promise<Address> {
    const response = await api.put<Address>(`/addresses/${id}/default`);
    return response.data;
  }

  async searchZipCode(zipCode: string): Promise<ViaCepResponse> {
    const cleanZipCode = zipCode.replace(/\D/g, '');
    const response = await fetch(`https://viacep.com.br/ws/${cleanZipCode}/json/`);
    const data = await response.json();
    
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }
    
    return data;
  }
}

export const addressService = new AddressService(); 