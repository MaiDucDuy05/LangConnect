"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Clock, ChevronLeft, ChevronRight, Bookmark, MoreHorizontal, ArrowUp, ArrowDown, Reply } from "lucide-react"
import { ShareDialog } from "@/components/share-dialog"
import { ReportDialog } from "@/components/report-dialog"

// Định nghĩa kiểu dữ liệu cho bình luận
interface Comment {
  id: number
  author: string
  authorAvatar?: string
  content: string
  date: string
  upvotes: number
  downvotes: number
  replies?: Comment[]
}

// Giả lập dữ liệu bài viết
const getBlogPost = (id: string) => {
  return {
    id,
    title: "10 Bài thuốc Đông y giúp tăng cường hệ miễn dịch trong mùa dịch",
    content: `
      <p>Trong y học cổ truyền, việc tăng cường hệ miễn dịch luôn được coi là nền tảng quan trọng để phòng ngừa bệnh tật. Đặc biệt trong mùa dịch, các bài thuốc Đông y có thể hỗ trợ đắc lực cho việc nâng cao sức đề kháng của cơ thể.</p>
      
      <h2>1. Trà Hoàng Kỳ - Đương Quy</h2>
      <p>Hoàng Kỳ và Đương Quy là hai vị thuốc quý trong Đông y, có tác dụng bổ khí, tăng cường miễn dịch và cải thiện tuần hoàn máu. Kết hợp hai vị thuốc này với một chút gừng tươi và táo đỏ sẽ tạo nên một thức uống thơm ngon, bổ dưỡng.</p>
      <p>Cách dùng: Hoàng Kỳ 15g, Đương Quy 10g, Gừng tươi 5g, Táo đỏ 5 quả. Đun sôi với 1 lít nước trong 30 phút, uống thay trà hàng ngày.</p>
      
      <h2>2. Cháo Bát Trân</h2>
      <p>Bát Trân là phương thuốc cổ gồm 8 vị: Nhân sâm, Bạch truật, Phục linh, Cam thảo, Đương quy, Bạch thược, Xuyên khung và Địa hoàng. Đây là bài thuốc bổ khí huyết toàn diện, giúp tăng cường sức đề kháng.</p>
      <p>Cách dùng: Nấu các vị thuốc với gạo thành cháo, ăn mỗi sáng.</p>
      
      <h2>3. Trà Linh Chi - Đông Trùng Hạ Thảo</h2>
      <p>Nấm linh chi và đông trùng hạ thảo là hai dược liệu quý, có tác dụng tăng cường miễn dịch, chống oxy hóa và làm chậm quá trình lão hóa.</p>
      <p>Cách dùng: Linh chi 10g, Đông trùng hạ thảo 5g, hãm với nước sôi 15 phút, uống hàng ngày.</p>
      
      <h2>4. Chè Dưỡng Sinh</h2>
      <p>Bài thuốc này kết hợp nhiều loại hạt và dược liệu như hạt sen, ý dĩ, táo đỏ, kỷ tử, long nhãn... giúp bổ tỳ, dưỡng khí, tăng cường sức đề kháng.</p>
      <p>Cách dùng: Nấu các nguyên liệu với đường phèn, dùng như món tráng miệng.</p>
      
      <h2>5. Rượu Thuốc Bổ</h2>
      <p>Rượu thuốc bổ từ các vị thuốc như đinh lăng, sâm ngọc linh, ba kích, dâm dương hoắc... có tác dụng bổ khí, tráng dương, tăng cường sức đề kháng.</p>
      <p>Cách dùng: Ngâm các vị thuốc với rượu trắng trong 3 tháng, uống mỗi ngày 1 chén nhỏ.</p>
      
      <h2>6. Trà Sâm Ngọc Linh</h2>
      <p>Sâm Ngọc Linh là loại nhân sâm quý của Việt Nam, có tác dụng bổ khí, tăng cường miễn dịch, chống mệt mỏi.</p>
      <p>Cách dùng: Sâm Ngọc Linh 5g, hãm với nước sôi 10 phút, uống hàng ngày.</p>
      
      <h2>7. Cháo Hạt Sen - Bạch Truật</h2>
      <p>Hạt sen và bạch truật có tác dụng bổ tỳ, an thần, tăng cường sức đề kháng.</p>
      <p>Cách dùng: Nấu hạt sen và bạch truật với gạo thành cháo, ăn mỗi sáng.</p>
      
      <h2>8. Trà Đảng Sâm - Kỷ Tử</h2>
      <p>Đảng sâm và kỷ tử có tác dụng bổ khí, dưỡng huyết, tăng cường miễn dịch.</p>
      <p>Cách dùng: Đảng sâm 10g, Kỷ tử 15g, hãm với nước sôi 15 phút, uống hàng ngày.</p>
      
      <h2>9. Canh Gà Đen Thuốc Bắc</h2>
      <p>Gà đen kết hợp với các vị thuốc bắc như đương quy, hoàng kỳ, đảng sâm... tạo thành món ăn bổ dưỡng, tăng cường sức đề kháng.</p>
      <p>Cách dùng: Nấu gà đen với các vị thuốc thành canh, ăn 2-3 lần/tuần.</p>
      
      <h2>10. Trà Atiso - Hoa Cúc</h2>
      <p>Atiso và hoa cúc có tác dụng thanh nhiệt, giải độc, tăng cường chức năng gan, từ đó giúp nâng cao sức đề kháng.</p>
      <p>Cách dùng: Atiso 10g, Hoa cúc 5g, hãm với nước sôi 10 phút, uống hàng ngày.</p>
      
      <p>Lưu ý: Các bài thuốc trên chỉ có tác dụng hỗ trợ, tăng cường sức đề kháng. Trong trường hợp đã mắc bệnh, cần tham khảo ý kiến của thầy thuốc.</p>
    `,
    excerpt: "Khám phá các bài thuốc cổ truyền giúp nâng cao sức đề kháng và phòng ngừa bệnh tật hiệu quả...",
    image: "/placeholder.svg?height=600&width=1200&text=Bài thuốc tăng miễn dịch",
    category: "Bài thuốc cổ truyền",
    author: "TS. Nguyễn Văn A",
    authorImage: "/placeholder.svg?height=100&width=100&text=TS.A",
    date: "15/04/2023",
    readTime: "8 phút đọc",
    tags: ["miễn dịch", "đông y", "bài thuốc", "sức khỏe", "phòng bệnh"],
    upvotes: 156,
    downvotes: 12,
    comments: 24,
  }
}

// Giả lập dữ liệu bài viết liên quan
const getRelatedPosts = () => {
  return [
    {
      id: 2,
      title: "Phương pháp châm cứu chữa đau lưng hiệu quả theo Y học cổ truyền",
      image: "/placeholder.svg?height=100&width=150&text=Châm cứu",
      category: "Phương pháp chữa bệnh",
      date: "02/05/2023",
    },
    {
      id: 3,
      title: "5 Loại trà thảo mộc giúp cải thiện giấc ngủ",
      image: "/placeholder.svg?height=100&width=150&text=Trà thảo mộc",
      category: "Dược liệu quý",
      date: "10/06/2023",
    },
    {
      id: 4,
      title: "Cách chữa ho bằng mật ong và gừng theo Y học cổ truyền",
      image: "/placeholder.svg?height=100&width=150&text=Mật ong gừng",
      category: "Kinh nghiệm dân gian",
      date: "25/06/2023",
    },
  ]
}

// Giả lập dữ liệu quảng cáo
const getSidebarAds = () => {
  return [
    {
      title: "Gói Sức Khỏe Xanh",
      description: "Đăng ký gói khám sức khỏe toàn diện với các thầy lang hàng đầu",
      image: "/placeholder.svg?height=200&width=300&text=Gói Sức Khỏe Xanh",
      link: "/dang-ky/khach-hang?plan=premium",
    },
    {
      title: "Thảo dược Đông Y chính hãng",
      description: "Mua sắm các sản phẩm thảo dược được chứng nhận chất lượng",
      image: "/placeholder.svg?height=200&width=300&text=Thảo dược Đông Y",
      link: "/san-pham",
    },
  ]
}

// Giả lập dữ liệu bình luận
const getComments = () => {
  return [
    {
      id: 1,
      author: "NguyenVanA",
      authorAvatar: "/placeholder.svg?height=40&width=40&text=NVA",
      content: "Bài viết rất hữu ích. Tôi đã áp dụng bài thuốc số 3 và thấy sức khỏe cải thiện rõ rệt.",
      date: "2 giờ trước",
      upvotes: 15,
      downvotes: 1,
      replies: [
        {
          id: 4,
          author: "TranThiB",
          authorAvatar: "/placeholder.svg?height=40&width=40&text=TTB",
          content: "Bạn dùng trong bao lâu thì thấy hiệu quả vậy?",
          date: "1 giờ trước",
          upvotes: 3,
          downvotes: 0,
        },
        {
          id: 5,
          author: "NguyenVanA",
          authorAvatar: "/placeholder.svg?height=40&width=40&text=NVA",
          content: "Mình dùng khoảng 2 tuần là thấy hiệu quả rõ rệt rồi.",
          date: "45 phút trước",
          upvotes: 2,
          downvotes: 0,
        },
      ],
    },
    {
      id: 2,
      author: "LeDinhC",
      authorAvatar: "/placeholder.svg?height=40&width=40&text=LDC",
      content:
        "Tôi thấy bài thuốc số 7 khá giống với phương pháp mà ông bà tôi vẫn dùng. Đúng là y học cổ truyền có nhiều điều quý giá cần được bảo tồn.",
      date: "3 giờ trước",
      upvotes: 8,
      downvotes: 0,
    },
    {
      id: 3,
      author: "PhamVanD",
      authorAvatar: "/placeholder.svg?height=40&width=40&text=PVD",
      content:
        "Xin hỏi tác giả, liệu những người bị tiểu đường có dùng được bài thuốc số 10 không? Tôi đang tìm cách hỗ trợ điều trị cho bố tôi.",
      date: "5 giờ trước",
      upvotes: 6,
      downvotes: 0,
    },
  ]
}

// Thông tin về cộng đồng
const communityInfo = {
  name: "ĐôngYBlog",
  description: "Cộng đồng chia sẻ kiến thức Đông y và y học cổ truyền Việt Nam",
  members: 11254,
  online: 342,
  created: "10/08/2020",
  rules: [
    "Tôn trọng mọi người trong cộng đồng",
    "Không quảng cáo trái phép",
    "Chia sẻ thông tin có nguồn đáng tin cậy",
    "Không chia sẻ thông tin y tế sai lệch",
  ],
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const {id} = use(params); 
  const post = getBlogPost(id)
  const relatedPosts = getRelatedPosts()
  const sidebarAds = getSidebarAds()

  const [comments, setComments] = useState<Comment[]>(getComments())
  const [commentText, setCommentText] = useState("")
  const [replyText, setReplyText] = useState<Record<number, string>>({})
  const [replyingTo, setReplyingTo] = useState<number | null>(null)



  const handleReply = (commentId: number) => {
    setReplyingTo(replyingTo === commentId ? null : commentId)
    setReplyText((prev) => ({ ...prev, [commentId]: prev[commentId] || "" }))
  }

  const submitReply = (commentId: number) => {
    if (!replyText[commentId]?.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập nội dung bình luận",
        variant: "destructive",
      })
      return
    }

    // Tìm comment cần reply
    const updatedComments = [...comments]
    const commentIndex = updatedComments.findIndex((c) => c.id === commentId)

    if (commentIndex !== -1) {
      // Nếu comment chưa có replies, tạo mảng rỗng
      if (!updatedComments[commentIndex].replies) {
        updatedComments[commentIndex].replies = []
      }

      // Thêm reply mới
      const newReply: Comment = {
        id: Date.now(), // Tạo ID duy nhất
        author: "CurrentUser", // Giả định người dùng hiện tại
        authorAvatar: "/placeholder.svg?height=40&width=40&text=CU",
        content: replyText[commentId],
        date: "Vừa xong",
        upvotes: 0,
        downvotes: 0,
      }

      updatedComments[commentIndex].replies!.push(newReply)
      setComments(updatedComments)
      setReplyText((prev) => ({ ...prev, [commentId]: "" }))
      setReplyingTo(null)

      toast({
        title: "Thành công",
        description: "Đã thêm phản hồi của bạn",
      })
    }
  }

  const submitComment = () => {
    if (!commentText.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập nội dung bình luận",
        variant: "destructive",
      })
      return
    }

    const newComment: Comment = {
      id: Date.now(), // Tạo ID duy nhất
      author: "CurrentUser", // Giả định người dùng hiện tại
      authorAvatar: "/placeholder.svg?height=40&width=40&text=CU",
      content: commentText,
      date: "Vừa xong",
      upvotes: 0,
      downvotes: 0,
    }

    setComments([newComment, ...comments])
    setCommentText("")

    toast({
      title: "Thành công",
      description: "Đã thêm bình luận của bạn",
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content - 3/4 width */}
        <div className="w-full lg:w-3/4">
          <Card className="mb-6">
            <CardContent className="p-0">
              {/* Voting and Content */}
              <div className="flex">
               
                {/* Content */}
                <div className="flex-1 p-6">
                  {/* Breadcrumb */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Link href="/" className="hover:text-green-700">
                      Trang chủ
                    </Link>
                    <span className="mx-2">/</span>
                    <Link href="/blog" className="hover:text-green-700">
                      blog
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-700">{post.title}</span>
                  </div>

                  {/* Post Header */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                      <Avatar className="h-[36px] w-[36px]">
                        <AvatarImage src={post.authorImage || "/placeholder.svg"} alt={post.author} />
                        <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-[14px]">Đăng bởi {post.author.replace(/[^a-zA-Z0-9]/g, "")}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                      <Badge variant="outline" className="ml-auto text-xs font-normal">
                        {post.category}
                      </Badge>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center text-gray-500 mb-4">
                      <div className="flex items-center mr-4 mb-2">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Featured Image */}
                  <div className="mb-6 rounded-lg overflow-hidden">
                    <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-auto" />
                  </div>

                  {/* Content */}
                  <div
                    className="prose prose-green max-w-none mb-6"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Tags */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog/tag/${tag}`}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-4">Chia sẻ:</span>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                        >
                          <span className="sr-only">Facebook</span>
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              fillRule="evenodd"
                              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200"
                        >
                          <span className="sr-only">Twitter</span>
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                        >
                          <span className="sr-only">WhatsApp</span>
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <ShareDialog postId={Number.parseInt(id)} postTitle={post.title} />
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Bookmark className="h-4 w-4 mr-2" />
                        <span>Lưu</span>
                      </Button>
                      <ReportDialog postId={Number.parseInt(id)} postTitle={post.title} />
                    </div>
                  </div>

                  {/* Author Bio */}
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <div className="flex items-start">
                      <div className="w-16 h-16 rounded-full bg-gray-200 mr-4">
                        <img
                          src={post.authorImage || "/placeholder.svg"}
                          alt={post.author}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{post.author}</h3>
                        <p className="text-gray-600 mb-3">
                          Tiến sĩ Y học cổ truyền với hơn 20 năm kinh nghiệm trong lĩnh vực nghiên cứu và ứng dụng các
                          bài thuốc Đông y vào việc phòng và chữa bệnh.
                        </p>
                        <Button variant="outline" size="sm">
                          Xem tất cả bài viết
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Bình luận ({comments.length})</h2>

              {/* Comment Form */}
              <div className="mb-6">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40&text=CU" alt="Current User" />
                    <AvatarFallback>CU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Viết bình luận của bạn..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="resize-none mb-2"
                    />
                    <Button onClick={submitComment}>Đăng bình luận</Button>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="space-y-4">
                    <div className="flex gap-3">
                

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} alt={comment.author} />
                            <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{comment.author}</span>
                          <span className="text-xs text-gray-500">{comment.date}</span>
                        </div>

                        <div className="text-sm mb-2">{comment.content}</div>

                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs p-0 hover:bg-transparent hover:text-gray-700"
                            onClick={() => handleReply(comment.id)}
                          >
                            <Reply className="h-3 w-3 mr-1" />
                            Phản hồi
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Báo cáo</DropdownMenuItem>
                              <DropdownMenuItem>Ẩn</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Form phản hồi */}
                        {replyingTo === comment.id && (
                          <div className="mt-3 ml-6 flex gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?height=40&width=40&text=CU" alt="Current User" />
                              <AvatarFallback>CU</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <Textarea
                                placeholder={`Phản hồi cho ${comment.author}...`}
                                value={replyText[comment.id] || ""}
                                onChange={(e) => setReplyText((prev) => ({ ...prev, [comment.id]: e.target.value }))}
                                className="resize-none text-sm min-h-[80px] mb-2"
                              />
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => submitReply(comment.id)}>
                                  Phản hồi
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setReplyingTo(null)
                                    setReplyText((prev) => ({ ...prev, [comment.id]: "" }))
                                  }}
                                >
                                  Hủy
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Phản hồi cho bình luận */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-10 space-y-4 border-l-2 border-gray-100 pl-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3">

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Avatar className="h-5 w-5">
                                  <AvatarImage src={reply.authorAvatar || "/placeholder.svg"} alt={reply.author} />
                                  <AvatarFallback>{reply.author.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-xs">{reply.author}</span>
                                <span className="text-xs text-gray-500">{reply.date}</span>
                              </div>

                              <div className="text-sm mb-2">{reply.content}</div>

                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-5 text-xs p-0 hover:bg-transparent hover:text-gray-700"
                                  onClick={() => handleReply(comment.id)}
                                >
                                  <Reply className="h-3 w-3 mr-1" />
                                  Phản hồi
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                      <MoreHorizontal className="h-3 w-3" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Báo cáo</DropdownMenuItem>
                                    <DropdownMenuItem>Ẩn</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1/4 width */}
        <div className="w-full lg:w-1/4 space-y-4">
          {/* Thông tin cộng đồng */}
          <div className="bg-white rounded-md border overflow-hidden">
            <div className="bg-green-700 h-12"></div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{communityInfo.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{communityInfo.description}</p>

              <div className="flex items-center justify-between mb-4 text-sm">
                <div>
                  <div className="font-bold">{communityInfo.members}</div>
                  <div className="text-gray-500">Thành viên</div>
                </div>
                <div>
                  <div className="font-bold">{communityInfo.online.toLocaleString()}</div>
                  <div className="text-gray-500">Trực tuyến</div>
                </div>
                <div>
                  <div className="font-bold">1%</div>
                  <div className="text-gray-500">Hạng đầu</div>
                </div>
              </div>

              <Button className="w-full bg-green-700 hover:bg-green-800 mb-2">Tham gia</Button>
            </div>
          </div>

          {/* Bài viết liên quan */}
          <div className="bg-white rounded-md border overflow-hidden">
            <div className="p-3 border-b">
              <h3 className="font-medium">Bài viết liên quan</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/blog/${relatedPost.id}`}
                        className="font-medium text-sm hover:text-green-700 line-clamp-2"
                      >
                        {relatedPost.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Badge variant="outline" className="text-xs font-normal">
                          {relatedPost.category}
                        </Badge>
                        <span>•</span>
                        <span>{relatedPost.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quy tắc cộng đồng */}
          <div className="bg-white rounded-md border overflow-hidden">
            <div className="p-3 border-b">
              <h3 className="font-medium">Quy tắc cộng đồng</h3>
            </div>
            <div className="p-4">
              <ol className="list-decimal list-inside space-y-2 text-sm">
                {communityInfo.rules.map((rule, index) => (
                  <li key={index} className="text-gray-700">
                    {rule}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation between posts */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" className="flex items-center" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <Button variant="outline" className="flex items-center" onClick={() => router.push("/blog")}>
          Xem tất cả bài viết
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}


