import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { User, Lock, CreditCard, Bell, Save, Edit, Mail, Phone, MapPin, Calendar, Star } from "lucide-react"

export default function TaiKhoanPage() {
  // Sample user data
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "(+84) 123 456 789",
    address: "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    avatar: "/placeholder.svg?height=100&width=100&text=A",
    role: "Thầy Lang",
    memberSince: "01/01/2022",
    rating: 4.9,
    reviewCount: 120,
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản Lý Tài Khoản</h1>
          <p className="text-gray-500">Quản lý thông tin cá nhân và cài đặt tài khoản</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full bg-white">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.role}</p>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400 mr-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(user.rating) ? "fill-current" : "text-gray-300"}`}
                      />
                    ))}
                </div>
                <span className="text-sm font-medium">{user.rating}</span>
                <span className="text-sm text-gray-500 ml-1">({user.reviewCount} đánh giá)</span>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <div className="flex items-center justify-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Thành viên từ {user.memberSince}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <span>{user.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-0">
            <Tabs defaultValue="profile">
              <TabsList className="w-full rounded-none border-b">
                <TabsTrigger value="profile" className="flex-1">
                  <User className="h-4 w-4 mr-2" />
                  Hồ Sơ
                </TabsTrigger>
                <TabsTrigger value="security" className="flex-1">
                  <Lock className="h-4 w-4 mr-2" />
                  Bảo Mật
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex-1">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Thanh Toán
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex-1">
                  <Bell className="h-4 w-4 mr-2" />
                  Thông Báo
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="p-6">
                <h3 className="text-lg font-semibold mb-4">Thông Tin Cá Nhân</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Họ và tên
                      </label>
                      <Input id="full-name" defaultValue={user.name} />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Số điện thoại
                      </label>
                      <Input id="phone" defaultValue={user.phone} />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                        Vai trò
                      </label>
                      <Select defaultValue="practitioner">
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Chọn vai trò" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="practitioner">Thầy Lang</SelectItem>
                          <SelectItem value="clinic">Phòng Khám</SelectItem>
                          <SelectItem value="patient">Bệnh Nhân</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Địa chỉ
                    </label>
                    <Input id="address" defaultValue={user.address} />
                  </div>
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Giới thiệu
                    </label>
                    <Textarea
                      id="bio"
                      placeholder="Giới thiệu về bản thân hoặc phòng khám của bạn"
                      rows={4}
                      defaultValue="Thầy Lang với hơn 15 năm kinh nghiệm trong lĩnh vực y học cổ truyền, chuyên điều trị các bệnh về xương khớp, thần kinh và tiêu hóa."
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button className="bg-green-700 hover:bg-green-800">
                      <Save className="mr-2 h-4 w-4" />
                      Lưu Thay Đổi
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="security" className="p-6">
                <h3 className="text-lg font-semibold mb-4">Bảo Mật Tài Khoản</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-medium mb-3">Đổi Mật Khẩu</h4>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                          Mật khẩu hiện tại
                        </label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                          Mật khẩu mới
                        </label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                          Xác nhận mật khẩu mới
                        </label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <div className="flex justify-end">
                        <Button className="bg-green-700 hover:bg-green-800">
                          <Save className="mr-2 h-4 w-4" />
                          Cập Nhật Mật Khẩu
                        </Button>
                      </div>
                    </form>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-base font-medium mb-3">Xác Thực Hai Yếu Tố</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Bảo vệ tài khoản của bạn với xác thực hai yếu tố</p>
                        <p className="text-xs text-gray-500">
                          Khi bật tính năng này, bạn sẽ được yêu cầu nhập mã xác thực từ ứng dụng xác thực hoặc tin nhắn
                          SMS.
                        </p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-base font-medium mb-3">Phiên Đăng Nhập</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Chrome trên Windows</p>
                          <p className="text-xs text-gray-500">TP. Hồ Chí Minh, Việt Nam • Hiện tại</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Hiện tại</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Safari trên iPhone</p>
                          <p className="text-xs text-gray-500">TP. Hồ Chí Minh, Việt Nam • 2 ngày trước</p>
                        </div>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          Đăng Xuất
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payment" className="p-6">
                <h3 className="text-lg font-semibold mb-4">Phương Thức Thanh Toán</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-medium mb-3">Thẻ Đã Lưu</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center mr-3">
                            <span className="text-xs font-bold text-blue-700">VISA</span>
                          </div>
                          <div>
                            <p className="font-medium">Visa ••••8765</p>
                            <p className="text-xs text-gray-500">Hết hạn: 12/2025</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge>Mặc định</Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-6 bg-red-100 rounded flex items-center justify-center mr-3">
                            <span className="text-xs font-bold text-red-700">MC</span>
                          </div>
                          <div>
                            <p className="font-medium">Mastercard ••••4321</p>
                            <p className="text-xs text-gray-500">Hết hạn: 08/2024</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Đặt Mặc Định
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Thêm Thẻ Mới
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-base font-medium mb-3">Lịch Sử Thanh Toán</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Gói Dịch Vụ Premium</p>
                          <p className="text-xs text-gray-500">15/04/2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">500.000đ</p>
                          <Badge className="bg-green-100 text-green-700">Thành công</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Gói Dịch Vụ Premium</p>
                          <p className="text-xs text-gray-500">15/03/2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">500.000đ</p>
                          <Badge className="bg-green-100 text-green-700">Thành công</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="p-6">
                <h3 className="text-lg font-semibold mb-4">Cài Đặt Thông Báo</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-medium mb-3">Thông Báo Email</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-appointments" className="font-medium">
                            Lịch hẹn
                          </Label>
                          <p className="text-xs text-gray-500">Nhận thông báo khi có lịch hẹn mới hoặc thay đổi</p>
                        </div>
                        <Switch id="email-appointments" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-messages" className="font-medium">
                            Tin nhắn
                          </Label>
                          <p className="text-xs text-gray-500">Nhận thông báo khi có tin nhắn mới</p>
                        </div>
                        <Switch id="email-messages" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-marketing" className="font-medium">
                            Tiếp thị
                          </Label>
                          <p className="text-xs text-gray-500">Nhận thông tin về khuyến mãi, sự kiện và cập nhật</p>
                        </div>
                        <Switch id="email-marketing" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-base font-medium mb-3">Thông Báo Ứng Dụng</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-appointments" className="font-medium">
                            Lịch hẹn
                          </Label>
                          <p className="text-xs text-gray-500">Nhận thông báo khi có lịch hẹn mới hoặc thay đổi</p>
                        </div>
                        <Switch id="push-appointments" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-messages" className="font-medium">
                            Tin nhắn
                          </Label>
                          <p className="text-xs text-gray-500">Nhận thông báo khi có tin nhắn mới</p>
                        </div>
                        <Switch id="push-messages" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-reminders" className="font-medium">
                            Nhắc nhở
                          </Label>
                          <p className="text-xs text-gray-500">Nhận nhắc nhở trước lịch hẹn</p>
                        </div>
                        <Switch id="push-reminders" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-base font-medium mb-3">Thông Báo SMS</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms-appointments" className="font-medium">
                            Lịch hẹn
                          </Label>
                          <p className="text-xs text-gray-500">Nhận thông báo khi có lịch hẹn mới hoặc thay đổi</p>
                        </div>
                        <Switch id="sms-appointments" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms-reminders" className="font-medium">
                            Nhắc nhở
                          </Label>
                          <p className="text-xs text-gray-500">Nhận nhắc nhở trước lịch hẹn</p>
                        </div>
                        <Switch id="sms-reminders" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

