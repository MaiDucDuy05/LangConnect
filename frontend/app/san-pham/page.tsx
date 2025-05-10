"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Search, Star, Filter, ShoppingCart, Heart, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { toast } from "@/hooks/use-toast";

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice: number
  rating: number
  reviewCount: number
  image: string
  seller: string
  discount: number
  isBestSeller: boolean
}

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State cho tìm kiếm và lọc
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get("category") || "all")
  const [selectedUses, setSelectedUses] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000])
  const [minPrice, setMinPrice] = useState<string>("0")
  const [maxPrice, setMaxPrice] = useState<string>("1000000")
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [sortOption, setSortOption] = useState<string>(searchParams.get("sort") || "popularity")
  const [activeFilters, setActiveFilters] = useState<{ type: string; value: string }[]>([])

  // State cho sản phẩm
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isFiltering, setIsFiltering] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])

  // Sample products data
  const products = []

  // Sample categories for filter
  const categories = [
    "Trà thảo mộc",
    "Cao xoa bóp",
    "Viên uống",
    "Thực phẩm chức năng",
    "Thảo dược",
    "Tinh dầu",
    "Dược liệu",
    "Bài thuốc gia truyền",
  ]

  // Sample uses for filter
  const uses = [
    "Tiêu hóa",
    "Xương khớp",
    "Gan mật",
    "Mất ngủ",
    "Tăng cường miễn dịch",
    "Huyết áp",
    "Đường huyết",
    "Da liễu",
    "Giải nhiệt",
    "Thanh lọc cơ thể",
    "Đau nhức",
    "Giải độc",
    "Hô hấp",
  ]

  const NoProduct = products.length === 0

  // Khởi tạo danh sách sản phẩm đã lọc
  useEffect(() => {
    setFilteredProducts(products)

    // Khôi phục trạng thái filter từ URL
    const category = searchParams.get("category")
    if (category) {
      setSelectedCategory(category)
      setActiveFilters((prev) => [...prev, { type: "category", value: category }])
    }

    const search = searchParams.get("search")
    if (search) {
      setSearchTerm(search)
      setActiveFilters((prev) => [...prev, { type: "search", value: search }])
    }

    const min = searchParams.get("min")
    const max = searchParams.get("max")
    if (min && max) {
      setMinPrice(min)
      setMaxPrice(max)
      setPriceRange([Number.parseInt(min), Number.parseInt(max)])
      setActiveFilters((prev) => [
        ...prev,
        {
          type: "price",
          value: `${Number.parseInt(min).toLocaleString()}đ - ${Number.parseInt(max).toLocaleString()}đ`,
        },
      ])
    }

    // Khôi phục wishlist từ localStorage
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [searchParams])

  // Áp dụng bộ lọc
  const applyFilters = () => {
    setIsFiltering(true)

    const newFilters: { type: string; value: string }[] = []

    // Lọc theo tên sản phẩm
    let filtered = products
    if (searchTerm) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      newFilters.push({ type: "search", value: searchTerm })
    }

    // Lọc theo danh mục
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
      newFilters.push({ type: "category", value: selectedCategory })
    }

    // Lọc theo công dụng
    if (selectedUses.length > 0) {
      filtered = filtered.filter((product) => selectedUses.some((use) => product.uses?.includes(use)))
      selectedUses.forEach((use) => {
        newFilters.push({ type: "use", value: use })
      })
    }

    // Lọc theo khoảng giá
    const minPriceValue = Number.parseInt(minPrice || "0")
    const maxPriceValue = Number.parseInt(maxPrice || "1000000")

    filtered = filtered.filter((product) => product.price >= minPriceValue && product.price <= maxPriceValue)

    if (minPriceValue > 0 || maxPriceValue < 1000000) {
      newFilters.push({
        type: "price",
        value: `${minPriceValue.toLocaleString()}đ - ${maxPriceValue.toLocaleString()}đ`,
      })
    }

    // Lọc theo đánh giá
    if (selectedRatings.length > 0) {
      filtered = filtered.filter((product) => selectedRatings.some((rating) => product.rating >= rating))
      selectedRatings.forEach((rating) => {
        newFilters.push({ type: "rating", value: `${rating} sao trở lên` })
      })
    }

    // Sắp xếp sản phẩm
    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default: // popularity
        filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0))
    }

    setActiveFilters(newFilters)
    setFilteredProducts(filtered)
    setIsFiltering(false)

    // Cập nhật URL với các tham số lọc
    updateUrlWithFilters()

    toast({
      title: "Đã áp dụng bộ lọc",
      description: `Tìm thấy ${filtered.length} sản phẩm phù hợp.`,
    })
  }

  // Cập nhật URL với các tham số lọc
  const updateUrlWithFilters = () => {
    const params = new URLSearchParams()

    if (searchTerm) params.set("search", searchTerm)
    if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory)
    if (Number.parseInt(minPrice) > 0) params.set("min", minPrice)
    if (Number.parseInt(maxPrice) < 1000000) params.set("max", maxPrice)
    if (sortOption !== "popularity") params.set("sort", sortOption)

    const url = `/san-pham${params.toString() ? "?" + params.toString() : ""}`
    router.push(url, { scroll: false })
  }

  // Đặt lại bộ lọc
  const resetFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedUses([])
    setPriceRange([0, 1000000])
    setMinPrice("0")
    setMaxPrice("1000000")
    setSelectedRatings([])
    setSortOption("popularity")
    setActiveFilters([])
    setFilteredProducts(products)
    router.push("/san-pham")

    toast({
      title: "Đã đặt lại bộ lọc",
      description: "Tất cả bộ lọc đã được xóa.",
    })
  }

  // Xử lý thay đổi checkbox công dụng
  const handleUseChange = (use: string, checked: boolean) => {
    if (checked) {
      setSelectedUses((prev) => [...prev, use])
    } else {
      setSelectedUses((prev) => prev.filter((item) => item !== use))
    }
  }

  // Xử lý thay đổi checkbox đánh giá
  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      setSelectedRatings((prev) => [...prev, rating])
    } else {
      setSelectedRatings((prev) => prev.filter((item) => item !== rating))
    }
  }

  // Xử lý thay đổi khoảng giá từ slider
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value as [number, number])
    setMinPrice(value[0].toString())
    setMaxPrice(value[1].toString())
  }

  // Xử lý thay đổi giá nhập vào
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMinPrice(value)
    if (value && !isNaN(Number.parseInt(value))) {
      setPriceRange([Number.parseInt(value), priceRange[1]])
    }
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMaxPrice(value)
    if (value && !isNaN(Number.parseInt(value))) {
      setPriceRange([priceRange[0], Number.parseInt(value)])
    }
  }

  // Xử lý thêm vào danh sách yêu thích
  const toggleWishlist = (productId: number) => {
    let newWishlist: number[]

    if (wishlist.includes(productId)) {
      newWishlist = wishlist.filter((id) => id !== productId)
      toast({
        title: "Đã xóa khỏi danh sách yêu thích",
        description: "Sản phẩm đã được xóa khỏi danh sách yêu thích của bạn.",
      })
    } else {
      newWishlist = [...wishlist, productId]
      toast({
        title: "Đã thêm vào danh sách yêu thích",
        description: "Sản phẩm đã được thêm vào danh sách yêu thích của bạn.",
      })
    }

    setWishlist(newWishlist)
    localStorage.setItem("wishlist", JSON.stringify(newWishlist))
  }

  // Xử lý xóa một bộ lọc
  const removeFilter = (filter: { type: string; value: string }) => {
    switch (filter.type) {
      case "search":
        setSearchTerm("")
        break
      case "category":
        setSelectedCategory("all")
        break
      case "use":
        setSelectedUses((prev) => prev.filter((use) => use !== filter.value))
        break
      case "price":
        setPriceRange([0, 1000000])
        setMinPrice("0")
        setMaxPrice("1000000")
        break
      case "rating":
        const rating = Number.parseInt(filter.value.split(" ")[0])
        setSelectedRatings((prev) => prev.filter((r) => r !== rating))
        break
    }

    setActiveFilters((prev) => prev.filter((f) => !(f.type === filter.type && f.value === filter.value)))

    // Áp dụng lại bộ lọc sau khi xóa
    setTimeout(() => applyFilters(), 0)
  }

  // Xử lý tìm kiếm khi nhấn Enter
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyFilters()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sản Phẩm Đông Y</h1>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
          </div>
          <div className="flex-1">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Danh mục sản phẩm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-none">
            <Button
              className="w-full md:w-auto bg-green-700 hover:bg-green-800"
              onClick={applyFilters}
              disabled={isFiltering}
            >
              <Search className="mr-2 h-4 w-4" />
              Tìm Kiếm
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-700">Bộ lọc đang áp dụng:</span>
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                {filter.value}
                <button onClick={() => removeFilter(filter)} className="ml-1 rounded-full hover:bg-gray-200 p-0.5">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={resetFilters} className="text-gray-500 hover:text-gray-700">
              Xóa tất cả
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Bộ Lọc</h2>
              <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800" onClick={resetFilters}>
                Đặt lại
              </Button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Danh Mục</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox
                      id={category}
                      checked={selectedCategory === category}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedCategory(category)
                        else if (selectedCategory === category) setSelectedCategory("all")
                      }}
                    />
                    <label htmlFor={category} className="ml-2 text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Uses Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Công Dụng</h3>
              <div className="space-y-2">
                {uses.map((use) => (
                  <div key={use} className="flex items-center">
                    <Checkbox
                      id={use}
                      checked={selectedUses.includes(use)}
                      onCheckedChange={(checked) => handleUseChange(use, checked as boolean)}
                    />
                    <label htmlFor={use} className="ml-2 text-sm text-gray-700">
                      {use}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Khoảng Giá</h3>
              <div className="space-y-4">
                <Slider value={priceRange} min={0} max={1000000} step={50000} onValueChange={handlePriceRangeChange} />
                <div className="flex items-center justify-between">
                  <div className="w-[45%]">
                    <input
                      type="number"
                      placeholder="Từ"
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      value={minPrice}
                      onChange={handleMinPriceChange}
                    />
                  </div>
                  <span className="text-gray-500">-</span>
                  <div className="w-[45%]">
                    <input
                      type="number"
                      placeholder="Đến"
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Đánh Giá</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
                    />
                    <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center">
                      {Array(rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      {Array(5 - rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-gray-300" />
                        ))}
                      <span className="ml-1">& trở lên</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Filters Button */}
            <Button className="w-full bg-green-700 hover:bg-green-800" onClick={applyFilters} disabled={isFiltering}>
              <Filter className="mr-2 h-4 w-4" />
              Áp Dụng Bộ Lọc
            </Button>
          </div>
        </div>

        {/* Products List */}
        <div className="lg:w-3/4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">Hiển thị {filteredProducts.length} sản phẩm</p>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Sắp xếp theo:</span>
              <Select
                value={sortOption}
                onValueChange={(value) => {
                  setSortOption(value)
                  setTimeout(() => applyFilters(), 0)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Phổ biến nhất</SelectItem>
                  <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
                  <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
                  <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Trong quá trình thử nghiệm chưa có sản phẩm nào được bán trên hệ thống.</h3>
              <p className="text-gray-500 mb-6"> Chúng tôi đang trong quá trình phát triển và sẽ sớm cập nhật thêm .</p>
               <p className="text-gray-500 mb-6"> Xin cảm ơn.</p>
              {/* <Button onClick={resetFilters}>Xóa tất cả bộ lọc</Button> */}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden group">
                  <div className="relative">
                    <Link href={`/san-pham/${product.id}`}>
                      <div className="h-64 bg-gray-100">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-contain p-4"
                        />
                      </div>
                    </Link>
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{product.discount}%
                      </div>
                    )}
                    {product.isBestSeller && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Bán chạy
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-2 right-2 ${wishlist.includes(product.id) ? "opacity-100 text-red-500" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-300 bg-white hover:bg-gray-100`}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-1">
                      <span className="text-sm text-gray-500">{product.category}</span>
                    </div>
                    <Link href={`/san-pham/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-1 line-clamp-2 h-14 hover:text-green-700">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 mr-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}`}
                            />
                          ))}
                      </div>
                      <span className="text-sm text-gray-500">({product.reviewCount})</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">Bán bởi: {product.seller}</div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-lg text-green-700">{product.price.toLocaleString()}đ</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {product.originalPrice.toLocaleString()}đ
                          </span>
                        )}
                      </div>
                      <Button size="sm" className="bg-green-700 hover:bg-green-800">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Mua
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

