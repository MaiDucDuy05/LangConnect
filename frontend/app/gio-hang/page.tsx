"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/CartContext"


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

export default function CartPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
   const {cartItems ,setCartItems} = useCart(); 

  // Lấy dữ liệu giỏ hàng từ localStorage khi component mount
  useEffect(() => {
    const loadCartFromLocalStorage = () => {
      setIsLoading(true)
      try {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          setCartItems(parsedCart)
        } else {
          setCartItems([])
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
        setCartItems([])
      } finally {
        setIsLoading(false)
      }
    }

    loadCartFromLocalStorage()
  }, [])



  // Tăng số lượng sản phẩm
  const increaseQuantity = (id: number) => {
    setCartItems((prevItems: CartItem[]) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }

  // Giảm số lượng sản phẩm
  const decreaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)),
    )
  }

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
    toast({
      title: "Đã xóa sản phẩm",
      description: "Sản phẩm đã được xóa khỏi giỏ hàng",
      variant: "default",
    })
  }

  // Tính tổng tiền
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = cartItems.length > 0 ? 100000 : 0
  const shipping = cartItems.length > 0 ? 30000 : 0
  const total = subtotal - discount + shipping

  // Áp dụng mã giảm giá
  const applyPromoCode = () => {
    toast({
      title: "Mã giảm giá đã được áp dụng",
      description: "Giảm giá 100.000đ đã được áp dụng vào đơn hàng của bạn",
      variant: "default",
    })
  }

  // Chuyển đến trang thanh toán
  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Giỏ hàng trống",
        description: "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán",
        variant: "destructive",
      })
      return
    }

    // Chuyển đến trang thanh toán
    window.location.href = "/thanh-toan"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Giỏ Hàng</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between pb-4 border-b">
                <h2 className="text-xl font-semibold">Sản Phẩm</h2>
                <span className="text-gray-500">{cartItems.length} sản phẩm</span>
              </div>

              {isLoading ? (
                <div className="py-12 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 text-gray-300 animate-pulse">
                    <ShoppingBag className="w-full h-full" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Đang tải giỏ hàng...</h3>
                </div>
              ) : cartItems.length > 0 ? (
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-6 flex flex-col sm:flex-row">
                      <div className="sm:w-1/4 mb-4 sm:mb-0">
                        <div className="aspect-square w-full max-w-[120px] bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                      </div>
                      <div className="sm:w-3/4 sm:pl-6 flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">Bán bởi: {item.seller || "Đông Y Connect"}</p>
                          </div>
                          <div className="flex flex-col items-start sm:items-end">
                            <span className="font-bold text-lg text-green-700">{item.price.toLocaleString()}đ</span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="text-sm text-gray-500 line-through">
                                {item.originalPrice.toLocaleString()}đ
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-end mt-auto">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => decreaseQuantity(item.id)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
                    <ShoppingBag className="w-full h-full" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Giỏ hàng của bạn đang trống</h3>
                  <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiến hành thanh toán</p>
                  <Button asChild>
                    <Link href="/san-pham">Tiếp tục mua sắm</Link>
                  </Button>
                </div>
              )}

              {cartItems.length > 0 && (
                <div className="pt-4 border-t">
                  <Button variant="outline" asChild>
                    <Link href="/san-pham">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Tiếp tục mua sắm
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Tóm Tắt Đơn Hàng</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính</span>
                  <span>{subtotal.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Giảm giá</span>
                  <span className="text-red-600">-{discount.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span>{shipping.toLocaleString()}đ</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng</span>
                  <span className="text-green-700">{total.toLocaleString()}đ</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <Input placeholder="Mã giảm giá" className="rounded-r-none" />
                  <Button className="rounded-l-none bg-green-700 hover:bg-green-800" onClick={applyPromoCode}>
                    Áp dụng
                  </Button>
                </div>
                <Button className="w-full bg-green-700 hover:bg-green-800" onClick={proceedToCheckout}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Thanh Toán
                </Button>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Chúng tôi chấp nhận:</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs">VISA</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs">MC</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs">MOMO</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs">VNPAY</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs">COD</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

