import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Stethoscope} from "lucide-react"

export default function QuanLyDichVuPage() {
  return (
    <div>
      <div className="mt-6">
        <Tabs defaultValue="appointments">
          <TabsList className="mb-4">
            <TabsTrigger value="appointments">Lịch Hẹn Sắp Tới</TabsTrigger>
            <TabsTrigger value="services">Dịch Vụ Phổ Biến</TabsTrigger>
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

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Dịch Vụ Phổ Biến</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-green-100 mr-4 flex items-center justify-center">
                          <Stethoscope className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Dịch vụ y học cổ truyền #{item}</p>
                          <p className="text-sm text-gray-500">Đã đặt: {item * 15} lần</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item * 150}.000đ</p>
                        <p className="text-sm text-green-600">45 phút</p>
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

