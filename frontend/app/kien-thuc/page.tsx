import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, BookOpen, Calendar, Tag, Clock, ArrowRight, ThumbsUp, Eye } from "lucide-react"
import Link from "next/link"
import { getAllArticles } from "@/database/article"

export default function KnowledgePage() {

  const articles = getAllArticles();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Thư Viện Y Học Cổ Truyền</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Khám phá kho tàng kiến thức y học cổ truyền với các bài viết chuyên sâu từ các thầy lang và chuyên gia hàng
            đầu
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Tìm kiếm bài viết..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Tag className="mr-2 h-4 w-4" />
                Danh Mục
              </Button>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Mới nhất
              </Button>
              <Button variant="outline">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Phổ biến
              </Button>
            </div>
          </div>
        </div>

        {/* Categories Tabs */}
        <Tabs defaultValue="all" className="mb-10">
          <TabsList className="w-full flex flex-wrap h-auto p-1 mb-6">
            {/* <TabsTrigger value="all" className="flex-grow">
              Tất cả
            </TabsTrigger> */}
            {/* <TabsTrigger value="herbs" className="flex-grow">
              Thảo dược
            </TabsTrigger>
            <TabsTrigger value="treatments" className="flex-grow">
              Phương pháp điều trị
            </TabsTrigger>
            <TabsTrigger value="health" className="flex-grow">
              Sức khỏe
            </TabsTrigger>
            <TabsTrigger value="recipes" className="flex-grow">
              Bài thuốc
            </TabsTrigger>
            <TabsTrigger value="research" className="flex-grow">
              Nghiên cứu
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {/* Featured Article */}
            <div className="mb-10">
              <div className="relative rounded-xl overflow-hidden">
                <div className="aspect-[21/9] bg-gray-100 relative">
                  <img
                    src="/images/article/0.jpg"
                    alt="Bài viết nổi bật"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <Badge className="mb-3 bg-green-600">Bài viết nổi bật</Badge>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Tổng quan về các phương pháp chẩn đoán trong y học cổ truyền
                    </h2>
                    <p className="mb-4 max-w-3xl">
                      Khám phá bốn phương pháp chẩn đoán cổ điển: Vọng, Văn, Vấn, Thiết và ứng dụng trong y học hiện đại
                    </p>
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>15/04/2023</span>
                          <span className="mx-2">•</span>
                          <Eye className="mr-1 h-3 w-3" />
                          <span>1.2k lượt xem</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-[16/9] bg-gray-100 relative">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-5">
                    <Badge className="mb-2" variant="outline">
                      {article.category}
                    </Badge>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h3>
                    <CardDescription className="mb-4 line-clamp-2">{article.excerpt}</CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{article.publishDate}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-5 py-4 border-t">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="mr-1 h-3 w-3" />
                        <span>{article.views} lượt xem</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/kien-thuc/${index + 1}`}>
                          Đọc tiếp
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {/* <div className="flex justify-center mt-10">
              <div className="flex items-center space-x-2">
                <Button variant="outline" disabled>
                  Trước
                </Button>
                <Button variant="outline" className="bg-green-50">
                  1
                </Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <span>...</span>
                <Button variant="outline">10</Button>
                <Button variant="outline">Sau</Button>
              </div>
            </div> */}
          </TabsContent>

          {/* Other tabs content would be similar */}
          <TabsContent value="herbs">
            <div className="text-center py-10">
              <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">Danh mục Thảo dược</h3>
              <p className="text-gray-500">Khám phá các bài viết về thảo dược và công dụng chữa bệnh</p>
            </div>
          </TabsContent>

          <TabsContent value="treatments">
            <div className="text-center py-10">
              <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">Danh mục Phương pháp điều trị</h3>
              <p className="text-gray-500">Tìm hiểu các phương pháp điều trị trong y học cổ truyền</p>
            </div>
          </TabsContent>

          <TabsContent value="health">
            <div className="text-center py-10">
              <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">Danh mục Sức khỏe</h3>
              <p className="text-gray-500">Các bài viết về chăm sóc sức khỏe theo y học cổ truyền</p>
            </div>
          </TabsContent>

          <TabsContent value="recipes">
            <div className="text-center py-10">
              <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">Danh mục Bài thuốc</h3>
              <p className="text-gray-500">Khám phá các bài thuốc đông y cổ truyền và hiện đại</p>
            </div>
          </TabsContent>

          <TabsContent value="research">
            <div className="text-center py-10">
              <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">Danh mục Nghiên cứu</h3>
              <p className="text-gray-500">Các nghiên cứu khoa học về y học cổ truyền</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Newsletter Subscription */}
        <div className="bg-green-50 rounded-xl p-8 mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold mb-2">Đăng ký nhận bài viết mới</h3>
              <p className="text-gray-600">
                Nhận thông báo khi có bài viết mới về y học cổ truyền và các bài thuốc đông y
              </p>
            </div>
            <div className="md:w-1/3 w-full">
              <div className="flex gap-2">
                <Input placeholder="Email của bạn" className="flex-1" />
                <Button>Đăng ký</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

