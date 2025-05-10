import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MessageSquare, ThumbsUp, ChevronRight, Facebook, Twitter, Linkedin, Copy } from "lucide-react"
import Link from "next/link"
import  {getArticleById} from "@/database/article"


export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  const article = getArticleById(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <Link href="/kien-thuc" className="hover:text-green-700">
          Kiến Thức
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/kien-thuc?category=${article?.category}`} className="hover:text-green-700">
          {article?.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 truncate max-w-[200px]">{article?.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Article Header */}
            <div className="relative h-[300px] md:h-[400px]">
              <img
                src={article?.image || "/placeholder.svg"}
                alt={article?.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-8">
              {/* Category & Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-green-100 text-green-700">{article?.category}</Badge>
                {article?.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{article?.title}</h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
                <div className="flex items-center mr-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{article?.publishDate}</span>
                </div>
                <div className="flex items-center mr-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{article?.readTime}</span>
                </div>
  
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{article?.likes} thích</span>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article?.content || "" }} />
              {/* Share Buttons */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium mb-4">Chia sẻ bài viết</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-sky-50 text-sky-500 hover:bg-sky-100"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">

          {/* Related Articles */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Bài viết liên quan</h3>
              <div className="space-y-4">
                {article?.relatedArticles?.map((relatedArticle) => (
                  <div key={relatedArticle.id} className="flex gap-4">
                    <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={relatedArticle.image || "/placeholder.svg"}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/kien-thuc/${relatedArticle.id}`}
                        className="font-medium hover:text-green-700 line-clamp-2"
                      >
                        {relatedArticle.title}
                      </Link>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{relatedArticle.publishDate}</span>
                      </div>
                      <Badge className="mt-2 bg-gray-100 text-gray-700 hover:bg-gray-200">
                        {relatedArticle.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href="/kien-thuc"
                  className="text-green-700 hover:text-green-800 flex items-center text-sm font-medium"
                >
                  Xem tất cả bài viết
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Chủ đề phổ biến</h3>
              <div className="flex flex-wrap gap-2">
                {article?.tags
                  .concat(["Y học cổ truyền", "Sức khỏe", "Thảo dược", "Châm cứu", "Dinh dưỡng", "Bài thuốc dân gian"])
                  .map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50 hover:bg-gray-100">
                      {tag}
                    </Badge>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

