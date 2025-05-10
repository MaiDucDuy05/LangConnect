import type React from "react"
import type { Metadata } from "next"
import { Card, CardContent} from "@/components/ui/card"
import { Stethoscope, Calendar, Video, Clock, TrendingUp } from "lucide-react"
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản Lý Dịch Vụ</h1>
          <p className="text-gray-500">Quản lý dịch vụ, lịch làm việc, lịch hẹn và tư vấn trực tuyến</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/ql-dich-vu/dich-vu">
          <Card className="h-[136px] hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Dịch Vụ</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/ql-dich-vu/lich-lam-viec">
          <Card className="h-[136px]  hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Lịch Làm Việc</p>
                  <p className="text-2xl font-bold">7 ngày</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/ql-dich-vu/lich-hen">
          <Card className= "h-[136px]  hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Lịch Hẹn</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+8.4% so với tuần trước</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/ql-dich-vu/tu-van-truc-tuyen">
          <Card className="h-[136px]  hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tư Vấn Trực Tuyến</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Video className="h-6 w-6 text-yellow-600" />
                </div>
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
