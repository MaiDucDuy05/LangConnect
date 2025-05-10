// src/api/auth/authApi.ts
import { BaseApi } from '../baseApi';
import { AuthLogin, AuthRegister, AuthForgotPassword } from './authTypes';

export class AuthApi extends BaseApi {
  constructor() {
    super('/api/auth');
  }

  // Đăng ký
  async registerCustomer(data: AuthRegister) {
    try {
      const response = await this.post('/signup/customer', data);
      return response;
    } catch (error) {
      console.error('Đăng ký thất bại:', error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  }

  async registerBusiness(data: AuthRegister) {
    try {
      const response = await this.post('/signup/business', data);
      return response;
    } catch (error) {
      console.error('Đăng ký thất bại:', error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  }

  // Đăng nhập
  async login(data: AuthLogin) {
    try {
      const response = await this.post('/login', data);
      return response;
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  }

  // Quên mật khẩu
  async forgotPassword(data: AuthForgotPassword) {
    try {
      const response = await this.post('/forgot-password', data);
      return response;
    } catch (error) {
      console.error('Quên mật khẩu thất bại:', error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  }
}
