"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { AlertCircle, CheckCircle, CreditCard } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "product"

  const [paymentMethod, setPaymentMethod] = useState("momo")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [note, setNote] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  // Giả lập dữ liệu đơn hàng
  const orderData = {
    appointment: {
      id: "APT123456",
      practitioner: "Thầy Lang Nguyễn Văn A",
      service: "Khám tổng quát",
      date: new Date(),
      time: "09:00",
      price: 300000,
    },
    product: {
      id: "ORD123456",
      items: [
        { id: 1, name: "Trà Thảo Mộc An Thần", quantity: 2, price: 250000 },
        { id: 2, name: "Cao Xoa Bóp Hoạt Lạc Đường", quantity: 1, price: 180000 },
      ],
      shipping: 30000,
      discount: 50000,
    },
  }

  const getOrderTotal = () => {
    if (type === "appointment") {
      return orderData.appointment.price
    } else {
      const subtotal = orderData.product.items.reduce((total, item) => total + item.price * item.quantity, 0)
      return subtotal + orderData.product.shipping - orderData.product.discount
    }
  }

  const handleSubmit = async () => {
    if (!name || !phone || !email || (type === "product" && !address)) {
      setError("Vui lòng điền đầy đủ thông tin")
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
        router.push("/thanh-toan/thanh-cong")
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
            <AlertDescription>Đơn hàng của bạn đã được xác nhận. Chúng tôi sẽ liên hệ với bạn sớm.</AlertDescription>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin thanh toán</CardTitle>
                <CardDescription>
                  Điền thông tin của bạn để hoàn tất {type === "appointment" ? "đặt lịch" : "đơn hàng"}
                </CardDescription>
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

                {type === "product" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Địa chỉ giao hàng</h3>
                    <div className="space-y-2">
                      <Label htmlFor="address">Địa chỉ</Label>
                      <Textarea
                        id="address"
                        placeholder="Nhập địa chỉ giao hàng của bạn"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Phương thức thanh toán</h3>
                  <Tabs defaultValue="momo" onValueChange={setPaymentMethod}>
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="momo">MoMo</TabsTrigger>
                      <TabsTrigger value="banking">Chuyển khoản</TabsTrigger>
                      <TabsTrigger value="cod">Tiền mặt</TabsTrigger>
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
                    <TabsContent value="cod" className="p-4 border rounded-md mt-2">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Thanh toán tiền mặt</p>
                          <p className="text-sm text-muted-foreground">
                            {type === "appointment"
                              ? "Thanh toán trực tiếp tại phòng khám"
                              : "Thanh toán khi nhận hàng (COD)"}
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Ghi chú (không bắt buộc)</Label>
                  <Textarea
                    id="note"
                    placeholder="Nhập ghi chú nếu có"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-green-700 hover:bg-green-800"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Đang xử lý..." : "Hoàn tất thanh toán"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Thông tin {type === "appointment" ? "lịch hẹn" : "đơn hàng"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {type === "appointment" ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{orderData.appointment.practitioner}</p>
                        <p className="text-sm text-muted-foreground">{orderData.appointment.service}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="flex items-center">
                        <span className="text-sm">
                          {format(orderData.appointment.date, "EEEE, dd/MM/yyyy", { locale: vi })}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm">{orderData.appointment.time}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="pt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Tổng tiền</span>
                        <span className="font-bold text-green-700">
                          {orderData.appointment.price.toLocaleString()}đ
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orderData.product.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">SL: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{(item.price * item.quantity).toLocaleString()}đ</p>
                          <p className="text-sm text-muted-foreground">{item.price.toLocaleString()}đ/sp</p>
                        </div>
                      </div>
                    ))}

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tạm tính</span>
                        <span>
                          {orderData.product.items
                            .reduce((total, item) => total + item.price * item.quantity, 0)
                            .toLocaleString()}
                          đ
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Phí vận chuyển</span>
                        <span>{orderData.product.shipping.toLocaleString()}đ</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Giảm giá</span>
                        <span>-{orderData.product.discount.toLocaleString()}đ</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="pt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Tổng tiền</span>
                        <span className="font-bold text-green-700">{getOrderTotal().toLocaleString()}đ</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

