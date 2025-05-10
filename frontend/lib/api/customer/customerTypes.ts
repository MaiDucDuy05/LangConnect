// src/api/customer/customerTypes.ts
export interface Customer {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    address?: string;
    createdAt: string;
    updatedAt: string;
    decription?: string;
  }
  