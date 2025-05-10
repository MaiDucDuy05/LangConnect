export interface Practitioner {
  id: number;
  name: string | null;   // name có thể là null
  email: string;
  userRole: string | null;
  phoneNumber: string;
  isVerified: boolean;
  isOnline: boolean;
  address: string;
  profilePic: string;
  subscriptionId: string | null;
  subscriptionPlan: string | null;
  description: string;
  businessType: string | null;
  experience: number | null; 
  dayStarted: string; // Date dưới dạng chuỗi (ISO 8601)
  degrees: Degree[];
  ratings: number | null; // ratings có thể là null
  specializations: Specialization[];
  clinicPhotos: string[]; // Giả sử là mảng chứa đường dẫn hình ảnh
  herbalMedicines: HerbalMedicine[];
  services: Service[];
  reviews: Review[];
  rating:number;
  products: Product[];

  schedule: {
    day: string;
    hours: string;
  }[];
  remedies: {
    id: number;
    name: string;
    urlPic: string | null;
    description: string | null;
    isEnable: boolean | null;
    businessUserId: number;
  }[];
  
}

// Degree interface
export interface Degree {
  name: string | null;
  urlPic: string | null;
  awardingBody: string | null;
  dateOfIssue: string | null;
  isEnable: boolean;
}

// Specialization interface
export interface Specialization {
  id: number;
  name: string;
  description: string | null;
  userIds: number[];
}

// HerbalMedicine interface
export interface HerbalMedicine {
  id: number;
  name: string;
  urlPic: string | null;
  dateOfIssue: string | null;
  awardingBody: string | null;
  isEnable: boolean | null;
  businessUserId: number;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; 
  description: string;
}

export interface Review {
  id: number;
  practitionerId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: string; 
  updatedAt: string;
}
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  practitionerId: number;
}