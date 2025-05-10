// src/api/customer/customerApi.ts
import { BaseApi } from '../baseApi';
import { Customer } from './customerTypes';

export class CustomerApi extends BaseApi {
  constructor(token?: string) {
    super('/api/user/customer');
    this.setToken(token)
  }

  // Lấy thông tin customer
  async getCustomer(id: string): Promise<Customer> {
    return this.get(`/${id}`);
  }

  // Tạo customer mới
  async createCustomer(data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> {
    return this.post('', data);
  }

  // Cập nhật customer
  async updateCustomer(id: string, data: Partial<Customer>): Promise<Customer> {
    return this.patch(`/${id}`, data);
  }

  // Xóa customer
  async deleteCustomer(id: string): Promise<void> {
    return this.delete(`/${id}`);
  }
}
