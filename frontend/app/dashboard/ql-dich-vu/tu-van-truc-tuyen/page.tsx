import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Video, MessageSquare, Phone, CheckCircle, Clock, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TuVanTrucTuyenPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tư Vấn Trực Tuyến</h1>
          <p className="text-gray-500">Quản lý các buổi tư vấn trực tuyến với khách hàng</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2">
          <CardTitle>Danh Sách Tư Vấn</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Tìm kiếm tư vấn..." className="pl-8 w-full sm:w-[250px]" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Loại tư vấn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="video">Video call</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
                <SelectItem value="phone">Điện thoại</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                type: "video",
                status: "scheduled",
                time: "09:30 - 10:30",
                date: "Hôm nay",
                customer: "Nguyễn Văn A",
                issue: "Đau lưng mãn tính",
              },
              {
                id: 2,
                type: "chat",
                status: "active",
                time: "Đang diễn ra",
                date: "Bây giờ",
                customer: "Trần Thị B",
                issue: "Tư vấn về bài thuốc",
              },
              {
                id: 3,
                type: "phone",
                status: "completed",
                time: "10:00 - 10:15",
                date: "Hôm qua",
                customer: "Lê Văn C",
                issue: "Theo dõi sau điều trị",
              },
              {
                id: 4,
                type: "video",
                status: "scheduled",
                time: "16:00 - 16:30",
                date: "Ngày mai",
                customer: "Phạm Thị D",
                issue: "Tư vấn trước khám",
              },
              {
                id: 5,
                type: "chat",
                status: "cancelled",
                time: "11:00 - 11:30",
                date: "2 ngày trước",
                customer: "Hoàng Văn E",
                issue: "Hỏi về sản phẩm",
              },
            ].map((consultation) => (
              <div
                key={consultation.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <img
                      src={`/placeholder.svg?height=48&width=48&text=${consultation.id}`}
                      alt={`Khách hàng ${consultation.id}`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{consultation.customer}</h3>
                    <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center">
                        {consultation.type === "video" && <Video className="h-3 w-3 mr-1" />}
                        {consultation.type === "chat" && <MessageSquare className="h-3 w-3 mr-1" />}
                        {consultation.type === "phone" && <Phone className="h-3 w-3 mr-1" />}
                        {consultation.type === "video"
                          ? "Video call"
                          : consultation.type === "chat"
                            ? "Chat"
                            : "Điện thoại"}
                      </span>
                      <span>{consultation.time}</span>
                      <span>{consultation.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{consultation.issue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center">
                    {consultation.status === "completed" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Hoàn thành
                      </span>
                    )}
                    {consultation.status === "scheduled" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Đã lên lịch
                      </span>
                    )}
                    {consultation.status === "active" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Video className="h-3 w-3 mr-1" />
                        Đang diễn ra
                      </span>
                    )}
                    {consultation.status === "cancelled" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircle className="h-3 w-3 mr-1" />
                        Đã hủy
                      </span>
                    )}
                  </div>
                  {consultation.status === "active" ? (
                    <Button size="sm">
                      <Video className="h-4 w-4 mr-1" />
                      Tham Gia
                    </Button>
                  ) : consultation.status === "scheduled" ? (
                    <Button variant="outline" size="sm">
                      Chi Tiết
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      Xem Lịch Sử
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

