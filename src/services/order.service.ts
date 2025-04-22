import api from '../lib/api';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  items: OrderItem[];
  paymentMethod: string;
}

export interface OrderResponse {
  data: Order[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

class OrderService {
  async getOrders(): Promise<Order[]> {
    const response = await api.get('/orders');
    return response.data;
  }

  async getOrderById(id: string): Promise<Order> {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  }

  async createOrder(data: CreateOrderData): Promise<Order> {
    const response = await api.post('/orders', data);
    return response.data;
  }

  async getOrderStatus(orderId: string): Promise<{ status: OrderStatus; updatedAt: string }> {
    const response = await api.get(`/orders/${orderId}/status`);
    return response.data;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const response = await api.patch(`/orders/${orderId}/status`, { status });
    return response.data;
  }

  async cancelOrder(orderId: string): Promise<Order> {
    const response = await api.post(`/orders/${orderId}/cancel`);
    return response.data;
  }

  async getPaymentDetails(orderId: string): Promise<any> {
    const response = await api.get(`/orders/${orderId}/payment`);
    return response.data;
  }

  async generatePixPayment(orderId: string): Promise<{ qrCode: string; expirationDate: string }> {
    const response = await api.post(`/orders/${orderId}/payment/pix`);
    return response.data;
  }

  async generateBoletoPayment(orderId: string): Promise<{ boletoUrl: string; expirationDate: string }> {
    const response = await api.post(`/orders/${orderId}/payment/boleto`);
    return response.data;
  }
}

export default new OrderService(); 