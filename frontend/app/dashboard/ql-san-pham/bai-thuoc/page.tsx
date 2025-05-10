import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"

export default function BaiThuocPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bài Thuốc</h1>
          <p className="text-gray-500">Quản lý danh sách bài thuốc y học cổ truyền</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Thêm Bài Thuốc
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2">
          <CardTitle>Danh Sách Bài Thuốc</CardTitle>
          <div className="relative mt-2 sm:mt-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Tìm kiếm bài thuốc..." className="pl-8 w-full sm:w-[250px]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded bg-green-100 flex items-center justify-center shrink-0">
                    <img
                      src={`/placeholder.svg?height=64&width=64&text=BT${item}`}
                      alt={`Bài thuốc ${item}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Bài thuốc cổ truyền #{item}</h3>
                    <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 mt-1">
                      <span>
                        Công dụng: Điều trị{" "}
                        {item === 1
                          ? "đau đầu"
                          : item === 2
                            ? "mất ngủ"
                            : item === 3
                              ? "đau lưng"
                              : item === 4
                                ? "tiêu hóa"
                                : "huyết áp"}
                      </span>
                      <span>Thành phần: {item * 3} vị thuốc</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Xem
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Sửa
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
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

