"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Calendar, FileText, Home } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const type = searchParams.get("type") || "product"
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Chuyển hướng sau khi đếm ngược kết thúc
          if (type === "subscription") {
            router.push("/tai-khoan")
          } else {
            router.push("/")
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router, type])

  const getSuccessContent = () => {
    switch (type) {
      case "appointment":
        return {
          title: "Đặt lịch thành công!",
          description: "Lịch hẹn của bạn đã được xác nhận.",
          icon: <Calendar className="h-12 w-12 text-green-500 mx-auto mb-4" />,
          message:
            "Chúng tôi đã gửi thông tin chi tiết về lịch hẹn qua email và tin nhắn. Thầy lang sẽ liên hệ với bạn trước ngày hẹn để xác nhận.",
          primaryAction: "Xem lịch hẹn",
          primaryLink: "/tai-khoan",
          secondaryAction: "Quay lại trang chủ",
          secondaryLink: "/",
        }
      case "subscription":
        return {
          title: "Đăng ký gói dịch vụ thành công!",
          description: "Gói dịch vụ của bạn đã được kích hoạt.",
          icon: <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />,
          message:
            "Cảm ơn bạn đã đăng ký gói dịch vụ. Bạn có thể bắt đầu sử dụng các tính năng ngay bây giờ. Thông tin chi tiết đã được gửi đến email của bạn.",
          primaryAction: "Quản lý tài khoản",
          primaryLink: "/tai-khoan",
          secondaryAction: "Khám phá dịch vụ",
          secondaryLink: "/",
        }
      default:
        return {
          title: "Thanh toán thành công!",
          description: "Đơn hàng của bạn đã được xác nhận.",
          icon: <FileText className="h-12 w-12 text-green-500 mx-auto mb-4" />,
          message:
            "Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý và sẽ được giao trong thời gian sớm nhất. Thông tin chi tiết đã được gửi đến email của bạn.",
          primaryAction: "Theo dõi đơn hàng",
          primaryLink: "/tai-khoan",
          secondaryAction: "Tiếp tục mua sắm",
          secondaryLink: "/san-pham",
        }
    }
  }

  const content = getSuccessContent()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card className="border-green-100">
          <CardHeader className="text-center">
            {content.icon}
            <CardTitle className="text-2xl text-green-700">{content.title}</CardTitle>
            <CardDescription>{content.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="text-green-800 text-sm">{content.message}</p>
            </div>

            <div className="text-center text-sm text-gray-500 mt-4">
              <p>
                Tự động chuyển hướng sau <span className="font-medium">{countdown}</span> giây
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href={content.primaryLink}>
                {content.primaryAction}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href={content.secondaryLink}>
                {content.secondaryAction}
                <Home className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

