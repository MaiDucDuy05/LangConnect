"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, CreditCard, Shield, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function SubscriptionCheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "user" // user hoặc practitioner
  const [paymentMethod, setPaymentMethod] = useState("momo")
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  // Thông tin gói dịch vụ
  const subscriptionData = {
    user: {
      name: "Gói Sức Khỏe Xanh",
      description: "Sống cùng Y học cổ truyền",
      monthly: {
        price: 199000,
        period: "tháng",
      },
      quarterly: {
        price: 499000,
        period: "3 tháng",
        saving: "Tiết kiệm 16%",
      },
      features: [
        "1 lần khám định kỳ mỗi tháng",
        "2 lần tư vấn chuyên sâu miễn phí",
        "Ưu đãi 10-15% khi mua thuốc",
        "Theo dõi sức khỏe bằng hồ sơ số hóa cá nhân",
        "AI tư vấn triệu chứng cá nhân hóa",
        "Nhắn tin không giới hạn với thầy lang sau mua thuốc",
      ],
    },
    practitioner: {
      name: "Gói Cộng Tác Sức Khỏe",
      description: "Dành cho thầy lang và phòng khám",
      monthly: {
        price: 299000,
        period: "tháng",
      },
      quarterly: {
        price: 799000,
        period: "3 tháng",
        saving: "Tiết kiệm 11%",
      },
      features: [
        'Huy hiệu "Được người dùng gói sức khỏe xanh tin dùng"',
        "Ưu tiên hiển thị trên hệ thống",
        "Nhận tư vấn phí cao hơn với chia sẻ doanh thu minh bạch",
        "Quản lý hệ thống, ưu tiên sắp lịch thông minh",
        "Xem và lưu hồ sơ sức khỏe người dùng",
        "Hệ thống AI hỗ trợ phân loại khách hàng",
        "Được giới thiệu trong các chiến dịch truyền thông",
      ],
    },
  }

  const currentPlan = type === "user" ? subscriptionData.user : subscriptionData.practitioner
  const price = billingCycle === "monthly" ? currentPlan.monthly.price : currentPlan.quarterly.price
  const period = billingCycle === "monthly" ? currentPlan.monthly.period : currentPlan.quarterly.period

  const handleSubmit = async () => {
    if (!name || !phone || !email) {
      setError("Vui lòng điền đầy đủ thông tin")
      return
    }

    if (paymentMethod === "card" && (!cardNumber || !cardExpiry || !cardCvc)) {
      setError("Vui lòng điền đầy đủ thông tin thẻ")
      return
    }

    setError("")
    setIsProcessing(true)

    // Giả lập xử lý thanh toán
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)

      // Chuyển hướng sau khi thanh toán thành công
      setTimeout(() => {
        router.push("/thanh-toan/thanh-cong?type=subscription")
      }, 2000)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>Thanh toán thành công!</AlertTitle>
            <AlertDescription>
              Gói {currentPlan.name} của bạn đã được kích hoạt. Bạn có thể bắt đầu sử dụng các tính năng ngay bây giờ.
            </AlertDescription>
          </Alert>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">Đang chuyển hướng...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Thanh toán {currentPlan.name}</h1>
          <p className="text-gray-500 mt-2">{currentPlan.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin thanh toán</CardTitle>
                <CardDescription>Điền thông tin của bạn để hoàn tất đăng ký gói dịch vụ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Lỗi</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Kỳ hạn thanh toán</h3>
                  <RadioGroup
                    defaultValue={billingCycle}
                    onValueChange={setBillingCycle}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div
                      className={`border rounded-lg p-4 ${billingCycle === "monthly" ? "border-green-500 bg-green-50" : ""}`}
                    >
                      <RadioGroupItem value="monthly" id="monthly" className="sr-only" />
                      <Label htmlFor="monthly" className="flex flex-col cursor-pointer">
                        <span className="font-medium">Hàng tháng</span>
                        <span className="text-2xl font-bold mt-1">
                          {currentPlan.monthly.price.toLocaleString()}đ
                          <span className="text-sm font-normal text-gray-500">/{currentPlan.monthly.period}</span>
                        </span>
                        <span className="text-sm text-gray-500 mt-1">Thanh toán hàng tháng</span>
                      </Label>
                    </div>
                    <div
                      className={`border rounded-lg p-4 ${billingCycle === "quarterly" ? "border-green-500 bg-green-50" : ""}`}
                    >
                      <RadioGroupItem value="quarterly" id="quarterly" className="sr-only" />
                      <Label htmlFor="quarterly" className="flex flex-col cursor-pointer">
                        <span className="font-medium">3 tháng</span>
                        <span className="text-2xl font-bold mt-1">
                          {currentPlan.quarterly.price.toLocaleString()}đ
                          <span className="text-sm font-normal text-gray-500">/{currentPlan.quarterly.period}</span>
                        </span>
                        <span className="text-sm text-green-600 font-medium mt-1">{currentPlan.quarterly.saving}</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Thông tin liên hệ</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên</Label>
                      <Input
                        id="name"
                        placeholder="Nhập họ và tên của bạn"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        id="phone"
                        placeholder="Nhập số điện thoại của bạn"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Nhập email của bạn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Phương thức thanh toán</h3>
                  <Tabs defaultValue="momo" onValueChange={setPaymentMethod}>
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="momo">MoMo</TabsTrigger>
                      <TabsTrigger value="banking">Chuyển khoản</TabsTrigger>
                      <TabsTrigger value="card">Thẻ tín dụng</TabsTrigger>
                    </TabsList>
                    <TabsContent value="momo" className="p-4 border rounded-md mt-2">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-pink-100 rounded-md flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-pink-600" />
                        </div>
                        <div>
                          <p className="font-medium">Thanh toán qua MoMo</p>
                          <p className="text-sm text-muted-foreground">Quét mã QR hoặc chuyển tiền qua ví MoMo</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="banking" className="p-4 border rounded-md mt-2">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Chuyển khoản ngân hàng</p>
                          <p className="text-sm text-muted-foreground">Chuyển khoản qua tài khoản ngân hàng</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="card" className="p-4 border rounded-md mt-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Số thẻ</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-expiry">Ngày hết hạn</Label>
                            <Input
                              id="card-expiry"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card-cvc">CVC</Label>
                            <Input
                              id="card-cvc"
                              placeholder="123"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex">
                    <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-700">Thông tin thanh toán định kỳ:</p>
                      <ul className="text-sm text-blue-600 mt-1 space-y-1">
                        <li>Gói dịch vụ sẽ tự động gia hạn vào cuối kỳ thanh toán.</li>
                        <li>Bạn có thể hủy đăng ký bất kỳ lúc nào trong trang cài đặt tài khoản.</li>
                        <li>Nếu hủy, bạn vẫn có thể sử dụng dịch vụ đến hết kỳ thanh toán hiện tại.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-green-700 hover:bg-green-800"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Đang xử lý..." : `Thanh toán ${price.toLocaleString()}đ`}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Thông tin gói dịch vụ</CardTitle>
                <CardDescription>{currentPlan.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{currentPlan.name}</p>
                      <p className="text-sm text-gray-500">{billingCycle === "monthly" ? "Hàng tháng" : "3 tháng"}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{price.toLocaleString()}đ</p>
                      <p className="text-xs text-gray-500">/{period}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Quyền lợi bao gồm:</h3>
                  <ul className="space-y-2">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Tổng thanh toán</span>
                    <span className="font-bold text-green-700 text-xl">{price.toLocaleString()}đ</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">Đã bao gồm thuế VAT</p>
                </div>

                <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                  <Shield className="h-4 w-4 mr-1" />
                  <span>Thanh toán an toàn & bảo mật</span>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 text-center">
              <Link
                href={type === "user" ? "/dang-ky/khach-hang" : "/dang-ky/thay-lang-phong-kham"}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Quay lại trang đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

