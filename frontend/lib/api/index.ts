// src/api/index.ts
import { AuthApi } from './auth/authApi';
import { CustomerApi } from './customer/customerApi';
import { BusinessApi } from './business/businessApi';

// export const authApi = () => new AuthApi();
// export const customerApi = new CustomerApi();
// export const businessApi = new BusinessApi();

// src/api/index.ts

export const getAuthApi = () => new AuthApi();
export const getCustomerApi = (token?: string) => new CustomerApi(token);
export const getBusinessApi = (token?: string) => new BusinessApi(token);