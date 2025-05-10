export interface Clinic  {
    id: string;
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
  