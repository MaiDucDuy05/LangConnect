export interface BaseUser {
    id: number;
    name: string;
    email: string;
    userRole: 'CUSTOMER' | 'BUSINESS' | string;
    phoneNumber?: string;
    address?: string;
    profilePic?: string;
    subscriptionId?: number;
    subscriptionStartDate?: string;
    subscriptionEndDate?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Customer extends BaseUser {
    userRole: 'CUSTOMER';
    dob?: string;
    gender?: string;
  }
  
  export interface Business extends BaseUser {
    userRole: 'BUSINESS';
    businessName: string;
    businessType: string;
    licenseNumber?: string;
  }
  