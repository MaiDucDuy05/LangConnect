"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronRight,
  ChevronLeft,
  Camera,
  FileText,
  User,
  Building,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Thêm import cho AuthApi và AuthRegister
import { AuthApi } from "@/lib/api/auth/authApi"
import type { AuthRegister } from "@/lib/api/auth/authTypes"

export default function PractitionerRegistrationPage() {
  const [step, setStep] = useState(1)
  const [accountType, setAccountType] = useState<"HERBALIST" | "MEDICAL_CLINIC">("HERBALIST")
  const [progress, setProgress] = useState(20)
  const [licenseType, setLicenseType] = useState<"level1" | "level2">("level1")

  // Thêm state để lưu trữ dữ liệu form và trạng thái đăng ký
  // Thêm sau dòng const [licenseType, setLicenseType] = useState<"level1" | "level2">("level1")
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
  const plan = searchParams.get("plan")
  const isPremium = plan === "premium"
  const [formData, setFormData] = useState<Partial<AuthRegister>>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    birthdate: "",
    gender: "",
    address: "",
    businessType: accountType,
    licenseType: licenseType,
    experience: undefined,
    establishedYear: undefined,
    specializations: [],
    description: "",
    username: "",
    idCardFront: "",
    idCardBack: "",
    licenseCertificate: "",
    clinicLicense: "",
    doctorLicense: "",
    isPremium: isPremium,
    termsAccepted: false,
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState(false)
  // Add error state after the other state declarations
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Thêm đoạn code này để lấy tham số plan từ URL

  const router = useRouter()

  // Update nextStep to validate current step before proceeding
  const nextStep = () => {
    // Validate current step before proceeding
    let isValid = true
    const newErrors: Record<string, string> = {}

    if (step === 2) {
      // Validate basic information
      if (!formData.name) {
        newErrors.name = "Vui lòng nhập họ tên/tên phòng khám"
        isValid = false
      }
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = "Vui lòng nhập số điện thoại"
        isValid = false
      }
      if (formData.phoneNumber && !/^[0-9]{10}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Số điện thoại không hợp lệ (cần 10 số)"
        isValid = false
      }
      if (!formData.email) {
        newErrors.email = "Vui lòng nhập email"
        isValid = false
      }
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email không hợp lệ"
        isValid = false
      }
      if (!formData.address) {
        newErrors.address = "Vui lòng nhập địa chỉ"
        isValid = false
      }
      if (!formData.description || formData.description.trim().length < 10) {
        newErrors.description = "Vui lòng nhập giới thiệu ít nhất 10 ký tự"
        isValid = false
      }
      if (!formData.specializations || formData.specializations.length === 0) {
        newErrors.specializations = "Vui lòng chọn ít nhất một chuyên môn"
        isValid = false
      }
    } else if (step === 3) {
      // Validate additional information
      
    } else if (step === 4) {
      // Validate account setup
      if (!formData.username) {
        newErrors.username = "Vui lòng nhập tên đăng nhập"
        isValid = false
      }
      if (!formData.password) {
        newErrors.password = "Vui lòng nhập mật khẩu"
        isValid = false
      }
      if (formData.password && formData.password.length < 6) {
        newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
        isValid = false
      }
      if (formData.password !== confirmPassword) {
        newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
        isValid = false
      }
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = "Bạn cần đồng ý với điều khoản sử dụng"
        isValid = false
      }
    }

    setErrors(newErrors)

    if (isValid) {
      const newStep = step + 1
      setStep(newStep)
      setProgress(newStep * 20)
    }
  }

  const prevStep = () => {
    const newStep = step - 1
    setStep(newStep)
    setProgress(newStep * 20)
  }

  // Thêm hàm xử lý thay đổi input
  // Thêm sau hàm prevStep
  // Update handleInputChange to clear errors when field is changed
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Update handleNumberInputChange to clear errors
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value ? Number.parseInt(value, 10) : undefined,
    }))

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Update handleSelectChange to clear errors
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Update handleSpecialtyChange to clear errors
  const handleSpecialtyChange = (specialty: number, checked: boolean) => {
    setFormData((prev) => {
      const currentSpecialties = prev.specializations || []
      const newSpecialties = checked
        ? [...currentSpecialties, specialty]
        : currentSpecialties.filter((s) => s !== specialty)

      // Clear error if at least one specialty is selected
      if (newSpecialties.length > 0 && errors.specializations) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.specializations
          return newErrors
        })
      }

      return {
        ...prev,
        specializations: newSpecialties,
      }
    })
  }

  // Update handleTermsChange to clear errors
  const handleTermsChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: checked,
    }))

    // Clear error if terms are accepted
    if (checked && errors.termsAccepted) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.termsAccepted
        return newErrors
      })
    }
  }

  // Add validation function before handleSubmit
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Step 2: Basic Information validation
    if (!formData.name) newErrors.name = "Vui lòng nhập họ tên/tên phòng khám"
    if (!formData.phoneNumber) newErrors.phoneNumber = "Vui lòng nhập số điện thoại"
    if (formData.phoneNumber && !/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ (cần 10 số)"
    }
    if (!formData.email) newErrors.email = "Vui lòng nhập email"
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }
    if (!formData.address) newErrors.address = "Vui lòng nhập địa chỉ"

    // Step 3: Additional information validation
    if (accountType === "HERBALIST" && !formData.experience) {
      newErrors.experience = "Vui lòng nhập số năm kinh nghiệm"
    }
    if (accountType === "MEDICAL_CLINIC" && !formData.establishedYear) {
      newErrors.establishedYear = "Vui lòng nhập năm thành lập"
    }
    if (!formData.description || formData.description.trim().length < 10) {
      newErrors.description = "Vui lòng nhập giới thiệu ít nhất 10 ký tự"
    }
    if (!formData.specializations || formData.specializations.length === 0) {
      newErrors.specializations = "Vui lòng chọn ít nhất một chuyên môn"
    }

    // Step 4: Account setup validation
    if (!formData.username) newErrors.username = "Vui lòng nhập tên đăng nhập"
    if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu"
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }
    if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "Bạn cần đồng ý với điều khoản sử dụng"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Thêm hàm xử lý đăng ký
  // Thêm sau hàm handleInputChange
  // Update handleSubmit to validate form before submitting
  const handleSubmit = async () => {
    // Validate form before submitting
    if (!validateForm()) {
      // Show error message if validation fails
      setSubmitError("Vui lòng điền đầy đủ thông tin bắt buộc")
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Cập nhật accountType và licenseType từ state
      formData.businessType = accountType
      formData.licenseType = licenseType
      formData.isPremium = isPremium

      const authApi = new AuthApi()
      const registerData: AuthRegister = {
        name: formData.name || "",
        email: formData.email || "",
        phoneNumber: formData.phoneNumber || "",
        password: formData.password || "",
        birthdate: formData.birthdate || "",
        gender: formData.gender || "",
        address: formData.address || "",
        businessType: formData.businessType || "HERBALIST",
        licenseType: formData.licenseType,
        experience: formData.experience,
        establishedYear: formData.establishedYear,
        specializations: (formData.specializations || []).map((id: number) => ({ id })),
        description: formData.description || "",
        username: formData.username || "",
        idCardFront: formData.idCardFront,
        idCardBack: formData.idCardBack,
        licenseCertificate: formData.licenseCertificate,
        clinicLicense: formData.clinicLicense,
        doctorLicense: formData.doctorLicense,
        isPremium: formData.isPremium,
      }

      const response = await authApi.registerBusiness(registerData)

      setSubmitSuccess(true)

      // Nếu là gói premium, chuyển hướng đến trang thanh toán
      if (isPremium) {
        router.push("/thanh-toan/goi-dich-vu?type=practitioner")
      }
    } catch (error) {
      console.error("Đăng ký thất bại:", error)
      setSubmitError("Đăng ký thất bại. Vui lòng thử lại sau.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Đăng Ký Tài Khoản {accountType === "HERBALIST" ? "Thầy Lang" : "Phòng Khám Đông Y"}
          </h1>
          <p className="text-gray-500">
            Tham gia nền tảng ĐôngYConnect để kết nối với bệnh nhân và phát triển dịch vụ của bạn
          </p>
          {isPremium && (
            <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Đăng ký Gói Cộng Tác Sức Khỏe
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm">Bước {step}/5</span>
            <span className="text-sm">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Account Type Selection */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Chọn Loại Tài Khoản</CardTitle>
              <CardDescription>Vui lòng chọn loại tài khoản phù hợp với bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue={accountType}
                onValueChange={(value) => {
                  setAccountType(value as "HERBALIST" | "MEDICAL_CLINIC")
                  setFormData((prev) => ({
                    ...prev,
                    accountType: value as "HERBALIST" | "MEDICAL_CLINIC",
                  }))
                }}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="practitioner">Thầy Lang Cá Nhân</TabsTrigger>
                  <TabsTrigger value="clinic">Phòng Khám Đông Y</TabsTrigger>
                </TabsList>
                <TabsContent value="practitioner" className="mt-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <User className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Thầy Lang Cá Nhân</h3>
                      <p className="text-gray-500 text-sm">
                        Dành cho các thầy lang, lương y cá nhân muốn cung cấp dịch vụ khám chữa bệnh, tư vấn và bán các
                        bài thuốc đông y.
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Đăng bài chia sẻ kiến thức y học cổ truyền</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Tư vấn trực tuyến cho bệnh nhân</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Đăng bán các bài thuốc đông y</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Nhận đặt lịch khám trực tiếp (tùy cấp độ)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="clinic" className="mt-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Phòng Khám Đông Y</h3>
                      <p className="text-gray-500 text-sm">
                        Dành cho các phòng khám, cơ sở y tế đông y muốn quảng bá dịch vụ và kết nối với bệnh nhân.
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Quản lý hồ sơ phòng khám chuyên nghiệp</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Quản lý nhiều bác sĩ/thầy lang</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Hệ thống đặt lịch khám tự động</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Quản lý bệnh nhân và hồ sơ bệnh án</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={nextStep}>
                Tiếp tục
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Basic Information */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Thông Tin Cơ Bản</CardTitle>
              <CardDescription>
                Vui lòng cung cấp thông tin cơ bản của {accountType === "HERBALIST" ? "bạn" : "phòng khám"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">{accountType === "HERBALIST" ? "Họ và tên" : "Tên phòng khám"}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      placeholder={accountType === "HERBALIST" ? "Nguyễn Văn A" : "Phòng Khám Đông Y Minh Đường"}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  {accountType === "HERBALIST" && (
                    <div>
                      <Label htmlFor="title">Chức danh</Label>
                      <Select onValueChange={(value) => handleSelectChange("title", value)}>
                        <SelectTrigger id="title">
                          <SelectValue placeholder="Chọn chức danh" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="thay-lang">Thầy Lang</SelectItem>
                          <SelectItem value="luong-y">Lương Y</SelectItem>
                          <SelectItem value="bac-si-yhct">Bác sĩ Y học cổ truyền</SelectItem>
                          <SelectItem value="tien-si-yhct">Tiến sĩ Y học cổ truyền</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="phoneNumber">Số điện thoại liên hệ</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber || ""}
                      onChange={handleInputChange}
                      placeholder="0912345678"
                      type="tel"
                      className={errors.phoneNumber ? "border-red-500" : ""}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email">Email (nếu có)</Label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                      type="email"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="address">
                      {accountType === "HERBALIST" ? "Địa chỉ hoạt động" : "Địa chỉ phòng khám"}
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleInputChange}
                      placeholder="123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh"
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  {accountType === "HERBALIST" && (
                    <div>
                      <Label htmlFor="experience">Số năm kinh nghiệm</Label>
                      <Input
                        id="experience"
                        name="experience"
                        value={formData.experience || ""}
                        onChange={handleNumberInputChange}
                        placeholder="10"
                        type="number"
                        className={errors.experience ? "border-red-500" : ""}
                      />
                      {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                    </div>
                  )}

                  {accountType === "MEDICAL_CLINIC" && (
                    <div>
                      <Label htmlFor="established">Năm thành lập</Label>
                      <Input
                        id="established"
                        name="establishedYear"
                        value={formData.establishedYear || ""}
                        onChange={handleNumberInputChange}
                        placeholder="2010"
                        type="number"
                        className={errors.establishedYear ? "border-red-500" : ""}
                      />
                      {errors.establishedYear && <p className="text-red-500 text-sm mt-1">{errors.establishedYear}</p>}
                    </div>
                  )}

                  <div>
                    <Label htmlFor="specialties">Chuyên môn</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        "Châm cứu",
                        "Bấm huyệt",
                        "Xương khớp",
                        "Thần kinh",
                        "Da liễu",
                        "Tiêu hóa",
                        "Mất ngủ",
                        "Gan mật",
                      ].map((specialty, index) => (
                        <div key={specialty} className="flex items-center space-x-2">
                          <Checkbox
                            id={`specialty-${specialty}`}
                            checked={formData.specializations?.includes(index + 1) || false}
                            onCheckedChange={(checked) => handleSpecialtyChange(index + 1, checked as boolean)}
                          />
                          <label htmlFor={`specialty-${specialty}`} className="text-sm">
                            {specialty}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.specializations && <p className="text-red-500 text-sm mt-1">{errors.specializations}</p>}
                  </div>

                  <div>
                    <Label htmlFor="description">Giới thiệu ngắn</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description || ""}
                      onChange={handleInputChange}
                      placeholder={
                        accountType === "HERBALIST"
                          ? "Giới thiệu ngắn về bản thân, kinh nghiệm và chuyên môn của bạn..."
                          : "Giới thiệu ngắn về phòng khám, dịch vụ và đội ngũ y bác sĩ..."
                      }
                      rows={4}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Quay lại
              </Button>
              <Button onClick={nextStep}>
                Tiếp tục
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Identity Verification & License */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Xác Minh Danh Tính & Giấy Phép Hành Nghề</CardTitle>
              <CardDescription>
                {accountType === "HERBALIST"
                  ? "Vui lòng cung cấp giấy tờ xác minh danh tính và chứng nhận hành nghề"
                  : "Vui lòng cung cấp giấy phép hoạt động phòng khám và giấy phép hành nghề của bác sĩ phụ trách"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {accountType === "HERBALIST" && (
                  <>
                    <div>
                      <Label className="mb-2 block">Ảnh CMND/CCCD</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer">
                          <div className="flex flex-col items-center">
                            <Camera className="h-8 w-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">Mặt trước</span>
                            <span className="text-xs text-gray-400 mt-1">Nhấp để tải lên</span>
                          </div>
                        </div>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer">
                          <div className="flex flex-col items-center">
                            <Camera className="h-8 w-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">Mặt sau</span>
                            <span className="text-xs text-gray-400 mt-1">Nhấp để tải lên</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">Cấp độ tài khoản</Label>
                      <RadioGroup
                        defaultValue={licenseType}
                        onValueChange={(value) => {
                          setLicenseType(value as "level1" | "level2")
                          setFormData((prev) => ({
                            ...prev,
                            licenseType: value as "level1" | "level2",
                          }))
                        }}
                      >
                        <div className="flex items-start space-x-2 mb-4">
                          <RadioGroupItem value="level1" id="level1" className="mt-1" />
                          <div>
                            <Label htmlFor="level1" className="font-medium">
                              Cấp 1 - Chứng nhận bài thuốc gia truyền
                            </Label>
                            <p className="text-sm text-gray-500">
                              Có thể đăng bài chia sẻ kiến thức YHCT, đăng bài thuốc bán, tư vấn trong phạm vi bài
                              thuốc. Không thể đặt lịch khám, chỉ được giải đáp về cách sử dụng thuốc, không được chẩn
                              bệnh & kê đơn online.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="level2" id="level2" className="mt-1" />
                          <div>
                            <Label htmlFor="level2" className="font-medium">
                              Cấp 2 - Chứng nhận hành nghề
                            </Label>
                            <p className="text-sm text-gray-500">
                              Có thể đăng bài chia sẻ kiến thức YHCT, đăng bài thuốc bán, tư vấn, đặt lịch khám và kê
                              đơn online.
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="mb-2 block">
                        {licenseType === "level1" ? "Ảnh chứng nhận bài thuốc gia truyền" : "Ảnh chứng nhận hành nghề"}
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
                        <div className="flex flex-col items-center">
                          <FileText className="h-10 w-10 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">
                            {licenseType === "level1"
                              ? "Tải lên ảnh chứng nhận bài thuốc gia truyền"
                              : "Tải lên ảnh chứng nhận hành nghề"}
                          </span>
                          <span className="text-xs text-gray-400 mt-1">Hỗ trợ định dạng JPG, PNG (tối đa 5MB)</span>
                          <Button variant="outline" className="mt-4">
                            <Upload className="mr-2 h-4 w-4" />
                            Tải lên
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {accountType === "MEDICAL_CLINIC" && (
                  <>
                    <div>
                      <Label className="mb-2 block">Giấy phép hoạt động phòng khám Đông y</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
                        <div className="flex flex-col items-center">
                          <FileText className="h-10 w-10 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Tải lên ảnh giấy phép hoạt động phòng khám</span>
                          <span className="text-xs text-gray-400 mt-1">Hỗ trợ định dạng JPG, PNG (tối đa 5MB)</span>
                          <Button variant="outline" className="mt-4">
                            <Upload className="mr-2 h-4 w-4" />
                            Tải lên
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">Giấy phép hành nghề của bác sĩ phụ trách</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
                        <div className="flex flex-col items-center">
                          <FileText className="h-10 w-10 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">
                            Tải lên ảnh giấy phép hành nghề của bác sĩ phụ trách
                          </span>
                          <span className="text-xs text-gray-400 mt-1">Hỗ trợ định dạng JPG, PNG (tối đa 5MB)</span>
                          <Button variant="outline" className="mt-4">
                            <Upload className="mr-2 h-4 w-4" />
                            Tải lên
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex">
                    <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-700">Lưu ý về quy trình xét duyệt:</p>
                      <ul className="text-sm text-blue-600 list-disc pl-5 mt-1 space-y-1">
                        <li>Hệ thống sẽ kiểm tra và xác thực tài liệu trong 3-5 ngày làm việc.</li>
                        <li>Nếu hợp lệ, tài khoản sẽ được kích hoạt.</li>
                        <li>Nếu bị từ chối, bạn sẽ nhận thông báo yêu cầu bổ sung hoặc điều chỉnh thông tin.</li>
                        <li>Có thể có video call ngắn để xác minh danh tính.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Quay lại
              </Button>
              <Button onClick={nextStep}>
                Tiếp tục
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Account Setup */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Thiết Lập Tài Khoản</CardTitle>
              <CardDescription>Tạo tài khoản để đăng nhập vào hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Tên đăng nhập</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username || ""}
                    onChange={handleInputChange}
                    placeholder="tenlang123"
                    className={errors.username ? "border-red-500" : ""}
                  />
                  {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>
                <div>
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    id="password"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleInputChange}
                    type="password"
                    placeholder="••••••••"
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div>
                  <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                  <Input
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      if (errors.confirmPassword && e.target.value === formData.password) {
                        setErrors((prev) => {
                          const newErrors = { ...prev }
                          delete newErrors.confirmPassword
                          return newErrors
                        })
                      }
                    }}
                    type="password"
                    placeholder="••••••••"
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <div className="pt-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      className={`mt-1 ${errors.termsAccepted ? "border-red-500" : ""}`}
                      checked={formData.termsAccepted || false}
                      onCheckedChange={(checked) => handleTermsChange(checked as boolean)}
                    />
                    <div>
                      <Label htmlFor="terms">Tôi đồng ý với Điều khoản sử dụng và Chính sách bảo mật</Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Bằng cách đăng ký, bạn đồng ý tuân thủ các quy định của nền tảng ĐôngYConnect về việc cung cấp
                        dịch vụ y tế và bán sản phẩm đông y.
                      </p>
                      {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Quay lại
              </Button>
              <Button onClick={nextStep}>
                Tiếp tục
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <Card>
            <CardHeader>
              <CardTitle>Xác Nhận Đăng Ký</CardTitle>
              <CardDescription>Vui lòng kiểm tra lại thông tin trước khi gửi đăng ký</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-green-700">Bạn đã hoàn thành các bước đăng ký!</p>
                      <p className="text-sm text-green-600 mt-1">
                        Sau khi gửi đăng ký, hệ thống sẽ tiến hành xét duyệt tài khoản của bạn trong vòng 3-5 ngày làm
                        việc.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Loại tài khoản</h3>
                    <p className="font-medium">
                      {accountType === "HERBALIST" ? "Thầy Lang Cá Nhân" : "Phòng Khám Đông Y"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      {accountType === "HERBALIST" ? "Họ và tên" : "Tên phòng khám"}
                    </h3>
                    <p className="font-medium">{formData.name}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Số điện thoại</h3>
                    <p className="font-medium">{formData.phoneNumber}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="font-medium">{formData.email}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      {accountType === "HERBALIST" ? "Địa chỉ hoạt động" : "Địa chỉ phòng khám"}
                    </h3>
                    <p className="font-medium">{formData.address}</p>
                  </div>

                  {accountType === "HERBALIST" && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Cấp độ tài khoản</h3>
                      <p className="font-medium">
                        {licenseType === "level1"
                          ? "Cấp 1 - Chứng nhận bài thuốc gia truyền"
                          : "Cấp 2 - Chứng nhận hành nghề"}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Tài liệu đã tải lên</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {accountType === "HERBALIST" ? (
                        <>
                          <li>CMND/CCCD (mặt trước và sau)</li>
                          <li>
                            {licenseType === "level1" ? "Chứng nhận bài thuốc gia truyền" : "Chứng nhận hành nghề"}
                          </li>
                        </>
                      ) : (
                        <>
                          <li>Giấy phép hoạt động phòng khám Đông y</li>
                          <li>Giấy phép hành nghề của bác sĩ phụ trách</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-yellow-700">Các bước tiếp theo sau khi được phê duyệt:</p>
                      <ul className="text-sm text-yellow-600 list-disc pl-5 mt-1 space-y-1">
                        <li>Hoàn thiện hồ sơ cá nhân / phòng khám</li>
                        <li>Cập nhật hình ảnh, danh sách dịch vụ, bài thuốc, lịch làm việc</li>
                        <li>Cấu hình phương thức nhận thanh toán (nếu có)</li>
                        <li>Bắt đầu hoạt động trên nền tảng</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {isPremium && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-700">Gói Cộng Tác Sức Khỏe</p>
                        <p className="text-sm text-blue-600 mt-1">
                          Bạn đang đăng ký tài khoản với Gói Cộng Tác Sức Khỏe (299.000đ/tháng). Sau khi tài khoản được
                          xét duyệt, bạn sẽ được hướng dẫn thanh toán để kích hoạt gói.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {submitError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-red-700">{submitError}</p>
                  </div>
                </div>
              )}

              {submitSuccess && !isPremium && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-green-700">Đăng ký thành công! Vui lòng chờ xét duyệt.</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Quay lại
              </Button>
              {isPremium ? (
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => router.push("/thanh-toan/goi-dich-vu?type=practitioner")}
                >
                  Tiếp tục thanh toán
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Đang xử lý..." : "Gửi đăng ký"}
                  {!isSubmitting && <CheckCircle className="ml-2 h-4 w-4" />}
                </Button>
              )}
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
