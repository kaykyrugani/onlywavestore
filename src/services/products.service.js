import api from './api.service';

class ProductsService {
  async getProducts(params = {}) {
    try {
      const { data } = await api.get('/products', { params });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar produtos');
    }
  }

  async getProductById(id) {
    try {
      const { data } = await api.get(`/products/${id}`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar produto');
    }
  }

  async getCategories() {
    try {
      const { data } = await api.get('/categories');
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar categorias');
    }
  }

  async searchProducts(query) {
    try {
      const { data } = await api.get('/products/search', {
        params: { q: query }
      });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao pesquisar produtos');
    }
  }

  async getProductsByCategory(categoryId) {
    try {
      const { data } = await api.get(`/categories/${categoryId}/products`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar produtos da categoria');
    }
  }

  // Métodos administrativos (protegidos)
  async createProduct(productData) {
    try {
      const { data } = await api.post('/products', productData);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao criar produto');
    }
  }

  async updateProduct(id, productData) {
    try {
      const { data } = await api.put(`/products/${id}`, productData);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar produto');
    }
  }

  async deleteProduct(id) {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao deletar produto');
    }
  }

  // Upload de imagens
  async uploadProductImage(id, imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const { data } = await api.post(`/products/${id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer upload da imagem');
    }
  }
}

export default new ProductsService(); 