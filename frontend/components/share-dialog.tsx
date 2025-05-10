"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Share2, Copy, Facebook, Twitter, Linkedin, Mail } from "lucide-react"

interface ShareDialogProps {
  postId: number
  postTitle: string
  trigger?: React.ReactNode
}

export function ShareDialog({ postId, postTitle, trigger }: ShareDialogProps) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  // Tạo URL chia sẻ
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/blog/${postId}` : ""

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "Đã sao chép",
      description: "Đường dẫn đã được sao chép vào clipboard",
    })
  }

  const handleShare = (platform: string) => {
    let shareLink = ""

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl,
        )}&text=${encodeURIComponent(postTitle)}`
        break
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      case "email":
        shareLink = `mailto:?subject=${encodeURIComponent(postTitle)}&body=${encodeURIComponent(
          `Xem bài viết này: ${shareUrl}`,
        )}`
        break
      default:
        break
    }

    if (shareLink) {
      window.open(shareLink, "_blank")
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 hover:bg-gray-100">
            <Share2 className="h-4 w-4" />
            Chia sẻ
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chia sẻ bài viết</DialogTitle>
          <DialogDescription>Chia sẻ bài viết này với bạn bè và mạng xã hội</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4 justify-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700"
              onClick={() => handleShare("facebook")}
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Chia sẻ lên Facebook</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 bg-blue-100 text-blue-500 hover:bg-blue-200 hover:text-blue-600"
              onClick={() => handleShare("twitter")}
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Chia sẻ lên Twitter</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800"
              onClick={() => handleShare("linkedin")}
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">Chia sẻ lên LinkedIn</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700"
              onClick={() => handleShare("email")}
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Chia sẻ qua Email</span>
            </Button>
          </div>

          <div className="relative mt-2">
            <div className="flex items-center">
              <Input value={shareUrl} readOnly className="pr-20" />
              <Button type="button" variant="ghost" size="sm" className="absolute right-1 h-7" onClick={handleCopyLink}>
                <Copy className="h-4 w-4 mr-1" />
                Sao chép
              </Button>
            </div>
          </div>

          <div className="text-xs text-gray-500 text-center mt-2">
            Hoặc chia sẻ đường dẫn trực tiếp đến bài viết này
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
