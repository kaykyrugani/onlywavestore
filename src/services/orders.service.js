import api from './api.service';

class OrdersService {
  async createOrder(orderData) {
    try {
      const { data } = await api.post('/orders', orderData);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao criar pedido');
    }
  }

  async getOrders(params = {}) {
    try {
      const { data } = await api.get('/orders', { params });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar pedidos');
    }
  }

  async getOrderById(id) {
    try {
      const { data } = await api.get(`/orders/${id}`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar pedido');
    }
  }

  async updateOrderStatus(id, status) {
    try {
      const { data } = await api.patch(`/orders/${id}/status`, { status });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar status do pedido');
    }
  }

  async cancelOrder(id) {
    try {
      const { data } = await api.post(`/orders/${id}/cancel`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao cancelar pedido');
    }
  }

  // Métodos de pagamento
  async createPaymentIntent(orderId) {
    try {
      const { data } = await api.post(`/orders/${orderId}/payment`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao criar intenção de pagamento');
    }
  }

  async confirmPayment(orderId, paymentMethodId) {
    try {
      const { data } = await api.post(`/orders/${orderId}/payment/confirm`, {
        paymentMethodId
      });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao confirmar pagamento');
    }
  }

  // Métodos administrativos
  async getOrderAnalytics() {
    try {
      const { data } = await api.get('/orders/analytics');
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar análise de pedidos');
    }
  }

  async exportOrders(params = {}) {
    try {
      const { data } = await api.get('/orders/export', {
        params,
        responseType: 'blob'
      });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao exportar pedidos');
    }
  }
}

export default new OrdersService(); 