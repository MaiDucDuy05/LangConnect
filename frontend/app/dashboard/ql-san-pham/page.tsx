import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Pill, CreditCard, BarChart3, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function QuanLySanPhamPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản Lý Sản Phẩm</h1>
          <p className="text-gray-500">Quản lý sản phẩm, bài thuốc, đơn hàng và doanh thu</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/ql-san-pham/san-pham">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Sản Phẩm</p>
                  <p className="text-2xl font-bold">48</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/ql-san-pham/bai-thuoc">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Bài Thuốc</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Pill className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/ql-san-pham/don-hang">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Đơn Hàng</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/ql-san-pham/doanh-thu">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Doanh Thu</p>
                  <p className="text-2xl font-bold">4.5M</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-yellow-600" />
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
        </Link>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="recent">
          <TabsList className="mb-4">
            <TabsTrigger value="recent">Đơn Hàng Gần Đây</TabsTrigger>
            <TabsTrigger value="popular">Sản Phẩm Phổ Biến</TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
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

          <TabsContent value="popular">
            <Card>
              <CardHeader>
                <CardTitle>Sản Phẩm Phổ Biến</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded bg-gray-200 mr-4 flex items-center justify-center">
                          <img
                            src={`/placeholder.svg?height=48&width=48&text=SP${item}`}
                            alt={`Sản phẩm ${item}`}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div>
                          <p className="font-medium">Sản phẩm y học cổ truyền #{item}</p>
                          <p className="text-sm text-gray-500">Đã bán: {item * 25}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item * 100}.000đ</p>
                        <p className="text-sm text-green-600">Còn hàng</p>
                      </div>
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

