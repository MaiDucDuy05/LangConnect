import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Eye, ShoppingBag, CheckCircle, Clock, Truck, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DonHangPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Đơn Hàng</h1>
          <p className="text-gray-500">Quản lý đơn hàng từ khách hàng</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2">
          <CardTitle>Danh Sách Đơn Hàng</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Tìm kiếm đơn hàng..." className="pl-8 w-full sm:w-[250px]" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ xác nhận</SelectItem>
                <SelectItem value="processing">Đang xử lý</SelectItem>
                <SelectItem value="shipping">Đang giao hàng</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 1001, status: "completed", items: 3, total: "350.000đ", date: "Hôm qua", customer: "Nguyễn Văn A" },
              { id: 1002, status: "shipping", items: 2, total: "480.000đ", date: "Hôm nay", customer: "Trần Thị B" },
              { id: 1003, status: "processing", items: 1, total: "120.000đ", date: "Hôm nay", customer: "Lê Văn C" },
              { id: 1004, status: "pending", items: 4, total: "650.000đ", date: "Hôm nay", customer: "Phạm Thị D" },
              {
                id: 1005,
                status: "cancelled",
                items: 2,
                total: "280.000đ",
                date: "2 ngày trước",
                customer: "Hoàng Văn E",
              },
            ].map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center shrink-0">
                    <ShoppingBag className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Đơn hàng #{order.id}</h3>
                    <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 mt-1">
                      <span>{order.customer}</span>
                      <span>{order.items} sản phẩm</span>
                      <span>{order.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center">
                    {order.status === "completed" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Hoàn thành
                      </span>
                    )}
                    {order.status === "processing" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Đang xử lý
                      </span>
                    )}
                    {order.status === "shipping" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <Truck className="h-3 w-3 mr-1" />
                        Đang giao
                      </span>
                    )}
                    {order.status === "pending" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Chờ xác nhận
                      </span>
                    )}
                    {order.status === "cancelled" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircle className="h-3 w-3 mr-1" />
                        Đã hủy
                      </span>
                    )}
                  </div>
                  <div className="text-right min-w-[100px]">
                    <p className="font-medium">{order.total}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Chi Tiết
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

