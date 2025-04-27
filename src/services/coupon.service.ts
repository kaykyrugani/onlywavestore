import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface Coupon {
  id: string;
  code: string;
  description: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minValue?: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateCouponData {
  code: string;
  description: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minValue?: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
}

interface UpdateCouponData {
  description?: string;
  discount?: number;
  discountType?: 'percentage' | 'fixed';
  minValue?: number;
  maxDiscount?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

interface ApiResponse<T> {
  data: T;
  message: string;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface CouponFilters {
  code?: string;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

const couponService = {
  async getCoupons(filters: CouponFilters = {}): Promise<PaginatedResponse<Coupon>> {
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<Coupon>>>(
        `${API_URL}/coupons`,
        { params: filters }
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar cupons:', error);
      throw new Error('Não foi possível carregar os cupons');
    }
  },

  async getCoupon(id: string): Promise<Coupon> {
    try {
      const response = await axios.get<ApiResponse<Coupon>>(
        `${API_URL}/coupons/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar cupom:', error);
      throw new Error('Não foi possível carregar o cupom');
    }
  },

  async createCoupon(data: CreateCouponData): Promise<Coupon> {
    try {
      const response = await axios.post<ApiResponse<Coupon>>(
        `${API_URL}/coupons`,
        data
      );
      toast.success('Cupom criado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar cupom:', error);
      throw new Error('Não foi possível criar o cupom');
    }
  },

  async updateCoupon(id: string, data: UpdateCouponData): Promise<Coupon> {
    try {
      const response = await axios.put<ApiResponse<Coupon>>(
        `${API_URL}/coupons/${id}`,
        data
      );
      toast.success('Cupom atualizado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar cupom:', error);
      throw new Error('Não foi possível atualizar o cupom');
    }
  },

  async deleteCoupon(id: string): Promise<void> {
    try {
      await axios.delete<ApiResponse<void>>(`${API_URL}/coupons/${id}`);
      toast.success('Cupom excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir cupom:', error);
      throw new Error('Não foi possível excluir o cupom');
    }
  },

  async validateCoupon(code: string): Promise<Coupon> {
    try {
      const response = await axios.get<ApiResponse<Coupon>>(
        `${API_URL}/coupons/validate/${code}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao validar cupom:', error);
      throw new Error('Não foi possível validar o cupom');
    }
  },

  async applyCoupon(code: string, total: number): Promise<number> {
    try {
      const response = await axios.post<ApiResponse<number>>(
        `${API_URL}/coupons/apply`,
        { code, total }
      );
      toast.success('Cupom aplicado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao aplicar cupom:', error);
      throw new Error('Não foi possível aplicar o cupom');
    }
  },

  async validate(code: string): Promise<Coupon> {
    try {
      const response = await axios.get<ApiResponse<Coupon>>(
        `${API_URL}/coupons/validate/${code}`
      );
      return response.data.data;
    } catch (error) {
      toast.error('Cupom inválido ou expirado');
      throw error;
    }
  },

  async calculateDiscount(code: string, total: number): Promise<number> {
    try {
      const response = await axios.post<ApiResponse<{ discount: number }>>(
        `${API_URL}/coupons/calculate-discount`,
        { code, total }
      );
      return response.data.data.discount;
    } catch (error) {
      toast.error('Erro ao calcular desconto');
      throw error;
    }
  },
};

export default couponService;