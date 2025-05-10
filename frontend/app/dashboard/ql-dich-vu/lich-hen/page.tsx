import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Eye, Calendar, CheckCircle, Clock, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LichHenPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lịch Hẹn</h1>
          <p className="text-gray-500">Quản lý lịch hẹn với khách hàng</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2">
          <CardTitle>Danh Sách Lịch Hẹn</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Tìm kiếm lịch hẹn..." className="pl-8 w-full sm:w-[250px]" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ xác nhận</SelectItem>
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                status: "confirmed",
                service: "Khám tổng quát",
                time: "09:30 - 10:30",
                date: "Hôm nay",
                customer: "Nguyễn Văn A",
              },
              {
                id: 2,
                status: "pending",
                service: "Châm cứu",
                time: "14:00 - 15:00",
                date: "Ngày mai",
                customer: "Trần Thị B",
              },
              {
                id: 3,
                status: "completed",
                service: "Bấm huyệt",
                time: "10:00 - 10:30",
                date: "Hôm qua",
                customer: "Lê Văn C",
              },
              {
                id: 4,
                status: "confirmed",
                service: "Xông hơi thảo dược",
                time: "16:00 - 16:45",
                date: "Ngày mai",
                customer: "Phạm Thị D",
              },
              {
                id: 5,
                status: "cancelled",
                service: "Massage y học cổ truyền",
                time: "11:00 - 12:30",
                date: "2 ngày trước",
                customer: "Hoàng Văn E",
              },
            ].map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <img
                      src={`/placeholder.svg?height=48&width=48&text=${appointment.id}`}
                      alt={`Khách hàng ${appointment.id}`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{appointment.customer}</h3>
                    <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 mt-1">
                      <span>{appointment.service}</span>
                      <span>{appointment.time}</span>
                      <span>{appointment.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center">
                    {appointment.status === "completed" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Hoàn thành
                      </span>
                    )}
                    {appointment.status === "confirmed" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Calendar className="h-3 w-3 mr-1" />
                        Đã xác nhận
                      </span>
                    )}
                    {appointment.status === "pending" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Chờ xác nhận
                      </span>
                    )}
                    {appointment.status === "cancelled" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircle className="h-3 w-3 mr-1" />
                        Đã hủy
                      </span>
                    )}
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

