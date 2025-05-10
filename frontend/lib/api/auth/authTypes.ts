// src/api/auth/authTypes.ts

export interface AuthRegister {
  name: string
  email: string
  phoneNumber: string
  password: string
  birthdate: string
  gender: string
  address: string

  // Thông tin bổ sung
  businessType: "HERBALIST" | "MEDICAL_CLINIC"
  licenseType?: "level1" | "level2" // Chỉ áp dụng cho practitioner
  experience?: number // Số năm kinh nghiệm cho practitioner
  establishedYear?: number // Năm thành lập cho clinic
  specializations?: any[] // Danh sách chuyên môn đã chọn
  description?: string // Giới thiệu ngắn
  username?: string // Tên đăng nhập

  // Tài liệu và xác minh
  idCardFront?: string // URL ảnh CMND/CCCD mặt trước
  idCardBack?: string // URL ảnh CMND/CCCD mặt sau
  licenseCertificate?: string // URL ảnh chứng nhận hành nghề/bài thuốc
  clinicLicense?: string // URL giấy phép hoạt động phòng khám
  doctorLicense?: string // URL giấy phép hành nghề của bác sĩ phụ trách

  // Thông tin khác
  isPremium?: boolean // Có đăng ký gói premium không
  termsAccepted?: boolean // Đã đồng ý điều khoản chưa
}

export interface AuthLogin {
  email: string
  password: string
}

export interface AuthForgotPassword {
  email: string
}
