import type React from "react"
import type { Metadata } from "next"
import DashboardSidebar from "@/components/dashboard/sidebar"

export const metadata: Metadata = {
  title: "Dashboard - LangConnect",
  description: "Quản lý tài khoản và dịch vụ của bạn",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  )
}

