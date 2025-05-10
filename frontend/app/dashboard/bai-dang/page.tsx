import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, Search, Edit, Trash2, Eye } from "lucide-react"

export default function BaiDangPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bài Đăng</h1>
          <p className="text-gray-500">Quản lý các bài viết, kiến thức y học</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tạo Bài Viết Mới
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">Tất Cả</TabsTrigger>
            <TabsTrigger value="published">Đã Đăng</TabsTrigger>
            <TabsTrigger value="draft">Bản Nháp</TabsTrigger>
          </TabsList>
          <div className="relative mt-2 sm:mt-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Tìm kiếm bài viết..." className="pl-8 w-full sm:w-[250px]" />
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Danh Sách Bài Viết</CardTitle>
              <CardDescription>Quản lý tất cả các bài viết của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center shrink-0">
                        <FileText className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Bài viết về Y học cổ truyền phần {item}</h3>
                        <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 mt-1">
                          <span>Đăng: 12/04/2023</span>
                          <span>Lượt xem: {item * 120}</span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Đã đăng
                          </span>
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
        </TabsContent>

        <TabsContent value="published" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Bài Viết Đã Đăng</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Danh sách các bài viết đã được đăng tải.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draft" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Bản Nháp</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Danh sách các bài viết đang ở trạng thái nháp.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

