import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { User, Building, ArrowRight, Check, X, Clock, Calendar, Pill, Zap, Award, Users, BarChart } from "lucide-react"

export default function RegisterSelectionPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Đăng Ký Tài Khoản</h1>
          <p className="text-gray-500">Chọn loại tài khoản và gói dịch vụ phù hợp với nhu cầu của bạn</p>
        </div>

        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="user" className="text-base py-3">
              <User className="mr-2 h-5 w-5" />
              Người Dùng
            </TabsTrigger>
            <TabsTrigger value="practitioner" className="text-base py-3">
              <Building className="mr-2 h-5 w-5" />
              Thầy Lang / Phòng Khám
            </TabsTrigger>
          </TabsList>

          {/* Người dùng */}
          <TabsContent value="user">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Gói miễn phí */}
              <Card className="border-2">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">Gói Miễn Phí</CardTitle>
                      <CardDescription className="mt-1">Trải nghiệm cơ bản</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-gray-100 text-gray-700 font-medium">
                      Miễn Phí
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">AI tư vấn triệu chứng sơ bộ</p>
                        <p className="text-sm text-gray-500">Nhận tư vấn ban đầu từ AI về các triệu chứng</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Nhắn tin hỏi thầy lang sau mua thuốc</p>
                        <p className="text-sm text-gray-500">Giới hạn số tin nhắn sau khi mua thuốc</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Clock className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">Đặt lịch khám</p>
                        <p className="text-sm text-gray-500">Trả phí theo lần đặt lịch</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Clock className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">Tư vấn chuyên sâu</p>
                        <p className="text-sm text-gray-500">Trả phí theo từng lần tư vấn</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <X className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Ưu đãi mua thuốc</p>
                        <p className="text-sm text-gray-500">Không có ưu đãi đặc biệt</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <X className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Lưu hồ sơ sức khỏe & AI gợi ý</p>
                        <p className="text-sm text-gray-500">Không có tính năng này</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/dang-ky/khach-hang">
                      Đăng ký ngay
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Gói Sức Khỏe Xanh */}
              <Card className="border-2 border-green-600 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Được đề xuất
                </div>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">Gói Sức Khỏe Xanh</CardTitle>
                      <CardDescription className="mt-1">Sống cùng Y học cổ truyền</CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-600 mb-1">Tiết kiệm 16%</Badge>
                      <div className="flex flex-col">
                        <span className="text-lg font-bold">
                          199.000đ<span className="text-sm font-normal">/tháng</span>
                        </span>
                        <span className="text-sm text-gray-500">hoặc 499.000đ/3 tháng</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">AI tư vấn triệu chứng sơ bộ nâng cao</p>
                        <p className="text-sm text-gray-500">Tư vấn AI được cá nhân hóa theo hồ sơ sức khỏe</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Nhắn tin hỏi thầy lang không giới hạn</p>
                        <p className="text-sm text-gray-500">Không giới hạn số tin nhắn sau khi mua thuốc</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">1 lần khám định kỳ miễn phí mỗi tháng</p>
                        <p className="text-sm text-gray-500">Chọn thầy lang/phòng khám trong danh sách cộng tác</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">2 buổi tư vấn chuyên sâu miễn phí mỗi tháng</p>
                        <p className="text-sm text-gray-500">Dùng cho các vấn đề cá nhân, điều chỉnh bài thuốc</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Ưu đãi mua thuốc 10-15%</p>
                        <p className="text-sm text-gray-500">Giảm giá khi đặt qua nền tảng và giao hàng ưu tiên</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Hồ sơ sức khỏe số hóa cá nhân</p>
                        <p className="text-sm text-gray-500">
                          AI hỗ trợ tổng hợp bệnh sử, thuốc đã dùng, nhắc lịch tái khám
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <Link href="/dang-ky/khach-hang?plan=premium">
                      Đăng ký ngay
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Tính linh hoạt theo hình thức trả phí</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center mb-3">
                    <Clock className="h-5 w-5 text-blue-500 mr-2" />
                    <h4 className="font-medium">Trả phí theo từng lượt</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Đặt lịch / hỏi nhanh 1 lần → trả 100k–300k/ 15 phút (khám online)
                  </p>
                  <p className="text-sm text-green-600 mt-2">✔️ Phù hợp với người dùng không thường xuyên</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center mb-3">
                    <Calendar className="h-5 w-5 text-green-500 mr-2" />
                    <h4 className="font-medium">Gói hội viên</h4>
                  </div>
                  <p className="text-sm text-gray-600">Trả theo tháng (ví dụ 199k/tháng) → nhận nhiều tiện ích</p>
                  <p className="text-sm text-green-600 mt-2">
                    ✔️ Phù hợp với người quan tâm sâu sức khỏe / bệnh mãn tính
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center mb-3">
                    <Pill className="h-5 w-5 text-purple-500 mr-2" />
                    <h4 className="font-medium">Tích hợp khi mua thuốc</h4>
                  </div>
                  <p className="text-sm text-gray-600">Khi người dùng mua thuốc → được tư vấn miễn phí kèm theo</p>
                  <p className="text-sm text-green-600 mt-2">✔️ Tăng giá trị gói thuốc – tăng chuyển đổi</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Thầy lang / Phòng khám */}
          <TabsContent value="practitioner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Gói miễn phí */}
              <Card className="border-2">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">Gói Miễn Phí</CardTitle>
                      <CardDescription className="mt-1">Dành cho thầy lang và phòng khám</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-gray-100 text-gray-700 font-medium">
                      Miễn Phí
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Đánh giá & uy tín</p>
                        <p className="text-sm text-gray-500">Đầy đủ thông tin cơ bản trên hồ sơ</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <X className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Ưu tiên giới thiệu khách hàng</p>
                        <p className="text-sm text-gray-500">Không được ưu tiên hiển thị</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Tư vấn người dùng</p>
                        <p className="text-sm text-gray-500">
                          Nhận tin nhắn từ người mua thuốc, hoặc tư vấn theo lượt trả phí
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Quản lý đặt lịch</p>
                        <p className="text-sm text-gray-500">Xem các lịch được đặt theo lượt</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <X className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Hồ sơ sức khỏe & theo dõi định kỳ</p>
                        <p className="text-sm text-gray-500">Không có tính năng này</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <X className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Chat AI hỗ trợ tư vấn sơ bộ</p>
                        <p className="text-sm text-gray-500">Không có tính năng này</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Hội chẩn, đào tạo nội bộ</p>
                        <p className="text-sm text-gray-500">Tham gia cộng đồng thầy thuốc</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/dang-ky/thay-lang-phong-kham">
                      Đăng ký ngay
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Gói Cộng Tác Sức Khỏe */}
              <Card className="border-2 border-green-600 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Được đề xuất
                </div>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">Gói Cộng Tác Sức Khỏe</CardTitle>
                      <CardDescription className="mt-1">Dành cho thầy lang và phòng khám</CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-600 mb-1">Tiết kiệm 11%</Badge>
                      <div className="flex flex-col">
                        <span className="text-lg font-bold">
                          299.000đ<span className="text-sm font-normal">/tháng</span>
                        </span>
                        <span className="text-sm text-gray-500">hoặc 799.000đ/3 tháng</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Đánh giá & uy tín nâng cao</p>
                        <p className="text-sm text-gray-500">
                          Có huy hiệu "Được người dùng gói sức khỏe xanh tin dùng"
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Ưu tiên giới thiệu khách hàng</p>
                        <p className="text-sm text-gray-500">
                          Ưu tiên hiển thị và giới thiệu tới người dùng gói Sức Khỏe Xanh
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Tư vấn người dùng và chia sẻ doanh thu</p>
                        <p className="text-sm text-gray-500">Nhận tư vấn phí cao hơn với chia sẻ doanh thu minh bạch</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Quản lý đặt lịch nâng cao</p>
                        <p className="text-sm text-gray-500">Quản lý hệ thống, ưu tiên sắp lịch thông minh</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Hồ sơ sức khỏe & theo dõi định kỳ</p>
                        <p className="text-sm text-gray-500">
                          Xem và lưu hồ sơ sức khỏe người dùng để cá nhân hóa lời khuyên
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Chat AI hỗ trợ tư vấn sơ bộ</p>
                        <p className="text-sm text-gray-500">AI hỗ trợ phân loại khách hàng, gợi ý nhóm bệnh</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Hội chẩn, đào tạo nội bộ</p>
                        <p className="text-sm text-gray-500">Tham gia cộng đồng thầy thuốc với quyền ưu tiên</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Hỗ trợ marketing & truyền thông</p>
                        <p className="text-sm text-gray-500">
                          Được giới thiệu trong các chiến dịch truyền thông về sức khỏe
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <Link href="/dang-ky/thay-lang-phong-kham?plan=premium">
                      Đăng ký ngay
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Giá trị mang lại cho thầy lang và phòng khám</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center mb-3">
                    <Users className="h-5 w-5 text-green-500 mr-2" />
                    <h4 className="font-medium">Tăng lượng khách hàng</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Tiếp cận khách hàng có nhu cầu thật, sẵn sàng chi trả cho dịch vụ chất lượng
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center mb-3">
                    <Zap className="h-5 w-5 text-blue-500 mr-2" />
                    <h4 className="font-medium">Tiết kiệm thời gian</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Giảm thời gian tư vấn ban đầu nhờ hỗ trợ AI và hồ sơ sức khỏe số hóa
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center mb-3">
                    <Award className="h-5 w-5 text-purple-500 mr-2" />
                    <h4 className="font-medium">Mở rộng uy tín</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Xây dựng hình ảnh chuyên nghiệp qua hệ sinh thái số hóa của y học cổ truyền
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center mb-3">
                    <BarChart className="h-5 w-5 text-orange-500 mr-2" />
                    <h4 className="font-medium">Thu nhập ổn định</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Tạo nguồn thu nhập ổn định từ nhóm khách hàng trung thành sử dụng gói dịch vụ
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-10 text-center">
          <p className="text-gray-500">
            Đã có tài khoản?{" "}
            <Link href="/dang-nhap" className="text-blue-600 hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

