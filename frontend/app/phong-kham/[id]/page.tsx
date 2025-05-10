import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Phone, Mail, Globe, Star, Calendar, Clock, CheckCircle, MessageSquare, Users } from "lucide-react"
import { ZaloContactDialog } from "@/components/zalo-contact-dialog"
import { ReviewDialog } from "@/components/review-dialog"

// Giả lập dữ liệu phòng khám
const getClinic = (id: string) => {
  return {
    id,
    name: "Phòng Khám Đông Y Tâm An",
    description: `
      <p>Phòng Khám Đông Y Tâm An là một trong những phòng khám đông y uy tín hàng đầu tại TP. Hồ Chí Minh, với đội ngũ bác sĩ giàu kinh nghiệm và cơ sở vật chất hiện đại.</p>
      
      <p>Với hơn 20 năm kinh nghiệm trong lĩnh vực y học cổ truyền, Phòng Khám Đông Y Tâm An đã giúp hàng ngàn bệnh nhân khắp cả nước tìm lại sức khỏe và cải thiện chất lượng cuộc sống.</p>
      
      <p>Phòng Khám Đông Y Tâm An chuyên điều trị các bệnh lý về xương khớp, thần kinh, đau đầu mãn tính, mất ngủ, các vấn đề tiêu hóa và nhiều bệnh lý khác bằng phương pháp châm cứu, bấm huyệt và các bài thuốc đông y gia truyền.</p>
    `,
    specialties: ["Châm cứu", "Bấm huyệt", "Xương khớp", "Thần kinh"],
    location: "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    phone: "(+84) 28 1234 5678",
    email: "info@taman.vn",
    website: "www.taman.vn",
    rating: 4.9,
    reviewCount: 150,
    experience: 20 ,
    image: "/placeholder.svg?height=500&width=800&text=Phòng Khám Tâm An",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Phòng Khám 1",
      "/placeholder.svg?height=300&width=400&text=Phòng Khám 2",
      "/placeholder.svg?height=300&width=400&text=Phòng Khám 3",
      "/placeholder.svg?height=300&width=400&text=Phòng Khám 4",
    ],
    isVerified: true,
    // practitioners: [
    //   {
    //     id: 1,
    //     name: "BS. Trần Văn X",
    //     image: "/placeholder.svg?height=100&width=100&text=BS.X",
    //     role: "Bác sĩ Đông y",
    //     specialty: "Châm cứu, Xương khớp",
    //     experience: 15 ,
    //   },
    //   {
    //     id: 2,
    //     name: "BS. Lê Thị Y",
    //     image: "/placeholder.svg?height=100&width=100&text=BS.Y",
    //     role: "Bác sĩ Đông y",
    //     specialty: "Da liễu, Tiêu hóa",
    //     experience: 12 ,
    //   },
    //   {
    //     id: 3,
    //     name: "BS. Phạm Văn Z",
    //     image: "/placeholder.svg?height=100&width=100&text=BS.Z",
    //     role: "Bác sĩ Đông y",
    //     specialty: "Thần kinh, Mất ngủ",
    //     experience: 10 ,
    //   },
    // ],
    services: [
      {
        id: 1,
        name: "Khám tổng quát",
        price: 300000,
        duration: "45 phút",
        description: "Đánh giá tổng thể tình trạng sức khỏe, chẩn đoán và tư vấn phương pháp điều trị.",
      },
      {
        id: 2,
        name: "Châm cứu",
        price: 250000,
        duration: "60 phút",
        description: "Sử dụng phương pháp châm cứu truyền thống để điều trị các vấn đề về đau nhức, mất ngủ, stress.",
      },
      {
        id: 3,
        name: "Bấm huyệt",
        price: 200000,
        duration: "30 phút",
        description: "Kỹ thuật bấm huyệt giúp giảm đau, cải thiện tuần hoàn và phục hồi chức năng.",
      },
      {
        id: 4,
        name: "Tư vấn trực tuyến",
        price: 150000,
        duration: "30 phút",
        description: "Tư vấn sức khỏe qua video call, phù hợp cho những người không thể đến trực tiếp.",
      },
    ],
    schedule: [
      {
        day: "Thứ Hai - Thứ Sáu",
        hours: "08:00 - 17:00",
      },
      {
        day: "Thứ Bảy",
        hours: "08:00 - 12:00",
      },
      {
        day: "Chủ Nhật",
        hours: "Nghỉ",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Trần Thị Hoa",
        avatar: "/placeholder.svg?height=50&width=50&text=H",
        rating: 5,
        date: "15/06/2023",
        comment:
          "Phòng khám rất sạch sẽ và chuyên nghiệp. Các bác sĩ tận tâm và giải thích rõ ràng về tình trạng bệnh. Tôi rất hài lòng với dịch vụ.",
      },
      {
        id: 2,
        name: "Nguyễn Văn Minh",
        avatar: "/placeholder.svg?height=50&width=50&text=M",
        rating: 4,
        date: "02/05/2023",
        comment:
          "Dịch vụ khám bệnh tốt, bác sĩ chuyên môn cao. Tuy nhiên thời gian chờ đợi hơi lâu. Mong phòng khám cải thiện vấn đề này.",
      },
      {
        id: 3,
        name: "Lê Thị Hương",
        avatar: "/placeholder.svg?height=50&width=50&text=H",
        rating: 5,
        date: "20/04/2023",
        comment:
          "Tôi đã bị đau lưng mãn tính nhiều năm, đã thử nhiều nơi nhưng không khỏi. Sau khi được điều trị tại Phòng Khám Đông Y Tâm An, tình trạng đã cải thiện đáng kể.",
      },
    ],
  }
}

export default async function ClinicDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const clinic = await getClinic(id)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <Link href="/phong-kham" className="hover:text-green-700">
          Phòng Khám
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{clinic.name}</span>
      </div>

      {/* Clinic Header */}
      <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8">
        <div className="relative h-64 md:h-80">
          <img src={clinic.image || "/placeholder.svg"} alt={clinic.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6 text-white">
              <div className="flex items-center mb-2">
                <h1 className="text-3xl font-bold mr-2">{clinic.name}</h1>
                {clinic.isVerified && (
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Đã Xác Thực
                  </Badge>
                )}
              </div>
              <p className="text-gray-200 mb-2">{clinic.experience}</p>
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400 mr-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(clinic.rating) ? "fill-current" : "text-gray-300"}`}
                      />
                    ))}
                </div>
                <span className="text-sm font-medium">{clinic.rating}</span>
                <span className="text-sm text-gray-300 ml-1">({clinic.reviewCount} đánh giá)</span>
              </div>
              <div className="flex items-center text-sm text-gray-200">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{clinic.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Contact Info */}
        <div className="lg:w-1/3">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Thông Tin Liên Hệ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <span>{clinic.location}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <span>{clinic.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <span>{clinic.email}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-400 mr-3" />
                  <span>{clinic.website}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Lịch Làm Việc</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clinic.schedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="font-medium">{item.day}</span>
                    </div>
                    <span>{item.hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Đặt Lịch Khám</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Đặt lịch khám ngay hôm nay để được tư vấn và điều trị bởi đội ngũ bác sĩ giàu kinh nghiệm của chúng
                  tôi.
                </p>
                <Button className="w-full bg-green-700 hover:bg-green-800">
                <Link href={`/dat-lich/?idPhongKham=${clinic.id}`}>
                    Đặt Lịch Ngay</Link>
                </Button>
                {/* <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Nhắn Tin
                </Button> */}
                  <ZaloContactDialog
                    practitionerId={clinic.id}
                    practitionerName={clinic.name}
                    practitionerPhone={clinic.phone.replace(/\D/g, "")}
                    practitionerZalo={clinic.phone.replace(/\D/g, "")}
                    buttonText="Nhắn Tin"
                    buttonVariant="outline"
                    buttonClassName="w-full"
                  />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs */}
        <div className="lg:w-2/3">
          <Tabs defaultValue="about">
            <TabsList className="w-full">
              <TabsTrigger value="about">Giới Thiệu</TabsTrigger>
              {/* <TabsTrigger value="practitioners">Đội Ngũ Bác Sĩ</TabsTrigger> */}
              <TabsTrigger value="products">Sản Phẩm</TabsTrigger>
              <TabsTrigger value="services">Dịch Vụ</TabsTrigger>
              <TabsTrigger value="reviews">Đánh Giá</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Giới Thiệu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: clinic.description }} />

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Chuyên Môn</h3>
                    <div className="flex flex-wrap gap-2">
                      {clinic.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="bg-green-50">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Hình Ảnh Phòng Khám</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {clinic.gallery.map((image, index) => (
                        <div key={index} className="rounded-lg overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${clinic.name} ${index + 1}`}
                            className="w-full h-40 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* <TabsContent value="practitioners" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Đội Ngũ Bác Sĩ</CardTitle>
                  <Badge className="bg-blue-100 text-blue-700">
                    <Users className="h-3 w-3 mr-1" />
                    {clinic.practitioners.length} Bác Sĩ
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {clinic.practitioners.map((practitioner) => (
                      <div key={practitioner.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                        <div className="md:w-1/4 flex justify-center">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={practitioner.image} alt={practitioner.name} />
                            <AvatarFallback>{practitioner.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="md:w-3/4">
                          <h3 className="text-lg font-semibold mb-1">{practitioner.name}</h3>
                          <p className="text-gray-600 mb-2">{practitioner.role}</p>
                          <p className="text-gray-600 mb-2">{practitioner.specialty}</p>
                          <p className="text-gray-600 mb-4">{practitioner.experience}</p>
                          <div className="flex gap-3">
                            <Button className="bg-green-700 hover:bg-green-800">Đặt Lịch</Button>
                            <Button variant="outline">Xem Hồ Sơ</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}

            <TabsContent value="services" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dịch Vụ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {clinic.services.map((service) => (
                      <div key={service.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                          <h3 className="text-lg font-semibold">{service.name}</h3>
                          <div className="flex items-center mt-2 md:mt-0">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600 mr-4">{service.duration}</span>
                            <span className="font-bold text-green-700">{service.price.toLocaleString()}đ</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <Button className="bg-green-700 hover:bg-green-800">
                        <Link href={`/dat-lich/?idPhongKham=${clinic.id}&idDichVu=${service.id}`}>
                          Đặt lịch
                        </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Đánh Giá từ Khách Hàng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400 mr-2">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < Math.floor(clinic.rating) ? "fill-current" : "text-gray-300"}`}
                            />
                          ))}
                      </div>
                      <span className="text-xl font-bold">{clinic.rating}</span>
                      <span className="text-gray-500 ml-1">({clinic.reviewCount} đánh giá)</span>
                    </div>
                    <ReviewDialog
                          itemName={clinic.name}
                          itemType="practitioner"
                          buttonText="Viết Đánh Giá"
                          buttonClassName="bg-green-700 hover:bg-green-800"
                      />
                                    
                  </div>

                  <div className="space-y-6">
                    {clinic.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-gray-200 mr-4">
                            <img
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                              <h4 className="font-medium">{review.name}</h4>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex text-yellow-400 mb-2">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`}
                                  />
                                ))}
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button variant="outline">Xem Thêm Đánh Giá</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

