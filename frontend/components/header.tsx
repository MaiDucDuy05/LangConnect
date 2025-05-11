"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, User, ShoppingCart, Search, XIcon, Trash2, ChevronRight, AlertCircle } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useClickAway } from "react-use"
import { useCart } from "@/context/CartContext"
import BetaNotificationDialog from "@/components/beta-notification-dialog"

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  id: number
  name: string
  price: number
  image: string
  category?: string
}

// Định nghĩa kiểu dữ liệu cho item trong giỏ hàng
interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  seller?: string
}

// Dữ liệu mẫu cho tìm kiếm
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "",
    price: 250000,
    image: "",
    category: "",
  },
  {
    id: 2,
    name: "",
    price: 320000,
    image: "",
    category: "",
  },
  {
    id: 3,
    name: "",
    price: 550000,
    image: "",
    category: "",
  },
  {
    id: 4,
    name: "",
    price: 1200000,
    image: "",
    category: "",
  },
  {
    id: 5,
    name: "",
    price: 350000,
    image: "",
    category: "",
  },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef(null)
  const router = useRouter()
  const [showCartDropdown, setShowCartDropdown] = useState(false)
  const cartRef = useRef(null)
  const {cartItems, subtotal, cartCount, removeFromCart } = useCart()
  const [showBetaDialog, setShowBetaDialog] = useState(false)

  // Xử lý click ra ngoài kết quả tìm kiếm
  useClickAway(searchRef, () => {
    setShowResults(false)
  })

  // Xử lý tìm kiếm
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    if (value.trim() === "") {
      setSearchResults([])
      setShowResults(false)
      return
    }

    // Tìm kiếm sản phẩm từ dữ liệu mẫu
    const results = sampleProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(value.toLowerCase())),
    )

    setSearchResults(results)
    setShowResults(true)
  }

  // Xử lý khi nhấn Enter trong ô tìm kiếm
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim() !== "") {
      router.push(`/san-pham?search=${encodeURIComponent(searchTerm)}`)
      setShowResults(false)
    }
  }

  // Xử lý khi click vào kết quả tìm kiếm
  const handleResultClick = (productId: number) => {
    router.push(`/san-pham/${productId}`)
    setShowResults(false)
    setSearchTerm("")
  }

  // Xóa từ khóa tìm kiếm
  const clearSearch = () => {
    setSearchTerm("")
    setSearchResults([])
    setShowResults(false)
  }

  
  // Xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    removeFromCart(id)
  }

  // Xử lý chuyển đến trang giỏ hàng
  const goToCart = () => {
    router.push("/gio-hang")
    setShowCartDropdown(false)
  }

  // Xử lý chuyển đến trang thanh toán
  const goToCheckout = () => {
    router.push("/thanh-toan")
    setShowCartDropdown(false)
  }

  // Hiển thị dialog thông báo beta
  const openBetaDialog = () => {
    setShowBetaDialog(true)
  }

  const navItems = [
    { label: "Trang Chủ", href: "/" },
    { label: "Thầy Thuốc Đông Y", href: "/thay-lang" },
    { label: "Phòng Khám", href: "/phong-kham" },
    { label: "Sản Phẩm", href: "/san-pham" },
    { label: "Thư Viện Đông Y", href: "/kien-thuc" },
    { label: "Blog", href: "/blog" },
  ]

  return (
    <header className="sticky top-0 z-50">
      {/* Beta Notification Dialog */}
      <BetaNotificationDialog open={showBetaDialog} onOpenChange={setShowBetaDialog} />

      {/* Beta Banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="container mx-auto px-4 py-1.5">
          <div className="flex items-center justify-center">
            <button 
              onClick={openBetaDialog}
              className="flex items-center text-amber-800 text-sm hover:text-amber-900 transition-colors"
            >
              <AlertCircle className="h-4 w-4 mr-1.5" />
              <span className="font-medium">Phiên bản thử nghiệm</span>
              <Badge className="ml-2 bg-amber-200 text-amber-800 hover:bg-amber-300 text-xs">Beta</Badge>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header with Search */}
      <div className="bg-green-600 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 mr-4">
              <Link href="/" className="flex items-center">
                <span className="text-white font-bold text-xl">Lang</span>
                <span className="text-green-100 font-bold text-xl">Connect</span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-3xl relative " ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Tìm thầy lang/phòng khám/Sản phẩm Đông y, Dược liệu..."
                    className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-12 top-0 h-full px-2 text-gray-500 hover:text-gray-700"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-full px-3 bg-green-700 text-white rounded-r-md hover:bg-green-800"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </form>

              {/* Kết quả tìm kiếm */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-2 px-2">Kết quả tìm kiếm</h3>
                    <ul>
                      {searchResults.map((product) => (
                        <li key={product.id}>
                          <button
                            onClick={() => handleResultClick(product.id)}
                            className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded-md flex items-center"
                          >
                            <div className="w-16 h-16 flex-shrink-0 mr-3 bg-gray-100 rounded overflow-hidden">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800">{product.name}</h4>
                              <p className="text-sm text-gray-500">{product.category}</p>
                              <p className="text-sm font-medium text-green-700">{product.price.toLocaleString()}đ</p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 pt-2 border-t text-center">
                      <Button
                        variant="link"
                        onClick={() => {
                          router.push(`/san-pham?search=${encodeURIComponent(searchTerm)}`)
                          setShowResults(false)
                        }}
                        className="text-green-700 text-sm"
                      >
                        Xem tất cả kết quả
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

             {/* Desktop Right Menu */}
             <div className="hidden md:flex items-center space-x-4 ml-4">
              <div className="relative" ref={cartRef}>
                <button
                  className="text-white flex flex-col items-center relative"
                  onMouseEnter={() => setShowCartDropdown(true)}
                  onClick={() => setShowCartDropdown(!showCartDropdown)}
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="text-xs">Giỏ hàng</span>
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-1.5 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </Badge>
                  )}
                </button>

                {/* Dropdown giỏ hàng */}
                {showCartDropdown && (
                  <div   onMouseLeave={() => setShowCartDropdown(false)} className="absolute top-full right-0 mt-1 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden">
                    <div className="p-3 border-b">
                      <h3 className="font-medium">Giỏ hàng của bạn ({cartCount})</h3>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                      {cartItems.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          <ShoppingCart className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                          <p>Giỏ hàng của bạn đang trống</p>
                        </div>
                      ) : (
                        <ul>
                          {cartItems.map((item) => (
                            <li key={item.id} className="border-b last:border-b-0">
                              <div className="p-3 flex items-center hover:bg-gray-50">
                                <div className="w-14 h-14 flex-shrink-0 mr-3 bg-gray-100 rounded overflow-hidden">
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-800 text-sm truncate">{item.name}</h4>
                                  <div className="flex items-center justify-between mt-1">
                                    <div className="text-sm text-gray-600">
                                      {item.quantity} x {item.price.toLocaleString()}đ
                                    </div>
                                    <div className="text-sm font-medium text-green-700">
                                      {(item.price * item.quantity).toLocaleString()}đ
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={(e) => handleRemoveFromCart(e, item.id)}
                                  className="ml-2 text-gray-400 hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="p-3 border-t bg-gray-50">
                      <div className="flex justify-between mb-3">
                        <span className="font-medium">Tổng cộng:</span>
                        <span className="font-bold text-green-700">{subtotal.toLocaleString()}đ</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={goToCart}>
                          Xem giỏ hàng
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-green-700 hover:bg-green-800"
                          onClick={goToCheckout}
                          disabled={cartItems.length === 0}
                        >
                          Thanh toán <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/" className="text-white flex flex-col items-center">
                <User className="h-6 w-6" />
                <span className="text-xs">Tài khoản</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <div className="relative mr-4" ref={cartRef}>
                <button className="text-white relative" onClick={() => setShowCartDropdown(!showCartDropdown)}>
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-1.5 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </Badge>
                  )}
                </button>

                {/* Dropdown giỏ hàng (mobile) */}
                {showCartDropdown && (
                  <div className="absolute top-full right-0 mt-1 w-72 bg-white rounded-md shadow-lg z-50 overflow-hidden">
                    <div className="p-3 border-b">
                      <h3 className="font-medium">Giỏ hàng của bạn ({cartCount})</h3>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                      {cartItems.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          <ShoppingCart className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                          <p>Giỏ hàng của bạn đang trống</p>
                        </div>
                      ) : (
                        <ul>
                          {cartItems.map((item) => (
                            <li key={item.id} className="border-b last:border-b-0">
                              <div className="p-3 flex items-center hover:bg-gray-50">
                                <div className="w-12 h-12 flex-shrink-0 mr-2 bg-gray-100 rounded overflow-hidden">
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-800 text-sm truncate">{item.name}</h4>
                                  <div className="flex items-center justify-between mt-1">
                                    <div className="text-xs text-gray-600">
                                      {item.quantity} x {item.price.toLocaleString()}đ
                                    </div>
                                    <div className="text-xs font-medium text-green-700">
                                      {(item.price * item.quantity).toLocaleString()}đ
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={(e) => handleRemoveFromCart(e, item.id)}
                                  className="ml-1 text-gray-400 hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="p-3 border-t bg-gray-50">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Tổng cộng:</span>
                        <span className="font-bold text-green-700">{subtotal.toLocaleString()}đ</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={goToCart}>
                          Xem giỏ hàng
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-green-700 hover:bg-green-800 text-xs"
                          onClick={goToCheckout}
                          disabled={cartItems.length === 0}
                        >
                          Thanh toán
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between py-4 border-b">
                      <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                          <span className="text-green-700 font-bold text-xl">ĐôngY</span>
                          <span className="text-gray-700 font-bold text-xl">Connect</span>
                        </Link>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <nav className="flex flex-col py-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="text-gray-600 hover:text-green-700 hover:bg-gray-100 px-4 py-3 text-base font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                    <div className="mt-auto border-t py-4">
                      <div className="flex flex-col gap-3 px-4">
                        <Button asChild variant="outline" className="justify-start">
                          <Link href="/dang-nhap" onClick={() => setIsOpen(false)}>
                            <User className="h-5 w-5 mr-2" />
                            Đăng Nhập
                          </Link>
                        </Button>
                        <Button asChild className="bg-green-700 hover:bg-green-800">
                          <Link href="/dang-ky" onClick={() => setIsOpen(false)}>
                            Đăng Ký
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="hidden md:flex space-x-8 py-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-green-700 px-3 py-2 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
