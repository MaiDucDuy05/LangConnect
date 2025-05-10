import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, ShoppingBag, Users, TrendingUp, DollarSign, Star } from "lucide-react"

export default function DashboardPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tổng Quan</h1>
          <p className="text-gray-500">Xem tổng quan về hoạt động của bạn</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Cập Nhật Lịch Làm Việc
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Lịch Hẹn Hôm Nay</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12.5% so với tuần trước</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Đơn Hàng Mới</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+18.2% so với tuần trước</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Khách Hàng Mới</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+8.4% so với tuần trước</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Doanh Thu</p>
                <p className="text-2xl font-bold">4.5M</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+14.2% so với tuần trước</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="appointments">
          <TabsList className="mb-4">
            <TabsTrigger value="appointments">Lịch Hẹn Sắp Tới</TabsTrigger>
            <TabsTrigger value="orders">Đơn Hàng Gần Đây</TabsTrigger>
            <TabsTrigger value="reviews">Đánh Giá Mới</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Lịch Hẹn Sắp Tới</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-4">
                          <img
                            src={`/placeholder.svg?height=40&width=40&text=${item}`}
                            alt={`Khách hàng ${item}`}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <p className="font-medium">Nguyễn Văn {["A", "B", "C", "D"][item - 1]}</p>
                          <p className="text-sm text-gray-500">Khám tổng quát</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">09:30 - 10:30</p>
                        <p className="text-sm text-gray-500">Hôm nay</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Chi Tiết
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Đơn Hàng Gần Đây</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded bg-gray-200 mr-4 flex items-center justify-center">
                          <ShoppingBag className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">Đơn hàng #{1000 + item}</p>
                          <p className="text-sm text-gray-500">3 sản phẩm</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">350.000đ</p>
                        <p className="text-sm text-gray-500">Hôm qua</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Chi Tiết
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Đánh Giá Mới</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 mr-4">
                            <img
                              src={`/placeholder.svg?height=40&width=40&text=${item}`}
                              alt={`Khách hàng ${item}`}
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                          <div>
                            <p className="font-medium">Trần Thị {["Hoa", "Mai", "Lan", "Hương"][item - 1]}</p>
                            <p className="text-sm text-gray-500">2 ngày trước</p>
                          </div>
                        </div>
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">
                        "Thầy lang rất tận tâm và chuyên nghiệp. Tôi cảm thấy khỏe hơn rất nhiều sau khi điều trị. Sẽ
                        quay lại trong tương lai."
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

