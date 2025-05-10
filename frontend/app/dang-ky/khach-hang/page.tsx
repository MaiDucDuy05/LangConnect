"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, User, Mail, Phone, Lock, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getAuthApi } from "@/lib/api";
import {  AuthRegister } from "@/lib/api/auth/authTypes"; // Import types
import { useToast } from "@/hooks/use-toast"

export default function CustomerRegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [registrationType, setRegistrationType] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    birthdate: "",
    gender: "",
    address: "",
    terms: false,
    newsletter: false,
  });

  const router = useRouter();
  const { toast } = useToast()
  const authApi = getAuthApi();

  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const plan = searchParams.get("plan");
  const isPremium = plan === "premium";

  // Update form data state on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle checkbox change for terms and newsletter
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData({ ...formData, [id]: checked });
  };

  // Registration handler
  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.fullname || !formData.password || !formData.birthdate || !formData.address) {
      toast({
        title: "Error",
        description: "Vui lòng điền đầy đủ thông tin.",
        variant: "default",
      })
      return;
    }

    if (registrationType === "email" && !formData.email) {
      toast({
        title: "Error",
        description: "Vui lòng nhập email.",
        variant: "default",
      })
      return;
    }

    if (registrationType === "phone" && !formData.phone) {
      toast({
        title: "Error",
        description: "Vui lòng nhập số điện thoại.",
        variant: "default",
      })
      return;
    }

    if (!formData.terms) {
      toast({
        title: "Error",
        description: "Bạn phải đồng ý với Điều khoản sử dụng.",
        variant: "default",
      })
      return;
    }

    const registrationData: AuthRegister = {
      name: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      birthdate: formData.birthdate,
      gender: formData.gender,
      address: formData.address,
    };

    try {
      const response = await authApi.registerCustomer(registrationData) ;
        toast({
          title: "Success",
          description: "Đăng ký thành công!",
          variant: "default",
        })
        if (isPremium) {
          router.push("/thanh-toan/goi-dich-vu?type=user");
        } else {
          router.push("/dang-nhap");
        }
    } catch (error) {
      toast({
        title: "Eror",
        description: (error as { message?: string })?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
        variant: "destructive",
      })
    }
  };

  return (
    <>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Đăng Ký Tài Khoản</h1>
            <p className="text-gray-500">Tạo tài khoản để trải nghiệm dịch vụ của ĐôngYConnect</p>
            {isPremium && (
              <div className="mt-2 inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Đăng ký Gói Sức Khỏe Xanh
              </div>
            )}
          </div>
          <Card>
            <CardHeader>
              <Tabs defaultValue={registrationType} onValueChange={(value) => setRegistrationType(value as "email" | "phone")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Số điện thoại</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegistration}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullname">Họ và tên</Label>
                    <div className="relative">
                      <Input id="fullname" value={formData.fullname} onChange={handleInputChange} placeholder="Nguyễn Văn A" className="pl-10" />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

                  {registrationType === "email" ? (
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="example@email.com"
                          className="pl-10"
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <div className="relative">
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="0912345678"
                          className="pl-10"
                        />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="password">Mật khẩu</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="pl-10"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="birthdate">Ngày sinh</Label>
                      <div className="relative">
                        <Input id="birthdate" type="date" value={formData.birthdate} onChange={handleInputChange} className="pl-10" />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="gender">Giới tính</Label>
                      <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Nam</SelectItem>
                          <SelectItem value="female">Nữ</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Địa chỉ</Label>
                    <div className="relative">
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Số nhà, đường phố, quận, thành phố"
                        className="pl-10"
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Checkbox id="terms" checked={formData.terms} 
                    onCheckedChange={(checked) => handleCheckboxChange({ target: { id: "terms", checked } } as React.ChangeEvent<HTMLInputElement>)} />
                    <Label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      Tôi đồng ý với{" "}
                      <Link href="#" className="text-blue-600">
                        Điều khoản sử dụng
                      </Link>{" "}
                      và{" "}
                      <Link href="#" className="text-blue-600">
                        Chính sách bảo mật
                      </Link>
                    </Label>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" onClick={handleRegistration}>
                Đăng Ký
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
