// src/api/business/businessApi.ts
import { BaseApi } from '../baseApi';
import { Business } from './businessTypes';

export class BusinessApi extends BaseApi {
  constructor(token?:string) {
    super('/api/user/business');
    this.setToken(token||"");
  }

  // Lấy thông tin business
  async getBusiness(type:String): Promise<Business> {
    return this.get(`?businessType=${type}`);
  }

  async getBusinessById(id: string): Promise<Business> {
    return this.get(`/${id}`);
  }

  // Tạo business mới
  async createBusiness(data: Omit<Business, 'id' | 'createdAt' | 'updatedAt'>): Promise<Business> {
    return this.post('', data);
  }

  // Cập nhật business
  async updateBusiness(id: string, data: Partial<Business>): Promise<Business> {
    return this.patch(`/${id}`, data);
  }

  // Xóa business
  async deleteBusiness(id: string): Promise<void> {
    return this.delete(`/${id}`);
  }
}
