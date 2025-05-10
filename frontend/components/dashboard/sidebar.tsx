"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Stethoscope,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Cấu trúc menu chính
const sidebarItems = [
  {
    name: "Tổng Quan",
    href: "/dashboard",
    icon: LayoutDashboard,
    submenu: false,
  },
  {
    name: "Bài Đăng",
    href: "/dashboard/bai-dang",
    icon: FileText,
    submenu: false,
  },
  {
    name: "Quản Lý Dịch Vụ",
    href: "/dashboard/ql-dich-vu",
    icon: Stethoscope,
    submenu: true,
    subItems: [
      {
        name: "Dịch Vụ",
        href: "/dashboard/ql-dich-vu/dich-vu",
      },
      {
        name: "Lịch Làm Việc",
        href: "/dashboard/ql-dich-vu/lich-lam-viec",
      },
      {
        name: "Lịch Hẹn",
        href: "/dashboard/ql-dich-vu/lich-hen",
      },
      {
        name: "Tư Vấn Trực Tuyến",
        href: "/dashboard/ql-dich-vu/tu-van-truc-tuyen",
      },
    ],
  },
  {
    name: "Quản Lý Sản Phẩm",
    href: "/dashboard/ql-san-pham",
    icon: ShoppingBag,
    submenu: true,
    subItems: [
      {
        name: "Sản Phẩm",
        href: "/dashboard/ql-san-pham/san-pham",
      },
      {
        name: "Bài Thuốc",
        href: "/dashboard/ql-san-pham/bai-thuoc",
      },
      {
        name: "Đơn Hàng",
        href: "/dashboard/ql-san-pham/don-hang",
      },
      {
        name: "Doanh Thu",
        href: "/dashboard/ql-san-pham/doanh-thu",
      },
    ],
  },
  {
    name: "Cài Đặt",
    href: "/dashboard/settings",
    icon: Settings,
    submenu: false,
  },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    "/dashboard/ql-dich-vu": true,
    "/dashboard/ql-san-pham": true,
  })

  const toggleSubmenu = (href: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [href]: !prev[href],
    }))
  }

  const isSubmenuExpanded = (href: string) => {
    return expandedMenus[href] || false
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-white">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px]">
            <MobileSidebar
              pathname={pathname}
              setOpen={setOpen}
              expandedMenus={expandedMenus}
              toggleSubmenu={toggleSubmenu}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
        <div className="p-4 border-b flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-green-600 flex items-center justify-center text-white font-bold text-xl">
            L
          </div>
          <div>
            <Link href={'/'} className="text-green-700 font-bold text-lg">Lang Connect</Link>
            <div className="text-gray-500 text-sm">Medical Partner</div>
          </div>
        </div>
        <div className="flex flex-col flex-1 py-4">
          <nav className="flex-1 px-2 space-y-1">
            {sidebarItems.map((item) => {
              const isItemActive = isActive(item.href)

              return (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.href)}
                        className={cn(
                          "flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-md",
                          isItemActive
                            ? "bg-green-50 text-green-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon
                            className={cn("mr-3 h-5 w-5", isItemActive ? "text-green-700" : "text-gray-400")}
                          />
                          {item.name}
                        </div>
                        {isSubmenuExpanded(item.href) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>

                      {isSubmenuExpanded(item.href) && (
                        <div className="ml-6 mt-1 space-y-1">
                          {item.subItems?.map((subItem) => {
                            const isSubItemActive = pathname === subItem.href
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={cn(
                                  "flex items-center pl-8 pr-4 py-2 text-sm font-medium rounded-md",
                                  isSubItemActive
                                    ? "bg-green-50 text-green-700"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                )}
                              >
                                {subItem.name}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-4 py-3 text-sm font-medium rounded-md",
                        isItemActive
                          ? "bg-green-50 text-green-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      <item.icon className={cn("mr-3 h-5 w-5", isItemActive ? "text-green-700" : "text-gray-400")} />
                      {item.name}
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>
          <div className="px-2 mt-6">
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="mr-3 h-5 w-5" />
              Đăng Xuất
            </Button>
          </div>
        </div>
        <div className="p-4 border-t flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium">
            PT
          </div>
          <div className="text-gray-700">Partner Name</div>
        </div>
      </div>
    </>
  )
}

function MobileSidebar({
  pathname,
  setOpen,
  expandedMenus,
  toggleSubmenu,
}: {
  pathname: string
  setOpen: (open: boolean) => void
  expandedMenus: Record<string, boolean>
  toggleSubmenu: (href: string) => void
}) {
  const isSubmenuExpanded = (href: string) => {
    return expandedMenus[href] || false
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-green-600 flex items-center justify-center text-white font-bold text-xl">
            P
          </div>
          <div>
            <div className="text-green-700 font-bold text-lg">Partner Portal</div>
            <div className="text-gray-500 text-sm">Medical Partner</div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex flex-col flex-1 py-4 overflow-y-auto">
        <nav className="flex-1 px-2 space-y-1">
          {sidebarItems.map((item) => {
            const isItemActive = isActive(item.href)

            return (
              <div key={item.name}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.href)}
                      className={cn(
                        "flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-md",
                        isItemActive
                          ? "bg-green-50 text-green-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon className={cn("mr-3 h-5 w-5", isItemActive ? "text-green-700" : "text-gray-400")} />
                        {item.name}
                      </div>
                      {isSubmenuExpanded(item.href) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>

                    {isSubmenuExpanded(item.href) && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.subItems?.map((subItem) => {
                          const isSubItemActive = pathname === subItem.href
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={cn(
                                "flex items-center pl-8 pr-4 py-2 text-sm font-medium rounded-md",
                                isSubItemActive
                                  ? "bg-green-50 text-green-700"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              )}
                              onClick={() => setOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm font-medium rounded-md",
                      isItemActive
                        ? "bg-green-50 text-green-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className={cn("mr-3 h-5 w-5", isItemActive ? "text-green-700" : "text-gray-400")} />
                    {item.name}
                  </Link>
                )}
              </div>
            )
          })}
        </nav>
        <div className="px-2 mt-6">
          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="mr-3 h-5 w-5" />
            Đăng Xuất
          </Button>
        </div>
      </div>
      <div className="p-4 border-t flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium">
          PT
        </div>
        <div className="text-gray-700">Partner Name</div>
      </div>
    </div>
  )
}

