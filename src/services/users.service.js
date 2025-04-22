import api from './api.service';

class UsersService {
  async getCurrentUser() {
    try {
      const { data } = await api.get('/users/me');
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar usuário atual');
    }
  }

  async updateProfile(userData) {
    try {
      const { data } = await api.put('/users/profile', userData);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar perfil');
    }
  }

  async updatePassword(passwords) {
    try {
      const { data } = await api.put('/users/password', passwords);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar senha');
    }
  }

  async getAddresses() {
    try {
      const { data } = await api.get('/users/addresses');
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar endereços');
    }
  }

  async addAddress(address) {
    try {
      const { data } = await api.post('/users/addresses', address);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao adicionar endereço');
    }
  }

  async updateAddress(id, address) {
    try {
      const { data } = await api.put(`/users/addresses/${id}`, address);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar endereço');
    }
  }

  async deleteAddress(id) {
    try {
      await api.delete(`/users/addresses/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao deletar endereço');
    }
  }

  async getWishlist() {
    try {
      const { data } = await api.get('/users/wishlist');
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar lista de desejos');
    }
  }

  async addToWishlist(productId) {
    try {
      const { data } = await api.post('/users/wishlist', { productId });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao adicionar à lista de desejos');
    }
  }

  async removeFromWishlist(productId) {
    try {
      await api.delete(`/users/wishlist/${productId}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao remover da lista de desejos');
    }
  }

  // Métodos administrativos
  async getAllUsers(params = {}) {
    try {
      const { data } = await api.get('/admin/users', { params });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar usuários');
    }
  }

  async updateUserRole(userId, role) {
    try {
      const { data } = await api.patch(`/admin/users/${userId}/role`, { role });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar papel do usuário');
    }
  }
}

export default new UsersService(); 