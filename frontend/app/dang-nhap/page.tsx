"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Mail, Phone, Lock } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { getAuthApi } from "@/lib/api";
import {  AuthLogin } from "@/lib/api/auth/authTypes";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginType, setLoginType] = useState<"email" | "phone">("email")
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    remember: false,
  })
  const { login } = useAuth();

  const router = useRouter()
  const { toast } = useToast()
  const authApi = getAuthApi();

  // 🟩 Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  // 🟩 Xử lý đăng nhập
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

      const loginData: AuthLogin = {
            email: formData.email,
            password: formData.password,
          };
      try {
        const response = await authApi.login(loginData) as { jwt: string; userId: string; userRole: string; [key: string]: any };
        const {jwt , ...user } = response;
        login({ token:jwt, user });
          toast({
            title: "Success",
            description: "Đăng nhập thành công!",
            variant: "default",
          })
            router.push("/");
      } catch (error) {
        toast({
          title: "Đăng nhập thất bại",
          description: (error as { message?: string })?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
          variant: "destructive",
        })
      }   
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Đăng Nhập</h1>
          <p className="text-gray-500">Đăng nhập để trải nghiệm dịch vụ của LangConnect</p>
        </div>

        <Card>
          <CardHeader>
            <Tabs defaultValue={loginType} onValueChange={(value) => setLoginType(value as "email" | "phone")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Số điện thoại</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                {loginType === "email" ? (
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input id="email" type="email" placeholder="example@email.com" className="pl-10" value={formData.email} onChange={handleChange} />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <div className="relative">
                      <Input id="phone" type="tel" placeholder="0912345678" className="pl-10" value={formData.phone} onChange={handleChange} />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Link href="/quen-mat-khau" className="text-sm text-green-600 hover:underline">
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      value={formData.password}
                      onChange={handleChange}
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
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" checked={formData.remember} onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, remember: !!checked }))} />
                  <Label htmlFor="remember" className="text-sm">Ghi nhớ đăng nhập</Label>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">Đăng Nhập</Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="mt-4 text-center text-sm">
              Chưa có tài khoản?{" "}
              <Link href="/dang-ky/khach-hang" className="text-green-600 hover:underline">
                Đăng ký
              </Link>
            </div>
          </CardFooter>
        </Card>

      
        <div className="mt-6 grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </div>


        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Bạn là thầy lang hoặc có phòng khám?</p>
          <Link href="/dang-ky/thay-lang-phong-kham" className="text-sm text-green-600 hover:underline font-medium">
            Đăng ký tài khoản Thầy Lang / Phòng Khám
          </Link>
        </div>
      </div>
    </div>
  )
}
