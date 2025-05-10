"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Lock,
  Save,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Heart,
  Clock,
  AlertCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/AuthContext"
import { getCustomerApi } from '@/lib/api';


const productList = [
  { id: "1", name: "Sản phẩm 1", price: "100000", image: "" },
  { id: "2", name: "Sản phẩm 2", price: "200000", image: "" },
  { id: "3", name: "Sản phẩm 3", price: "300000", image: "" },
  { id: "4", name: "Sản phẩm 4", price: "300000", image: "" },
];


export default function TaiKhoanPage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const { user: authUser, logout }: { user: { id: string; role: string } | null; logout: () => void } = useAuth()
  const router = useRouter();

  if (authUser) {
    if(authUser.user?.role == "BUSINESS") {
        router.push("/dashboard")
    }
  }

  // Thêm state cho danh sách yêu thích từ localStorage
  const [wishlist, setWishlist] = useState<{ id: string; name: string; price: string; image?: string }[]>([])

  // Thêm useEffect để lấy danh sách yêu thích từ localStorage khi component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) {
          const wishlistIds = JSON.parse(savedWishlist);
          const fullWishlist = wishlistIds.map((id: string) => 
            productList.find((product) => product.id == id)
          ).filter(Boolean); 
          setWishlist(fullWishlist);
        }
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error);
      }
    }
  }, []);

  // Sample user data
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    role: "Khách hàng",
    memberSince: "",
    bio: "",
  })

  useEffect(() => {
    const fetchUserData = async () => {
          try {
            if (authUser?.user) {
              const customerApi = getCustomerApi(authUser?.token);
              const response = await customerApi.getCustomer(authUser?.user.userId);
              setUser(prev => ({
                ...prev,
                name: response.name,
                email: response.email,
                phone: response.phoneNumber || "",
                address: response.address || "",
                avatar: response?.profilePic || "/placeholder.svg?height=100&width=100&text=A",
                role: "Khách hàng",
                memberSince: response.createdAt || "",
                bio: response?.decription || "Tôi quan tâm đến các sản phẩm y học cổ truyền và các phương pháp chữa bệnh tự nhiên.",
              }));
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
  
    fetchUserData();
  }, [authUser]);

  // Sample order data
  const orders = [
    {
      id: "ORD-12345",
      date: "15/04/2023",
      total: "850.000đ",
      status: "Đã giao hàng",
      items: 3,
    },
    {
      id: "ORD-12344",
      date: "02/03/2023",
      total: "450.000đ",
      status: "Đã giao hàng",
      items: 2,
    },
    {
      id: "ORD-12343",
      date: "15/01/2023",
      total: "1.250.000đ",
      status: "Đã giao hàng",
      items: 5,
    },
  ]

  // Sample appointments data
  const appointments = [
    {
      id: "APT-5678",
      practitioner: "Thầy Lang Nguyễn Văn B",
      date: "25/05/2023",
      time: "10:00 - 11:00",
      status: "Sắp tới",
      type: "Khám trực tiếp",
    },
    {
      id: "APT-5677",
      practitioner: "Phòng Khám Đông Y Minh Tâm",
      date: "10/04/2023",
      time: "15:30 - 16:30",
      status: "Đã hoàn thành",
      type: "Tư vấn online",
    },
  ]

  const handleSaveProfile = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      // Gọi API để cập nhật thông tin người dùng
      await customerApi.updateCustomer(authUser?.user.userId, {
        name: user.name,
        email: user.email,
        phoneNumber: user.phone,
        address: user.address,
        decription: user.bio,
      });
  
      // Tắt chế độ chỉnh sửa
      setIsEditing(false);
  
      // Hiển thị thông báo thành công
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin tài khoản của bạn đã được cập nhật.",
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      toast({
        title: "Cập nhật thất bại",
        description: "Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const handlePasswordChange = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    toast({
      title: "Cập nhật thành công",
      description: "Mật khẩu của bạn đã được thay đổi",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tài Khoản Của Tôi</h1>
          <p className="text-gray-500">Quản lý thông tin cá nhân và theo dõi đơn hàng</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full bg-white">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.role}</p>
              <div className="mt-4 text-sm text-gray-500">
                <div className="flex items-center justify-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Thành viên từ {user?.memberSince}</span>
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
                <span>{user?.phone}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <span>{user?.address}</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full flex items-center justify-center">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Đơn hàng
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Heart className="h-4 w-4 mr-2" />
                Yêu thích
              </Button>
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
                <TabsTrigger value="orders" className="flex-1">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Đơn Hàng
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Yêu Thích
                </TabsTrigger>
                <TabsTrigger value="appointments" className="flex-1">
                  <Clock className="h-4 w-4 mr-2" />
                  Lịch Hẹn
                </TabsTrigger>
                <TabsTrigger value="security" className="flex-1">
                  <Lock className="h-4 w-4 mr-2" />
                  Bảo Mật
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Thông Tin Cá Nhân</h3>
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? (
                      <>
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Hủy
                      </>
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh Sửa
                      </>
                    )}
                  </Button>
                </div>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Họ và tên
                      </label>
                      <Input
                        id="full-name"
                        defaultValue={user.name}
                        disabled={!isEditing}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                        disabled={!isEditing}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Số điện thoại
                      </label>
                      <Input
                        id="phone"
                        defaultValue={user.phone}
                        disabled={!isEditing}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                        Vai trò
                      </label>
                      <Input id="role" defaultValue={user.role} disabled={true} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Địa chỉ
                    </label>
                    <Input
                      id="address"
                      defaultValue={user.address}
                      disabled={!isEditing}
                      onChange={(e) => setUser({ ...user, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Giới thiệu
                    </label>
                    <Textarea
                      id="bio"
                      placeholder="Giới thiệu về bản thân"
                      rows={4}
                      defaultValue={user.bio}
                      disabled={!isEditing}
                      onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    />
                  </div>
                  {isEditing && (
                    <div className="flex justify-end">
                      <Button className="bg-green-700 hover:bg-green-800" onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Lưu Thay Đổi
                      </Button>
                    </div>
                  )}
                </form>
              </TabsContent>

              <TabsContent value="orders" className="p-6">
                <h3 className="text-lg font-semibold mb-4">Lịch Sử Đơn Hàng</h3>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="bg-gray-50 p-4 border-b">
                          <div className="flex flex-wrap items-center justify-between">
                            <div>
                              <p className="font-medium">Đơn hàng #{order.id}</p>
                              <p className="text-sm text-gray-500">Ngày đặt: {order.date}</p>
                            </div>
                            <Badge
                              className={
                                order.status === "Đã giao hàng"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "Đang giao"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex flex-wrap items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500">{order.items} sản phẩm</p>
                              <p className="font-medium">Tổng tiền: {order.total}</p>
                            </div>
                            <div className="flex space-x-2 mt-2 sm:mt-0">
                              <Button variant="outline" size="sm">
                                Chi tiết
                              </Button>
                              <Button variant="outline" size="sm">
                                Mua lại
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline">Xem tất cả đơn hàng</Button>
                </div>
              </TabsContent>

              <TabsContent value="wishlist" className="p-6">
                <h3 className="text-lg font-semibold mb-4">Sản Phẩm Yêu Thích</h3>
                <div className="space-y-4">
                  {wishlist.length > 0 ? (
                    wishlist.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                src={item.image || `/placeholder.svg?height=80&width=80&text`}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-md"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{item.name}</p>
                              <p className="text-green-700 font-medium">{item.price}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Thêm vào giỏ
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600"
                                onClick={() => {
                                  const newWishlist = wishlist.filter((w) => w.id !== item.id)
                                  setWishlist(newWishlist)
                                  localStorage.setItem("wishlist", JSON.stringify(newWishlist))
                                  toast({
                                    title: "Đã xóa khỏi danh sách yêu thích",
                                    description: `${item.name} đã được xóa khỏi danh sách yêu thích của bạn.`,
                                  })
                                }}
                              >
                                <Heart className="h-4 w-4 fill-current" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h4 className="text-lg font-medium text-gray-500">Chưa có sản phẩm yêu thích</h4>
                      <p className="text-gray-400 mt-1">Hãy thêm sản phẩm vào danh sách yêu thích của bạn</p>
                    </div>
                  )}
                </div>
                {wishlist.length > 0 && (
                  <div className="mt-4 text-center">
                    <Button variant="outline">Xem tất cả sản phẩm yêu thích</Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="appointments" className="p-6">
                <h3 className="text-lg font-semibold mb-4">Lịch Hẹn Khám Bệnh</h3>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium">{appointment.practitioner}</h4>
                              <Badge className="ml-2">{appointment.type}</Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              {appointment.date} • {appointment.time}
                            </p>
                            <p className="text-sm">Mã lịch hẹn: {appointment.id}</p>
                          </div>
                          <div className="flex items-center mt-3 md:mt-0">
                            <Badge
                              className={
                                appointment.status === "Sắp tới"
                                  ? "bg-blue-100 text-blue-800 mr-3"
                                  : "bg-green-100 text-green-800 mr-3"
                              }
                            >
                              {appointment.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              Chi tiết
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline">Xem tất cả lịch hẹn</Button>
                </div>
              </TabsContent>

              <TabsContent value="security" className="p-6">
                <h3 className="text-lg font-semibold mb-4">Bảo Mật Tài Khoản</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-medium mb-3">Đổi Mật Khẩu</h4>
                    <form className="space-y-4" onSubmit={handlePasswordChange}>
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
                        <Button type="submit" className="bg-green-700 hover:bg-green-800">
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
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

