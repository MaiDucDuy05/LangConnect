import type React from "react"
import type { Metadata } from "next"
import { Card, CardContent} from "@/components/ui/card"
import { TrendingUp, BarChart3, ShoppingBag, Pill, CreditCard } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dashboard - LangConnect",
  description: "Quản lý tài khoản và dịch vụ của bạn",
}

export default function QLDVLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/ql-san-pham/san-pham">
          <Card className="h-[136px] hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Sản Phẩm</p>
                  <p className="text-2xl font-bold">48</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/ql-san-pham/bai-thuoc">
          <Card className="h-[136px] hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Bài Thuốc</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Pill className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/ql-san-pham/don-hang">
          <Card className="h-[136px] hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Đơn Hàng</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/ql-san-pham/doanh-thu">
          <Card className="h-[136px] hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Doanh Thu</p>
                  <p className="text-2xl font-bold">4.5M</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+14.2% so với tuần trước</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

    <div className="flex min-h-screen bg-gray-100">
     <div className="flex-1 p-8">{children}</div>
    </div>
    </>

  )
}
