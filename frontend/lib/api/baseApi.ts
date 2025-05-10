// src/api/baseApi.ts
export class BaseApi {
  baseUrl: string;
  private token?: string;

  constructor(endpoint: string) {
    const apiUrl = "";
    if (!apiUrl) {
      throw new Error('NEXT_PUBLIC_API_URL chưa được cấu hình trong .env');
    }
    this.baseUrl = `${apiUrl}${endpoint}`;
  }

  // ✅ Cho phép set token động từ bên ngoài
  setToken(token: string) {
    this.token = token;
  }

  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('Content-Type');
    let errorData: any = {};

    if (!response.ok) {
      if (contentType?.includes('application/json')) {
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: 'Lỗi không xác định từ server.' };
        }
      } else {
        errorData = { message: await response.text() };
      }

      console.error('Chi tiết lỗi API:', errorData);
      throw new Error(errorData.message || 'API Error');
    }

    if (contentType?.includes('application/json')) {
      return response.json();
    }

    return {} as T;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async delete<T = void>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }
}
