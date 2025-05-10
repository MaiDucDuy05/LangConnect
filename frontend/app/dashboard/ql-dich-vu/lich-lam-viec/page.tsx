import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export default function LichLamViecPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lịch Làm Việc</h1>
          <p className="text-gray-500">Quản lý lịch làm việc của bạn</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Cập Nhật Lịch Làm Việc
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lịch Làm Việc Trong Tuần</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {[
              { day: "Thứ Hai", slots: ["08:00 - 12:00", "14:00 - 18:00"] },
              { day: "Thứ Ba", slots: ["08:00 - 12:00", "14:00 - 18:00"] },
              { day: "Thứ Tư", slots: ["08:00 - 12:00", "14:00 - 18:00"] },
              { day: "Thứ Năm", slots: ["08:00 - 12:00", "14:00 - 18:00"] },
              { day: "Thứ Sáu", slots: ["08:00 - 12:00", "14:00 - 18:00"] },
              { day: "Thứ Bảy", slots: ["08:00 - 12:00"] },
              { day: "Chủ Nhật", slots: [] },
            ].map((daySchedule, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-medium text-center mb-2">{daySchedule.day}</h3>
                {daySchedule.slots.length > 0 ? (
                  <div className="space-y-2">
                    {daySchedule.slots.map((slot, slotIndex) => (
                      <div key={slotIndex} className="bg-green-50 text-green-700 p-2 rounded text-center text-sm">
                        {slot}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 text-gray-500 p-2 rounded text-center text-sm h-20 flex items-center justify-center">
                    Nghỉ
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Lịch Nghỉ Đặc Biệt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "01/05/2023", reason: "Nghỉ lễ" },
                { date: "02/09/2023", reason: "Nghỉ lễ" },
                { date: "15/10/2023 - 20/10/2023", reason: "Nghỉ phép" },
              ].map((holiday, index) => (
                <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{holiday.date}</p>
                    <p className="text-sm text-gray-500">{holiday.reason}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Xóa
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

