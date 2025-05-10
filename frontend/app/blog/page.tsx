// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { useRouter, useSearchParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { MessageSquare, MoreHorizontal, ChevronDown } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { CommentDialog } from "@/components/comment-dialog"
// import { ShareDialog } from "@/components/share-dialog"
// import { ReportDialog } from "@/components/report-dialog"

// // Custom CSS để ẩn thanh cuộn ngang
// const scrollbarHideStyle = `
//   .scrollbar-hide::-webkit-scrollbar {
//     display: none;
//   }
//   .scrollbar-hide {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//   }
// `

// // Định nghĩa kiểu dữ liệu cho bài viết
// interface BlogPost {
//   id: number
//   title: string
//   excerpt: string
//   content?: string
//   image: string
//   category: string
//   author: string
//   authorAvatar?: string
//   date: string
//   readTime: string
//   tags?: string[]
//   featured?: boolean
//   upvotes?: number
//   downvotes?: number
//   comments?: number
// }

// // Định nghĩa kiểu dữ liệu cho bài viết nổi bật
// interface FeaturedPost {
//   id: number
//   title: string
//   excerpt: string
//   image: string
//   category: string
//   categorySlug: string
//   otherPosts: string
// }

// // Định nghĩa kiểu dữ liệu cho chế độ xem
// type ViewMode = "card" | "compact"

// export default function BlogPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   // Lấy các tham số từ URL
//   const initialSearchTerm = searchParams.get("search") || ""
//   const initialCategory = searchParams.get("category") || "Tất cả bài viết"
//   const initialSortBy = searchParams.get("sort") || "hot"
//   const initialViewMode = (searchParams.get("view") as ViewMode) || "card"

//   // State cho tìm kiếm và lọc
//   const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
//   const [activeCategory, setActiveCategory] = useState(initialCategory)
//   const [sortBy, setSortBy] = useState(initialSortBy)
//   const [selectedTags, setSelectedTags] = useState<string[]>([])
//   const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
//   const [isFiltering, setIsFiltering] = useState(false)
//   const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode)

//   // Sample blog categories
//   const categories = [
//     "Tất cả bài viết",
//     "Bài thuốc cổ truyền",
//     "Dược liệu quý",
//     "Phương pháp chữa bệnh",
//     "Dinh dưỡng & Sức khỏe",
//     "Kinh nghiệm dân gian",
//   ]

//   // Danh sách tag
//   const availableTags = [
//     "Đông y",
//     "Thảo dược",
//     "Châm cứu",
//     "Bấm huyệt",
//     "Dược liệu",
//     "Sức khỏe",
//     "Dinh dưỡng",
//     "Phòng bệnh",
//     "Trị liệu",
//     "Y học cổ truyền",
//   ]

//   // Sample blog posts
//   const featuredPosts: BlogPost[] = [
//     {
//       id: 1,
//       title: "10 Bài thuốc Đông y giúp tăng cường hệ miễn dịch trong mùa dịch",
//       excerpt: "Khám phá các bài thuốc cổ truyền giúp nâng cao sức đề kháng và phòng ngừa bệnh tật hiệu quả...",
//       content: "Nội dung chi tiết về các bài thuốc Đông y giúp tăng cường hệ miễn dịch...",
//       image: "/placeholder.svg?height=400&width=600&text=Bài thuốc tăng miễn dịch",
//       category: "Bài thuốc cổ truyền",
//       author: "TS. Nguyễn Văn A",
//       authorAvatar: "/placeholder.svg?height=40&width=40&text=NVA",
//       date: "15/04/2023",
//       readTime: "8 phút đọc",
//       tags: ["Đông y", "Bài thuốc", "Miễn dịch"],
//       featured: true,
//       upvotes: 156,
//       downvotes: 12,
//       comments: 24,
//     },
//     {
//       id: 2,
//       title: "Phương pháp châm cứu chữa đau lưng hiệu quả theo Y học cổ truyền",
//       excerpt:
//         "Tìm hiểu về các huyệt đạo và phương pháp châm cứu giúp giảm đau lưng mạn tính theo kinh nghiệm Y học cổ truyền...",
//       content: "Nội dung chi tiết về phương pháp châm cứu chữa đau lưng...",
//       image: "/placeholder.svg?height=400&width=600&text=Châm cứu đau lưng",
//       category: "Phương pháp chữa bệnh",
//       author: "ThS. Trần Thị B",
//       authorAvatar: "/placeholder.svg?height=40&width=40&text=TTB",
//       date: "02/05/2023",
//       readTime: "10 phút đọc",
//       tags: ["Châm cứu", "Đau lưng", "Y học cổ truyền"],
//       featured: true,
//       upvotes: 98,
//       downvotes: 5,
//       comments: 15,
//     },
//   ]

//   const recentPosts: BlogPost[] = [
//     {
//       id: 3,
//       title: "5 Loại trà thảo mộc giúp cải thiện giấc ngủ",
//       excerpt: "Khám phá các loại trà thảo mộc có tác dụng an thần, giúp dễ ngủ và ngủ sâu hơn...",
//       content: "Nội dung chi tiết về các loại trà thảo mộc giúp cải thiện giấc ngủ...",
//       image: "/placeholder.svg?height=300&width=400&text=Trà thảo mộc",
//       category: "Dược liệu quý",
//       author: "DS. Lê Văn C",
//       authorAvatar: "/placeholder.svg?height=40&width=40&text=LVC",
//       date: "10/06/2023",
//       readTime: "6 phút đọc",
//       tags: ["Thảo mộc", "Giấc ngủ", "Dược liệu"],
//       upvotes: 67,
//       downvotes: 3,
//       comments: 8,
//     },
//     {
//       id: 4,
//       title: "Cách chữa ho bằng mật ong và gừng theo Y học cổ truyền",
//       excerpt: "Bài thuốc dân gian đơn giản nhưng hiệu quả để điều trị ho, đau họng trong mùa lạnh...",
//       content: "Nội dung chi tiết về cách chữa ho bằng mật ong và gừng...",
//       image: "/placeholder.svg?height=300&width=400&text=Mật ong gừng",
//       category: "Kinh nghiệm dân gian",
//       author: "BS. Phạm Thị D",
//       authorAvatar: "/placeholder.svg?height=40&width=40&text=PTD",
//       date: "25/06/2023",
//       readTime: "5 phút đọc",
//       tags: ["Mật ong", "Gừng", "Ho", "Kinh nghiệm dân gian"],
//       upvotes: 87,
//       downvotes: 4,
//       comments: 12,
//     },
//     {
//       id: 5,
//       title: "Bấm huyệt chữa đau đầu - Phương pháp không dùng thuốc",
//       excerpt: "Hướng dẫn chi tiết các huyệt đạo và cách bấm huyệt để giảm đau đầu, đau nửa đầu...",
//       content: "Nội dung chi tiết về bấm huyệt chữa đau đầu...",
//       image: "/placeholder.svg?height=300&width=400&text=Bấm huyệt đau đầu",
//       category: "Phương pháp chữa bệnh",
//       author: "TS. Nguyễn Văn E",
//       authorAvatar: "/placeholder.svg?height=40&width=40&text=NVE",
//       date: "05/07/2023",
//       readTime: "7 phút đọc",
//       tags: ["Bấm huyệt", "Đau đầu", "Không dùng thuốc"],
//       upvotes: 45,
//       downvotes: 2,
//       comments: 6,
//     },
//     {
//       id: 6,
//       title: "Các loại thảo dược giúp hạ đường huyết tự nhiên",
//       excerpt: "Tìm hiểu về các loại thảo dược có tác dụng hỗ trợ điều trị tiểu đường và kiểm soát đường huyết...",
//       content: "Nội dung chi tiết về các loại thảo dược giúp hạ đường huyết...",
//       image: "/placeholder.svg?height=300&width=400&text=Thảo dược hạ đường huyết",
//       category: "Dược liệu quý",
//       author: "PGS.TS. Trần Văn F",
//       authorAvatar: "/placeholder.svg?height=40&width=40&text=TVF",
//       date: "18/07/2023",
//       readTime: "9 phút đọc",
//       tags: ["Thảo dược", "Đường huyết", "Tiểu đường"],
//       upvotes: 112,
//       downvotes: 8,
//       comments: 19,
//     },
//   ]

//   // Kết hợp tất cả bài viết
//   const allPosts = [...featuredPosts, ...recentPosts]

//   // Dữ liệu bài viết nổi bật
//   const featuredTopPosts: FeaturedPost[] = [
//     {
//       id: 101,
//       title: "Bài thuốc cổ truyền chữa đau khớp từ cây thuốc nam",
//       excerpt: "Phương pháp điều trị đau khớp hiệu quả từ các bài thuốc dân gian",
//       image: "/placeholder.svg?height=400&width=600&text=Bài thuốc đau khớp",
//       category: "r/baithuoc",
//       categorySlug: "bai-thuoc-co-truyen",
//       otherPosts: "và nhiều bài đăng khác",
//     },
//     {
//       id: 102,
//       title: "Kỹ thuật châm cứu mới trong điều trị đau thần kinh tọa",
//       excerpt: "Phương pháp châm cứu hiện đại kết hợp y học cổ truyền",
//       image: "/placeholder.svg?height=400&width=600&text=Châm cứu hiện đại",
//       category: "r/chamcuu",
//       categorySlug: "phuong-phap-chua-benh",
//       otherPosts: "và nhiều bài đăng khác",
//     },
//     {
//       id: 103,
//       title: "Thảo dược quý hiếm vùng Tây Bắc được công nhận",
//       excerpt: "Các loại thảo dược quý hiếm vùng Tây Bắc được công nhận giá trị y học",
//       image: "/placeholder.svg?height=400&width=600&text=Thảo dược Tây Bắc",
//       category: "r/duoclieu",
//       categorySlug: "duoc-lieu-quy",
//       otherPosts: "và nhiều bài đăng khác",
//     },
//     {
//       id: 104,
//       title: "Bác sĩ Đông y nổi tiếng chia sẻ bí quyết sống khỏe",
//       excerpt: "Những bí quyết sống khỏe từ vị bác sĩ Đông y có hơn 50 năm kinh nghiệm",
//       image: "/placeholder.svg?height=400&width=600&text=Bí quyết sống khỏe",
//       category: "r/dongy",
//       categorySlug: "kinh-nghiem-dan-gian",
//       otherPosts: "và nhiều bài đăng khác",
//     },
//   ]

//   // Lọc bài viết dựa trên các tiêu chí
//   useEffect(() => {
//     let results = [...allPosts]

//     // Lọc theo từ khóa tìm kiếm
//     if (searchTerm) {
//       results = results.filter(
//         (post) =>
//           post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           post.author.toLowerCase().includes(searchTerm.toLowerCase()),
//       )
//     }

//     // Lọc theo danh mục
//     if (activeCategory !== "Tất cả bài viết") {
//       results = results.filter((post) => post.category === activeCategory)
//     }

//     // Lọc theo tag
//     if (selectedTags.length > 0) {
//       results = results.filter((post) => post.tags?.some((tag) => selectedTags.includes(tag)))
//     }

//     // Sắp xếp kết quả
//     switch (sortBy) {
//       case "hot":
//         // Sắp xếp theo số upvote - downvote
//         results.sort((a, b) => {
//           const aScore = (a.upvotes || 0) - (a.downvotes || 0)
//           const bScore = (b.upvotes || 0) - (b.downvotes || 0)
//           return bScore - aScore
//         })
//         break
//       case "new":
//         // Giả định rằng ngày gần đây nhất có chỉ số ID cao hơn
//         results.sort((a, b) => b.id - a.id)
//         break
//       case "top":
//         // Sắp xếp theo số upvote
//         results.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0))
//         break
//       default:
//         break
//     }

//     setFilteredPosts(results)
//   }, [searchTerm, activeCategory, selectedTags, sortBy])

//   // Cập nhật URL khi thay đổi bộ lọc
//   const updateUrlParams = () => {
//     const params = new URLSearchParams()

//     if (searchTerm) params.set("search", searchTerm)
//     if (activeCategory !== "Tất cả bài viết") params.set("category", activeCategory)
//     if (sortBy !== "hot") params.set("sort", sortBy)
//     if (viewMode !== "compact") params.set("view", viewMode)

//     const newUrl = `${window.location.pathname}?${params.toString()}`
//     window.history.pushState({}, "", newUrl)
//   }

//   // Xử lý thay đổi danh mục
//   const handleCategoryChange = (value: string) => {
//     setActiveCategory(value)
//     updateUrlParams()
//   }

//   // Xử lý thay đổi tag
//   const handleTagChange = (tag: string) => {
//     setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
//   }

//   // Xử lý thay đổi chế độ xem
//   const handleViewModeChange = (mode: ViewMode) => {
//     setViewMode(mode)
//     updateUrlParams()
//   }

//   // Xử lý xóa bộ lọc
//   const clearFilters = () => {
//     setSearchTerm("")
//     setActiveCategory("Tất cả bài viết")
//     setSortBy("hot")
//     setSelectedTags([])
//     router.push("/blog")
//   }

//   // Dữ liệu quảng cáo
//   const sidebarAds = [
//     {
//       title: "Gói Sức Khỏe Xanh",
//       description: "Đăng ký gói khám sức khỏe toàn diện với các thầy lang hàng đầu",
//       image: "/placeholder.svg?height=200&width=300&text=Gói Sức Khỏe Xanh",
//       link: "/dang-ky/khach-hang?plan=premium",
//     },
//     {
//       title: "Thảo dược Đông Y chính hãng",
//       description: "Mua sắm các sản phẩm thảo dược được chứng nhận chất lượng",
//       image: "/placeholder.svg?height=200&width=300&text=Thảo dược Đông Y",
//       link: "/san-pham",
//     },
//     {
//       title: "Tư vấn sức khỏe trực tuyến",
//       description: "Đặt lịch tư vấn trực tuyến với các chuyên gia y học cổ truyền",
//       image: "/placeholder.svg?height=200&width=300&text=Tư vấn sức khỏe",
//       link: "/dat-lich",
//     },
//   ]

//   // Thông tin về cộng đồng
//   const communityInfo = {
//     name: "ĐôngYBlog",
//     description: "Cộng đồng chia sẻ kiến thức Đông y và y học cổ truyền Việt Nam",
//     members: 11254,
//     online: 342,
//     created: "10/08/2020",
//     rules: [
//       "Tôn trọng mọi người trong cộng đồng",
//       "Không quảng cáo trái phép",
//       "Chia sẻ thông tin có nguồn đáng tin cậy",
//       "Không chia sẻ thông tin y tế sai lệch",
//     ],
//   }

//   return (
//     <div className="container mx-auto px-4 py-6">
//       {/* <style jsx global>
//         {scrollbarHideStyle}
//       </style> */}

//       {/* Categories */}
//       <div className="mb-4 overflow-x-auto flex ">
//         <div className="flex space-x-2 pb-2">
//           {categories.map((category) => (
//             <Button
//               key={category}
//               variant={activeCategory === category ? "default" : "outline"}
//               size="sm"
//               onClick={() => handleCategoryChange(category)}
//               className={`whitespace-nowrap ${activeCategory === category ? "bg-green-700 hover:bg-green-800" : ""}`}
//             >
//               {category}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {isFiltering && (
//         <div className="mb-6 p-4 border rounded-md bg-gray-50">
//           <h3 className="font-medium mb-3">Lọc theo chủ đề</h3>
//           <div className="flex flex-wrap gap-3">
//             {availableTags.map((tag) => (
//               <div key={tag} className="flex items-center space-x-2">
//                 <Checkbox
//                   id={`tag-${tag}`}
//                   checked={selectedTags.includes(tag)}
//                   onCheckedChange={() => handleTagChange(tag)}
//                 />
//                 <label
//                   htmlFor={`tag-${tag}`}
//                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                 >
//                   {tag}
//                 </label>
//               </div>
//             ))}
//           </div>
//           <div className="mt-4 flex justify-end">
//             <Button variant="outline" size="sm" onClick={clearFilters}>
//               Xóa bộ lọc
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* Main Content with Sidebar */}
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Quảng Cáo - 1/4 width */}
//         <div className="w-full lg:w-1/4 space-y-4">
//           {/* Quảng cáo */}
//           {sidebarAds.map((ad, index) => (
//             <div key={index} className="bg-white rounded-md border overflow-hidden">
//               <div className="p-3 border-b">
//                 <span className="text-xs text-gray-500">Quảng cáo</span>
//               </div>
//               <div className="p-4">
//                 <img
//                   src={ad.image || "/placeholder.svg"}
//                   alt={ad.title}
//                   className="w-full h-32 object-cover rounded-md mb-3"
//                 />
//                 <h3 className="font-bold mb-2">{ad.title}</h3>
//                 <p className="text-sm text-gray-600 mb-3">{ad.description}</p>
//                 <Link href={ad.link}>
//                   <Button className="w-full bg-green-700 hover:bg-green-800">Tìm hiểu thêm</Button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="w-full lg:w-3/4 space-y-4">
//           {/* Featured Posts Slider */}
//           <div className="mb-6 overflow-hidden">
//             <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
//               {featuredTopPosts.map((post) => (
//                 <Link href={`/blog/${post.id}`} key={post.id} className="flex-shrink-0 w-[300px] relative group">
//                   <div className="relative h-[180px] rounded-lg overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10"></div>
//                     <img
//                       src={post.image || "/placeholder.svg"}
//                       alt={post.title}
//                       className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                     />
//                     <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
//                       <h3 className="font-bold text-lg mb-1 line-clamp-2">{post.title}</h3>
//                       <p className="text-sm text-gray-200 mb-2 line-clamp-1">{post.excerpt}</p>
//                       <div className="flex items-center text-xs">
//                         <div className="flex items-center">
//                           <div className="bg-white text-black rounded-full p-1 mr-2 flex items-center justify-center w-6 h-6">
//                             <span className="text-xs font-bold">r</span>
//                           </div>
//                           <span>{post.category}</span>
//                         </div>
//                         <span className="mx-1">•</span>
//                         <span>{post.otherPosts}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//             <div className="m-[8px] flex justify-end">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" size="sm" className="h-8 px-3 flex items-center gap-1">
//                     <span className="flex items-center gap-1">
//                       {viewMode === "card" ? (
//                         <>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="20"
//                             height="20"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             className="lucide lucide-layout-grid"
//                           >
//                             <rect width="7" height="7" x="3" y="3" rx="1" />
//                             <rect width="7" height="7" x="14" y="3" rx="1" />
//                             <rect width="7" height="7" x="14" y="14" rx="1" />
//                             <rect width="7" height="7" x="3" y="14" rx="1" />
//                           </svg>
//                           Thẻ
//                         </>
//                       ) : (
//                         <>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="20"
//                             height="20"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             className="lucide lucide-list"
//                           >
//                             <line x1="8" x2="21" y1="6" y2="6" />
//                             <line x1="8" x2="21" y1="12" y2="12" />
//                             <line x1="8" x2="21" y1="18" y2="18" />
//                             <line x1="3" x2="3.01" y1="6" y2="6" />
//                             <line x1="3" x2="3.01" y1="12" y2="12" />
//                             <line x1="3" x2="3.01" y1="18" y2="18" />
//                           </svg>
//                           Thu gọn
//                         </>
//                       )}
//                     </span>
//                     <ChevronDown className="h-4 w-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-40">
//                   <div className="p-1 text-sm font-medium text-gray-500 px-3 py-2 border-b">Chế độ xem</div>
//                   <DropdownMenuItem
//                     className={`flex items-center gap-2 px-3 py-2 cursor-pointer ${
//                       viewMode === "card" ? "bg-gray-100" : ""
//                     }`}
//                     onClick={() => handleViewModeChange("card")}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="lucide lucide-layout-grid"
//                     >
//                       <rect width="7" height="7" x="3" y="3" rx="1" />
//                       <rect width="7" height="7" x="14" y="3" rx="1" />
//                       <rect width="7" height="7" x="14" y="14" rx="1" />
//                       <rect width="7" height="7" x="3" y="14" rx="1" />
//                     </svg>
//                     <span>Thẻ</span>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     className={`flex items-center gap-2 px-3 py-2 cursor-pointer ${
//                       viewMode === "compact" ? "bg-gray-100" : ""
//                     }`}
//                     onClick={() => handleViewModeChange("compact")}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="lucide lucide-list"
//                     >
//                       <line x1="8" x2="21" y1="6" y2="6" />
//                       <line x1="8" x2="21" y1="12" y2="12" />
//                       <line x1="8" x2="21" y1="18" y2="18" />
//                       <line x1="3" x2="3.01" y1="6" y2="6" />
//                       <line x1="3" x2="3.01" y1="12" y2="12" />
//                       <line x1="3" x2="3.01" y1="18" y2="18" />
//                     </svg>
//                     <span>Thu gọn</span>
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
//           <div className="flex flex-col lg:flex-row gap-6">
//             {/* Main Content - 3/4 width */}
//             <div className="w-full lg:w-3/4">
//               {filteredPosts.length === 0 ? (
//                 <div className="text-center py-10 bg-white rounded-md shadow">
//                   <h3 className="text-xl font-medium mb-2">Không tìm thấy kết quả</h3>
//                   <p className="text-gray-500 mb-4">Vui lòng thử lại với từ khóa hoặc bộ lọc khác</p>
//                   <Button variant="outline" onClick={clearFilters}>
//                     Xóa bộ lọc
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {/* Posts in Card View */}
//                   {viewMode === "card" && (
//                     <div className="grid grid-cols-1 gap-4">
//                       {filteredPosts.map((post) => (
//                         <Card key={post.id} className="overflow-hidden hover:border-gray-400 transition-colors">
//                           <div className="flex">
//                             <div className="flex-1">
//                               <div className="p-4">
//                                 <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
//                                   <Avatar className="h-10 w-10">
//                                     <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
//                                     <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
//                                   </Avatar>
//                                   <span className="text-[16px]">
//                                     Đăng bởi {post.author.replace(/[^a-zA-Z0-9]/g, "")}
//                                   </span>
//                                   <span>•</span>
//                                   <span>{post.date}</span>
//                                   <Badge variant="outline" className="ml-auto text-xs font-normal">
//                                     {post.category}
//                                   </Badge>
//                                 </div>

//                                 <h3 className="text-lg font-bold mb-2">
//                                   <Link href={`/blog/${post.id}`} className="hover:text-green-700 transition-colors">
//                                     {post.title}
//                                   </Link>
//                                 </h3>

//                                 {post.image && (
//                                   <div className="mt-3 mb-4 bg-gray-100 rounded-md overflow-hidden">
//                                     <img
//                                       src={post.image || "/placeholder.svg"}
//                                       alt={post.title}
//                                       className="w-full object-cover max-h-96"
//                                     />
//                                   </div>
//                                 )}

//                                 <p className="text-gray-700 mb-4">{post.excerpt}</p>

//                                 <div className="flex items-center gap-4 text-gray-500">
//                                   <CommentDialog
//                                     postId={post.id}
//                                     postTitle={post.title}
//                                     commentsCount={post.comments || 0}
//                                   />
//                                   <ShareDialog postId={post.id} postTitle={post.title} />
//                                   <ReportDialog postId={post.id} postTitle={post.title} />
//                                   <DropdownMenu>
//                                     <DropdownMenuTrigger asChild>
//                                       <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
//                                         <MoreHorizontal className="h-4 w-4" />
//                                       </Button>
//                                     </DropdownMenuTrigger>
//                                     <DropdownMenuContent align="end">
//                                       <DropdownMenuItem>Lưu bài viết</DropdownMenuItem>
//                                       <DropdownMenuItem>Ẩn bài viết</DropdownMenuItem>
//                                       <DropdownMenuItem>Theo dõi</DropdownMenuItem>
//                                     </DropdownMenuContent>
//                                   </DropdownMenu>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Card>
//                       ))}
//                     </div>
//                   )}

//                   {/* Posts in Compact View */}
//                   {viewMode === "compact" && (
//                     <div className="space-y-1">
//                       {filteredPosts.map((post) => (
//                         <div
//                           key={post.id}
//                           className="flex bg-white hover:bg-gray-50 rounded-md border p-2 transition-colors"
//                         >
//                           {/* Thumbnail */}
//                           {post.image && (
//                             <div className="w16 h-24 bg-gray-100 rounded overflow-hidden mr-3 flex-shrink-0">
//                               <img
//                                 src={post.image || "/placeholder.svg"}
//                                 alt={post.title}
//                                 className="w-full h-full object-cover"
//                               />
//                             </div>
//                           )}

//                           {/* Content */}
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center gap-2 mb-1 text-xs text-gray-500">
//                               <Avatar className="h-4 w-4">
//                                 <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
//                                 <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
//                               </Avatar>
//                               <span>u/{post.author.replace(/[^a-zA-Z0-9]/g, "")}</span>
//                               <span>•</span>
//                               <span>{post.date}</span>
//                               <Badge variant="outline" className="text-xs font-normal">
//                                 {post.category}
//                               </Badge>
//                             </div>

//                             <h3 className="text-base font-medium mb-1">
//                               <Link href={`/blog/${post.id}`} className="hover:text-green-700 transition-colors">
//                                 {post.title}
//                               </Link>
//                             </h3>

//                             <div className="flex items-center gap-3 text-xs text-gray-500">
//                               <CommentDialog
//                                 postId={post.id}
//                                 postTitle={post.title}
//                                 commentsCount={post.comments || 0}
//                                 trigger={
//                                   <Button
//                                     variant="ghost"
//                                     size="sm"
//                                     className="h-6 text-xs p-0 hover:bg-transparent hover:text-gray-700 flex items-center gap-1"
//                                   >
//                                     <MessageSquare className="h-3 w-3" />
//                                     <span>{post.comments} bình luận</span>
//                                   </Button>
//                                 }
//                               />
//                               <ShareDialog
//                                 postId={post.id}
//                                 postTitle={post.title}
//                                 trigger={
//                                   <Button
//                                     variant="ghost"
//                                     size="sm"
//                                     className="h-6 text-xs p-0 hover:bg-transparent hover:text-gray-700"
//                                   >
//                                     Chia sẻ
//                                   </Button>
//                                 }
//                               />
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 className="h-6 text-xs p-0 hover:bg-transparent hover:text-gray-700"
//                               >
//                                 Lưu
//                               </Button>
//                               <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                   <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
//                                     <MoreHorizontal className="h-3 w-3" />
//                                   </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent align="end">
//                                   <DropdownMenuItem>
//                                     <ReportDialog
//                                       postId={post.id}
//                                       postTitle={post.title}
//                                       trigger={<div className="w-full">Báo cáo</div>}
//                                     />
//                                   </DropdownMenuItem>
//                                   <DropdownMenuItem>Ẩn</DropdownMenuItem>
//                                 </DropdownMenuContent>
//                               </DropdownMenu>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   <div className="mt-6 text-center">
//                     <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
//                       Xem thêm bài viết
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Cộng đồng - 1/4 width */}
//             <div className="w-full lg:w-1/4 space-y-4">
//               {/* Thông tin cộng đồng */}
//               <div className="bg-white rounded-md border overflow-hidden">
//                 <div className="bg-green-700 h-12"></div>
//                 <div className="p-4">
//                   <h3 className="font-bold text-lg mb-2">{communityInfo.name}</h3>
//                   <p className="text-sm text-gray-600 mb-4">{communityInfo.description}</p>

//                   <div className="flex items-center justify-between mb-4 text-sm">
//                     <div>
//                       <div className="font-bold">{communityInfo.members}</div>
//                       <div className="text-gray-500">Thành viên</div>
//                     </div>
//                     <div>
//                       <div className="font-bold">{communityInfo.online.toLocaleString()}</div>
//                       <div className="text-gray-500">Trực tuyến</div>
//                     </div>
//                     <div>
//                       <div className="font-bold">1%</div>
//                       <div className="text-gray-500">Hạng đầu</div>
//                     </div>
//                   </div>

//                   <Button className="w-full bg-green-700 hover:bg-green-800 mb-2">Tham gia</Button>
//                 </div>
//               </div>

//               {/* Quy tắc cộng đồng */}
//               <div className="bg-white rounded-md border overflow-hidden">
//                 <div className="p-3 border-b">
//                   <h3 className="font-medium">Quy tắc cộng đồng</h3>
//                 </div>
//                 <div className="p-4">
//                   <ol className="list-decimal list-inside space-y-2 text-sm">
//                     {communityInfo.rules.map((rule, index) => (
//                       <li key={index} className="text-gray-700">
//                         {rule}
//                       </li>
//                     ))}
//                   </ol>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Clock, Mail, AlertCircle, ArrowRight, Tag, User } from 'lucide-react'
import { useState } from "react"

export default function BlogPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log("Email submitted:", email)
    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog LangConnect</h1>
          <p className="text-lg text-muted-foreground">Kiến thức y học cổ truyền & Sức khỏe toàn diện</p>
        </div>

        {/* Main Content */}
        <div className="grid gap-10">
          {/* Coming Soon Message */}
          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 md:p-12 text-center">
                <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100">
                  <BookOpen className="h-10 w-10 text-blue-600" />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Dịch vụ đang trong quá trình phát triển</h2>
                
                <div className="flex items-center justify-center mb-6">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                  <p className="text-amber-700 font-medium">Rất tiếc, dịch vụ blog chưa được cung cấp</p>
                </div>
                
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Chúng tôi đang nỗ lực xây dựng kho tàng kiến thức y học cổ truyền phong phú và hữu ích. 
                  Blog sẽ sớm ra mắt với nhiều bài viết chất lượng từ các chuyên gia hàng đầu.
                </p>
                
                {/* Notification Form */}
                <div className="max-w-md mx-auto">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <Input
                          type="email"
                          placeholder="Nhập email của bạn"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-11 bg-white"
                        />
                      </div>
                      <Button type="submit" className="h-11">
                        Thông báo khi ra mắt
                      </Button>
                    </form>
                  ) : (
                    <div className="bg-green-50 text-green-700 p-4 rounded-md">
                      Cảm ơn bạn! Chúng tôi sẽ thông báo khi blog ra mắt.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Categories Preview */}
          <div>
            <h3 className="text-xl font-bold mb-6">Chủ đề sắp có</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Y học cổ truyền", "Thảo dược", "Dinh dưỡng", "Sức khỏe tinh thần", "Châm cứu", "Bài thuốc", "Phòng bệnh", "Lối sống"].map((category, index) => (
                <Card key={index} className="group cursor-not-allowed">
                  <CardContent className="p-4 text-center">
                    <div className="text-muted-foreground mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
                      {category}
                    </div>
                    <Separator className="bg-muted" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Câu hỏi thường gặp</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Khi nào blog sẽ ra mắt?</h4>
                  <p className="text-muted-foreground text-sm">Blog dự kiến sẽ ra mắt trong quý tới. Chúng tôi đang tích cực chuẩn bị nội dung chất lượng.</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Nội dung blog sẽ bao gồm những gì?</h4>
                  <p className="text-muted-foreground text-sm">Blog sẽ cung cấp kiến thức về y học cổ truyền, bài thuốc, phương pháp điều trị, lời khuyên sức khỏe từ các chuyên gia hàng đầu.</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Làm thế nào để được thông báo khi blog ra mắt?</h4>
                  <p className="text-muted-foreground text-sm">Bạn có thể đăng ký nhận thông báo qua email bằng cách điền thông tin vào form phía trên.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
