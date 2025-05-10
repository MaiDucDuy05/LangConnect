"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { use } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle,
  MessageCircle,
  Copy,
  Facebook,
  Twitter,
  Mail,
  LinkIcon,
} from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; 
import { useCart } from "@/context/CartContext"

// Giả lập dữ liệu sản phẩm
const getProduct = (id: string) => {
  return {
    id,
    name: "Trà Thảo Mộc Thanh Nhiệt",
    category: "Trà thảo mộc",
    price: 250000,
    originalPrice: 300000,
    discount: 17,
    rating: 4.8,
    reviewCount: 85,
    stock: 120,
    sold: 350,
    images: [
      "/placeholder.svg?height=500&width=500&text=Trà Thảo Mộc 1",
      "/placeholder.svg?height=500&width=500&text=Trà Thảo Mộc 2",
      "/placeholder.svg?height=500&width=500&text=Trà Thảo Mộc 3",
      "/placeholder.svg?height=500&width=500&text=Trà Thảo Mộc 4",
    ],
    seller: {
      id: "seller-123",
      name: "Thảo Mộc Xanh",
      logo: "/placeholder.svg?height=100&width=100&text=TMX",
      rating: 4.9,
      productCount: 45,
      responseRate: 98,
      isOfficial: true,
    },
    description: `
      <h3>Trà Thảo Mộc Thanh Nhiệt - Giải pháp tự nhiên cho sức khỏe</h3>
      
      <p>Trà Thảo Mộc Thanh Nhiệt là sản phẩm được nghiên cứu và phát triển dựa trên các bài thuốc cổ truyền, kết hợp với công nghệ hiện đại để mang đến một sản phẩm chất lượng cao, an toàn và hiệu quả.</p>
      
      <p>Thành phần chính của Trà Thảo Mộc Thanh Nhiệt bao gồm:</p>
      <ul>
        <li>Hoa cúc: Thanh nhiệt, giải độc, sáng mắt</li>
        <li>Lá sen: Thanh tâm, an thần</li>
        <li>Kim ngân hoa: Thanh nhiệt, giải độc</li>
        <li>Cỏ ngọt: Tạo vị ngọt tự nhiên, không calories</li>
        <li>Bạc hà: Thơm mát, kích thích vị giác</li>
      </ul>
      
      <p>Công dụng chính:</p>
      <ul>
        <li>Thanh nhiệt, giải độc cơ thể</li>
        <li>Hỗ trợ giải nhiệt mùa hè</li>
        <li>Giúp làm mát gan, giải độc gan</li>
        <li>Cải thiện giấc ngủ, giảm căng thẳng</li>
        <li>Hỗ trợ hệ tiêu hóa, giảm đầy hơi, khó tiêu</li>
      </ul>
      
      <p>Hướng dẫn sử dụng: Pha 1 gói trà với 300ml nước nóng (80-90°C), đợi 3-5 phút cho trà ngấm đều. Uống 1-2 gói mỗi ngày để có hiệu quả tốt nhất.</p>
      
      <p>Bảo quản: Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp và nơi có độ ẩm cao.</p>
      
      <p>Quy cách đóng gói: Hộp 20 gói x 2g</p>
    `,
    specifications: [
      {
        name: "Thương hiệu",
        value: "Thảo Mộc Xanh",
      },
      {
        name: "Xuất xứ",
        value: "Việt Nam",
      },
      {
        name: "Thành phần chính",
        value: "Hoa cúc, Lá sen, Kim ngân hoa, Cỏ ngọt, Bạc hà",
      },
      {
        name: "Công dụng",
        value: "Thanh nhiệt, giải độc, hỗ trợ giải nhiệt mùa hè",
      },
      {
        name: "Đối tượng sử dụng",
        value: "Người lớn và trẻ em trên 12 tuổi",
      },
      {
        name: "Hạn sử dụng",
        value: "24 tháng kể từ ngày sản xuất",
      },
      {
        name: "Quy cách đóng gói",
        value: "Hộp 20 gói x 2g",
      },
      {
        name: "Chứng nhận",
        value: "HACCP, ISO 22000:2018",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Nguyễn Văn X",
        avatar: "/placeholder.svg?height=50&width=50&text=X",
        rating: 5,
        date: "15/06/2023",
        comment:
          "Sản phẩm rất tốt, uống vào cảm thấy mát và dễ chịu. Đặc biệt là mùa hè, uống vào buổi chiều giúp cơ thể mát mẻ và ngủ ngon hơn.",
        images: ["/placeholder.svg?height=100&width=100&text=Review 1"],
      },
      {
        id: 2,
        name: "Trần Thị Y",
        avatar: "/placeholder.svg?height=50&width=50&text=Y",
        rating: 4,
        date: "02/05/2023",
        comment: "Trà có mùi thơm dễ chịu, vị ngọt nhẹ. Uống vào cảm thấy mát và dễ chịu. Chỉ tiếc là giá hơi cao.",
        images: [],
      },
      {
        id: 3,
        name: "Lê Văn Z",
        avatar: "/placeholder.svg?height=50&width=50&text=Z",
        rating: 5,
        date: "20/04/2023",
        comment: "Tôi thường xuyên bị nóng trong người, uống trà này thấy cải thiện rõ rệt. Sẽ mua lại.",
        images: [
          "/placeholder.svg?height=100&width=100&text=Review 3.1",
          "/placeholder.svg?height=100&width=100&text=Review 3.2",
        ],
      },
    ],
    relatedProducts: [
      {
        id: 2,
        name: "Cao Gừng Trị Đau Nhức Xương Khớp",
        price: 180000,
        originalPrice: 200000,
        image: "/placeholder.svg?height=150&width=150&text=Cao Gừng",
        discount: 10,
      },
      {
        id: 3,
        name: "Viên Hoàng Liên Giải Độc Gan",
        price: 320000,
        originalPrice: 320000,
        image: "/placeholder.svg?height=150&width=150&text=Viên Hoàng Liên",
        discount: 0,
      },
      {
        id: 5,
        name: "Nấm Linh Chi Đỏ Hàn Quốc",
        price: 550000,
        originalPrice: 650000,
        image: "/placeholder.svg?height=150&width=150&text=Nấm Linh Chi",
        discount: 15,
      },
      {
        id: 6,
        name: "Tinh Dầu Tràm Nguyên Chất",
        price: 120000,
        originalPrice: 150000,
        image: "/placeholder.svg?height=150&width=150&text=Tinh Dầu Tràm",
        discount: 20,
      },
    ],
  }
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id} = use(params); 
  const product = getProduct(id)
  const { addToCart } = useCart(); 
  // State cho số lượng sản phẩm
  const [quantity, setQuantity] = useState(1)

  // State cho ảnh hiện tại
  const [currentImage, setCurrentImage] = useState(0)

  // State cho dialog
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [chatDialogOpen, setChatDialogOpen] = useState(false)
  const [shopDialogOpen, setShopDialogOpen] = useState(false)

  // State cho yêu thích
  const [isLiked, setIsLiked] = useState(false)

  // State cho chat
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<{ sender: string; message: string; time: string }[]>([
    {
      sender: "shop",
      message: "Xin chào! Tôi có thể giúp gì cho bạn về sản phẩm Trà Thảo Mộc Thanh Nhiệt?",
      time: "10:30",
    },
  ])

  // Kiểm tra xem sản phẩm có trong danh sách yêu thích không
  useEffect(() => {
    const wishlist = localStorage.getItem("wishlist")
    if (wishlist) {
      const wishlistArray = JSON.parse(wishlist) as number[]
      setIsLiked(wishlistArray.includes(Number.parseInt(id)))
    }
  }, [id])

  // Xử lý tăng giảm số lượng
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    } else {
      toast({
        title: "Số lượng tối đa",
        description: `Chỉ còn ${product.stock} sản phẩm trong kho.`,
      })
    }
  }

  // Xử lý thêm vào giỏ hàng
  const  handleAddToCart = () => {
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${quantity} sản phẩm "${product.name}" đã được thêm vào giỏ hàng.`,
    })
   addToCart({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
    })
    

  }

  // Xử lý mua ngay
  const buyNow = () => {
    toast({
      title: "Đang chuyển đến trang thanh toán",
      description: `Bạn đang mua ${quantity} sản phẩm "${product.name}".`,
    })
    // Chuyển đến trang thanh toán
    router.push('/thanh-toan')
  }

  // Xử lý thêm vào danh sách yêu thích
  const toggleWishlist = () => {
    const newLikedState = !isLiked
    setIsLiked(newLikedState)

    // Lưu vào localStorage
    const wishlist = localStorage.getItem("wishlist")
    let wishlistArray: number[] = []

    if (wishlist) {
      wishlistArray = JSON.parse(wishlist)
    }

    if (newLikedState) {
      // Thêm vào danh sách yêu thích
      if (!wishlistArray.includes(Number.parseInt(id))) {
        wishlistArray.push(Number.parseInt(id))
      }
      toast({
        title: "Đã thêm vào danh sách yêu thích",
        description: `Sản phẩm "${product.name}" đã được thêm vào danh sách yêu thích.`,
      })
    } else {
      // Xóa khỏi danh sách yêu thích
      wishlistArray = wishlistArray.filter((wishlistId) => wishlistId !== Number.parseInt(id))
      toast({
        title: "Đã xóa khỏi danh sách yêu thích",
        description: `Sản phẩm "${product.name}" đã được xóa khỏi danh sách yêu thích.`,
      })
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlistArray))
  }

  // Xử lý chia sẻ
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "Đã sao chép",
      description: "Đường dẫn đã được sao chép vào clipboard.",
    })
  }

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(product.name)}`,
      "_blank",
    )
  }

  const shareByEmail = () => {
    window.open(
      `mailto:?subject=${encodeURIComponent(`Chia sẻ sản phẩm: ${product.name}`)}&body=${encodeURIComponent(`Xem sản phẩm này: ${shareUrl}`)}`,
      "_blank",
    )
  }

  // Xử lý gửi tin nhắn
  const sendMessage = () => {
    if (!chatMessage.trim()) return

    // Thêm tin nhắn vào lịch sử chat
    const now = new Date()
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`

    setChatHistory([
      ...chatHistory,
      {
        sender: "user",
        message: chatMessage,
        time: timeString,
      },
    ])

    // Xóa tin nhắn đã gửi
    setChatMessage("")

    // Giả lập phản hồi từ shop sau 1 giây
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "shop",
          message: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!",
          time: `${now.getHours()}:${(now.getMinutes() + 1).toString().padStart(2, "0")}`,
        },
      ])
    }, 1000)
  }

  // Xử lý nhấn Enter để gửi tin nhắn
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <Link href="/san-pham" className="hover:text-green-700">
          Sản phẩm
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/san-pham?category=${product.category}`} className="hover:text-green-700">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{product.name}</span>
      </div>

      {/* Product Overview */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Product Images */}
        <div className="lg:w-2/5">
          <div className="bg-white rounded-lg overflow-hidden mb-4">
            <img
              src={product.images[currentImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-auto"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`border rounded-md overflow-hidden cursor-pointer ${
                  index === currentImage ? "border-green-500" : "border-gray-200"
                }`}
                onClick={() => setCurrentImage(index)}
              >
                <img src={image || "/placeholder.svg"} alt={`${product.name} ${index + 1}`} className="w-full h-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-3/5">
          <div className="bg-white rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}`}
                    />
                  ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <span className="text-sm text-gray-500">{product.reviewCount} đánh giá</span>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <span className="text-sm text-gray-500">{product.sold} đã bán</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-green-700 mr-2">{product.price}đ</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-500 line-through mr-2">
                      {product.originalPrice}đ
                    </span>
                    <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded">-{product.discount}%</span>
                  </>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-4">
                <span className="text-gray-700 w-24">Số lượng</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-gray-500 ml-4">{product.stock} sản phẩm có sẵn</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button className="flex-1 bg-green-700 hover:bg-green-800" onClick={ handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Thêm Vào Giỏ Hàng
              </Button>
              <Button variant="outline" className="flex-1" onClick={buyNow}>
                Mua Ngay
              </Button>
            </div>

            <div className="flex gap-4 mb-6">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center ${isLiked ? "text-red-500" : ""}`}
                onClick={toggleWishlist}
              >
                <Heart className={`mr-1 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Đã Thích" : "Yêu Thích"}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center" onClick={() => setShareDialogOpen(true)}>
                <Share2 className="mr-1 h-4 w-4" />
                Chia Sẻ
              </Button>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm">Giao hàng miễn phí từ 300.000đ</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm">Đảm bảo chất lượng</span>
              </div>
              <div className="flex items-center">
                <RotateCcw className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm">Đổi trả trong 7 ngày</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-3 overflow-hidden">
                <img
                  src={product.seller.logo || "/placeholder.svg"}
                  alt={product.seller.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-semibold mr-2">{product.seller.name}</h3>
                  {product.seller.isOfficial && (
                    <Badge className="bg-green-100 text-green-700 flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Chính Hãng
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span className="mr-4">{product.seller.productCount} sản phẩm</span>
                  <span>{product.seller.responseRate}% phản hồi</span>
                </div>
                <div className="flex gap-3 mt-3">
                  <Button size="sm" variant="outline" onClick={() => setShopDialogOpen(true)}>
                    Xem Shop
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setChatDialogOpen(true)}>
                    Chat Ngay
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full">
            <TabsTrigger value="description">Mô Tả Sản Phẩm</TabsTrigger>
            <TabsTrigger value="specifications">Thông Số Kỹ Thuật</TabsTrigger>
            <TabsTrigger value="reviews">Đánh Giá ({product.reviewCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <table className="w-full">
                  <tbody>
                    {product.specifications.map((spec, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                        <td className="py-3 px-4 font-medium w-1/3">{spec.name}</td>
                        <td className="py-3 px-4">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="md:w-1/3 flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold text-green-700 mb-2">{product.rating}</div>
                    <div className="flex text-yellow-400 mb-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}`}
                          />
                        ))}
                    </div>
                    <div className="text-gray-500">{product.reviewCount} đánh giá</div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="font-semibold mb-4">Đánh giá của bạn</h3>
                    <Button>Viết Đánh Giá</Button>
                  </div>
                </div>

                <Separator className="mb-6" />

                <div className="space-y-6">
                  {product.reviews.map((review) => (
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
                          <p className="text-gray-700 mb-3">{review.comment}</p>
                          {review.images.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {review.images.map((image, index) => (
                                <div key={index} className="w-16 h-16 rounded overflow-hidden">
                                  <img
                                    src={image || "/placeholder.svg"}
                                    alt={`Review ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
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

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Sản Phẩm Liên Quan</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {product.relatedProducts.map((relatedProduct) => (
            <Card key={relatedProduct.id} className="overflow-hidden group">
              <Link href={`/san-pham/${relatedProduct.id}`}>
                <div className="relative">
                  <div className="h-48 bg-gray-100 p-4">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {relatedProduct.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{relatedProduct.discount}%
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="text-sm font-medium mb-2 line-clamp-2 h-10">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-green-700">{relatedProduct.price}đ</span>
                      {relatedProduct.originalPrice > relatedProduct.price && (
                        <span className="text-xs text-gray-500 line-through ml-1">
                          {relatedProduct.originalPrice}đ
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chia sẻ sản phẩm</DialogTitle>
            <DialogDescription>Chia sẻ sản phẩm này với bạn bè và mạng xã hội.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-2">
            <div className="grid flex-1 gap-2">
              <Input value={shareUrl} readOnly className="w-full" />
            </div>
            <Button size="sm" className="px-3" onClick={copyToClipboard}>
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Button variant="outline" className="rounded-full p-2" onClick={shareToFacebook}>
              <Facebook className="h-5 w-5 text-blue-600" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" className="rounded-full p-2" onClick={shareToTwitter}>
              <Twitter className="h-5 w-5 text-blue-400" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="outline" className="rounded-full p-2" onClick={shareByEmail}>
              <Mail className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Email</span>
            </Button>
            <Button variant="outline" className="rounded-full p-2" onClick={copyToClipboard}>
              <LinkIcon className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Copy Link</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Dialog */}
      <Dialog open={chatDialogOpen} onOpenChange={setChatDialogOpen}>
        <DialogContent className="sm:max-w-md h-[80vh] flex flex-col">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={product.seller.logo} alt={product.seller.name} />
                <AvatarFallback>{product.seller.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle>{product.seller.name}</DialogTitle>
                <DialogDescription>Thường phản hồi trong vòng 5 phút</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto mb-4 p-2 border rounded-md">
            <div className="space-y-4">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      chat.sender === "user" ? "bg-green-100 text-green-900" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{chat.message}</p>
                    <p className="text-xs text-gray-500 mt-1 text-right">{chat.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Textarea
              placeholder="Nhập tin nhắn..."
              className="flex-1"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={sendMessage} disabled={!chatMessage.trim()}>
              Gửi
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Shop Dialog */}
      <Dialog open={shopDialogOpen} onOpenChange={setShopDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Thông tin cửa hàng</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={product.seller.logo} alt={product.seller.name} />
              <AvatarFallback>{product.seller.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                {product.seller.name}
                {product.seller.isOfficial && (
                  <Badge className="bg-green-100 text-green-700 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Chính Hãng
                  </Badge>
                )}
              </h3>
              <p className="text-gray-500">Hoạt động từ 2020</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span>{product.seller.rating}/5</span>
                </div>
                <div>{product.seller.productCount} sản phẩm</div>
                <div>{product.seller.responseRate}% phản hồi</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-2">Thông tin liên hệ</h4>
              <p className="text-sm">Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</p>
              <p className="text-sm">Email: contact@thaomocxanh.com</p>
              <p className="text-sm">Hotline: 1900 1234</p>
            </div>
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-2">Thời gian hoạt động</h4>
              <p className="text-sm">Thứ 2 - Thứ 6: 8:00 - 17:30</p>
              <p className="text-sm">Thứ 7: 8:00 - 12:00</p>
              <p className="text-sm">Chủ nhật: Nghỉ</p>
            </div>
          </div>

          <h4 className="font-medium mb-3">Sản phẩm nổi bật</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {product.relatedProducts.slice(0, 3).map((item) => (
              <div key={item.id} className="border rounded-md p-2">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-24 object-contain mb-2"
                />
                <h5 className="text-sm font-medium line-clamp-2">{item.name}</h5>
                <p className="text-green-700 font-medium text-sm">{item.price.toLocaleString()}đ</p>
              </div>
            ))}
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setChatDialogOpen(true)}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat với shop
            </Button>
            <Button>Xem tất cả sản phẩm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

