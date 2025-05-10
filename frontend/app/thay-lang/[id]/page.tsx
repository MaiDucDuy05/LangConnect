"use client"

import { useState, useEffect } from "react"
import { use } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ZaloContactDialog } from "@/components/zalo-contact-dialog"
import { ReviewDialog } from "@/components/review-dialog"
import { Calendar, Clock, MapPin, Star, Phone, Mail, Globe, CheckCircle, ShoppingCart, Loader2 } from "lucide-react"
import Link from "next/link"
import { getBusinessApi } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { Practitioner } from "@/types";
import { getPractitionerById } from "@/database/business";
export default function PractitionerDetailPage({ params }: { params: { id: string } }) {
  const { user: authUser } = useAuth()
  const { id } = use(params);
  const practitionersData = getPractitionerById(id);
  console.log("Practitioner Data:", practitionersData)
  const [practitioner, setPractitioner] = useState<Practitioner | null>(practitionersData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // useEffect(() => {
  //   async function fetchPractitioner() {
  //     try {
  //       setLoading(true)
  //       setError(null)

  //       const businessApi = getBusinessApi(authUser?.token)

  //       // Sử dụng cách gọi API ban đầu
  //       const data = await businessApi.getBusinessById(id);

  //       if (data) {
  //         setPractitioner(data)
  //       } else {
  //         setError("Không thể tải thông tin thầy lang từ máy chủ.")
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch practitioner details", error)
  //       setError("Đã xảy ra lỗi khi tải thông tin thầy lang.")
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchPractitioner()
  // }, [id, authUser])

  // if (loading) {
  //   return (
  //     <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
  //       <div className="text-center">
  //         <Loader2 className="h-10 w-10 animate-spin text-green-600 mx-auto mb-4" />
  //         <p className="text-lg">Đang tải thông tin thầy lang...</p>
  //       </div>
  //     </div>
  //   )
  // }

  if (!practitioner) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">Không tìm thấy thông tin thầy lang</p>
          <Button asChild>
            <Link href="/thay-lang">Quay lại danh sách thầy lang</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-6">{error}</div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:w-1/3">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img
                      src={practitioner.profilePic || "/placeholder.svg?height=400&width=400&text=Thầy Lang"}
                      alt={practitioner.name || "Thầy Lang"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {practitioner.isVerified && (
                    <div className="absolute -bottom-2 -right-2 bg-green-100 text-green-700 rounded-full p-1">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  )}
                </div>
                <h1 className="text-2xl font-bold mb-1">{practitioner.name}</h1>
                <p className="text-gray-600 mb-2">{practitioner.businessType}</p>
                <div className="flex items-center justify-center mb-3">
                  <div className="flex text-yellow-400 mr-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(practitioner?.rating) ? "fill-current" : "text-gray-300"}`}
                        />
                      ))}
                  </div>
                  <span className="text-sm font-medium">{practitioner?.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({practitioner?.reviews.length} đánh giá)</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {practitioner.specializations.map((specialty) => (
                    <Badge key={specialty.id} variant="outline" className="bg-green-50">
                      {specialty.name}
                    </Badge>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{practitioner.experience} năm kinh nghiệm</p>
                {practitioner.isOnline && <Badge className="bg-green-100 text-green-700 mb-4">Đang trực tuyến</Badge>}
                <div className="w-full space-y-3">
                  <Button variant={"default"} className="w-full bg-green-700 hover:bg-green-800" asChild>
                    <Link href={`/dat-lich/?idThayLang=${practitioner.id}`}>Đặt Lịch Tư Vấn</Link>
                  </Button>
                   <Button variant={"default"} className="w-full bg-[#fff] hover:bg-[#fff] text-[#33333]" >
                      Bạn sẽ được tư vấn miễn phí khi đăt lịch thành công
                  </Button>
                  {/* <ZaloContactDialog
                    practitionerId={practitioner.id.toString()}
                    practitionerName={practitioner.name || undefined}
                    practitionerPhone={practitioner.phoneNumber.replace(/\D/g, "")}
                    practitionerZalo={practitioner.phoneNumber.replace(/\D/g, "")}
                    buttonText="Nhắn Tin"
                    buttonVariant="outline"
                    buttonClassName="w-full"
                  /> */}
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <span>{practitioner.address}</span>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <span>{practitioner.phoneNumber}</span>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <span>{practitioner.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Lịch Làm Việc</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {practitioner?.schedule?.map((item: any, index: number) => (
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
        </div>

        {/* Right Column - Tabs */}
        <div className="lg:w-2/3">
          <Tabs defaultValue="about">
            <TabsList className="w-full">
              <TabsTrigger value="about">Giới Thiệu</TabsTrigger>
              <TabsTrigger value="services">Dịch Vụ</TabsTrigger>
              <TabsTrigger value="remedies">Bài Thuốc</TabsTrigger>
              <TabsTrigger value="products">Sản Phẩm</TabsTrigger>
              <TabsTrigger value="reviews">Đánh Giá</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Giới Thiệu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: practitioner.description }} />

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Học Vấn</h3>
                    <div className="space-y-4">
                      {practitioner.degrees.map((degree,index) => (
                        <div key={index} className="flex">
                          <div className="mr-4 w-16 text-center">
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                              {degree.dateOfIssue}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium">{degree.name}</h4>
                            <p className="text-gray-600">{degree.awardingBody}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Chứng Chỉ</h3>
                    <div className="space-y-4">
                    {practitioner.degrees.map((degree,index) => (
                        <div key={index} className="flex">
                          <div className="mr-4 w-16 text-center">
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                              {degree.dateOfIssue}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium">{degree.name}</h4>
                            <p className="text-gray-600">{degree.awardingBody}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dịch Vụ</CardTitle>
                </CardHeader>
                <CardContent>
                  {practitioner?.services && practitioner?.services.length > 0 ? (
                    <div className="space-y-6">
                      {practitioner?.services?.map((service: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                            <h3 className="text-lg font-semibold">{service.name}</h3>
                            <div className="flex items-center mt-2 md:mt-0">
                              <Clock className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600 mr-4">{service.duration} Phút</span>
                              <span className="font-bold text-green-700">{service.price.toLocaleString()}đ</span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4">{service.description}</p>
                          <Button variant={"default"} className="w-[160px] bg-green-700 hover:bg-green-800" asChild>
                            <Link href={`/dat-lich/?idThayLang=${practitioner.id}&idDichVu=${service.id}`}>
                              Đặt lịch Tư Vấn
                            </Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Thầy lang chưa cung cấp thông tin về dịch vụ.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="remedies" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bài Thuốc Cổ Truyền</CardTitle>
                </CardHeader>
                <CardContent>
                  {practitioner?.remedies && practitioner?.remedies.length > 0 ? (
                    <div className="space-y-6">
                      {practitioner?.remedies?.map((remedy: any) => (
                        <div key={remedy.id} className="flex flex-col md:flex-row border rounded-lg p-4">
                          <div className="md:w-1/4 mb-4 md:mb-0">
                            <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                              <img
                                src={remedy.image || "/placeholder.svg?height=100&width=100&text=Bài thuốc"}
                                alt={remedy.name}
                                className="w-full h-full object-contain p-2"
                              />
                            </div>
                          </div>
                          <div className="md:w-3/4 md:pl-4 flex flex-col">
                            <div className="flex flex-col md:flex-row md:justify-between mb-2">
                              <h3 className="text-lg font-semibold">{remedy.name}</h3>
                            </div>
                            <p className="text-gray-600 mb-4">{remedy.description}</p>
                            <div className="mt-auto">
                              <Button className="bg-green-700 hover:bg-green-800">
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Liên Hệ 
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Thầy lang chưa cung cấp thông tin về bài thuốc.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sản Phẩm</CardTitle>
                </CardHeader>
                <CardContent>
                  {practitioner?.products && practitioner?.products.length > 0 ? (
                    <div className="space-y-6">
                      {practitioner?.products.map((product: any) => (
                        <div key={product.id} className="flex flex-col md:flex-row border rounded-lg p-4">
                          <div className="md:w-1/4 mb-4 md:mb-0">
                            <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                              <img
                                src={product.image || "/placeholder.svg?height=100&width=100&text=Sản phẩm"}
                                alt={product.name}
                                className="w-full h-full object-contain p-2"
                              />
                            </div>
                          </div>
                          <div className="md:w-3/4 md:pl-4 flex flex-col">
                            <div className="flex flex-col md:flex-row md:justify-between mb-2">
                              <h3 className="text-lg font-semibold">{product.name}</h3>
                              <span className="font-bold text-green-700 mt-1 md:mt-0">
                                {product.price.toLocaleString()}đ
                              </span>
                            </div>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="mt-auto">
                              <Button className="bg-green-700 hover:bg-green-800">
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Thêm vào giỏ hàng
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Thầy lang chưa cung cấp thông tin về sản phẩm.</p>
                    </div>
                  )}
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
                              className={`h-5 w-5 ${
                                i < Math.floor(practitioner?.rating) ? "fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                      </div>
                      <span className="text-xl font-bold">{practitioner?.rating}</span>
                      <span className="text-gray-500 ml-1">({practitioner.reviews.length} đánh giá)</span>
                    </div>
                    <ReviewDialog
                      itemName={practitioner.name || ""}
                      itemType="practitioner"
                      buttonText="Viết Đánh Giá"
                      buttonClassName="bg-green-700 hover:bg-green-800"
                    />
                  </div>

                  {practitioner.reviews[0] !=null && practitioner.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {practitioner.reviews.map((review: any) => (
                        <div key={review?.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-gray-200 mr-4">
                              <img
                                src={review?.avatar || "/placeholder.svg?height=50&width=50&text=User"}
                                alt={review?.name}
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <h4 className="font-medium">{review?.name}</h4>
                                <span className="text-sm text-gray-500">{review?.date}</span>
                              </div>
                              <div className="flex text-yellow-400 mb-2">
                                {Array(5)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < review?.rating ? "fill-current" : "text-gray-300"}`}
                                    />
                                  ))}
                              </div>
                              <p className="text-gray-700">{review?.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Chưa có đánh giá nào cho thầy lang này.</p>
                    </div>
                  )}

                  {practitioner.reviews && practitioner.reviews.length > 0 && (
                    <div className="mt-6 text-center">
                      <Button variant="outline">Xem Thêm Đánh Giá</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
