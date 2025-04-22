import api from './api';

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'PERCENTAGE' | 'FIXED';
  minPurchase?: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
  usageCount: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCouponData {
  code: string;
  discount: number;
  type: 'PERCENTAGE' | 'FIXED';
  minPurchase?: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
}

class CouponService {
  async validate(code: string): Promise<Coupon> {
    const response = await api.post<Coupon>('/coupons/validate', { code });
    return response.data;
  }

  async create(data: CreateCouponData): Promise<Coupon> {
    const response = await api.post<Coupon>('/coupons', data);
    return response.data;
  }

  async getById(id: string): Promise<Coupon> {
    const response = await api.get<Coupon>(`/coupons/${id}`);
    return response.data;
  }

  async list(): Promise<Coupon[]> {
    const response = await api.get<Coupon[]>('/coupons');
    return response.data;
  }

  async update(id: string, data: Partial<CreateCouponData>): Promise<Coupon> {
    const response = await api.put<Coupon>(`/coupons/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/coupons/${id}`);
  }

  async calculateDiscount(code: string, total: number): Promise<number> {
    const response = await api.post<{ discount: number }>('/coupons/calculate', { code, total });
    return response.data.discount;
  }
}

export const couponService = new CouponService(); 