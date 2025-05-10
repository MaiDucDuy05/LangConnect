"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Reply, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

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

interface CommentDialogProps {
  postId: number
  postTitle: string
  commentsCount: number
  trigger?: React.ReactNode
}

export function CommentDialog({ postId, postTitle, commentsCount, trigger }: CommentDialogProps) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [replyText, setReplyText] = useState<Record<number, string>>({})
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  // Giả lập dữ liệu bình luận
  const [comments, setComments] = useState<Comment[]>([
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
  ])


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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 hover:bg-gray-100">
            <MessageSquare className="h-4 w-4" />
            {commentsCount} bình luận
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bình luận</DialogTitle>
          <DialogDescription>Bài viết: {postTitle}</DialogDescription>
        </DialogHeader>

        {/* Form thêm bình luận */}
        <div className="space-y-4 mt-4">
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

          <div className="border-t pt-4">
            <h4 className="font-medium mb-4">Tất cả bình luận ({comments.length})</h4>

            {/* Danh sách bình luận */}
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
