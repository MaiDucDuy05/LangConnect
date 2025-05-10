"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Flag } from "lucide-react"

interface ReportDialogProps {
  postId: number
  postTitle: string
  trigger?: React.ReactNode
}

export function ReportDialog({ postId, postTitle, trigger }: ReportDialogProps) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [details, setDetails] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!reason) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn lý do báo cáo",
        variant: "destructive",
      })
      return
    }

    // Xử lý gửi báo cáo (giả lập)
    console.log("Báo cáo bài viết:", { postId, reason, details })

    toast({
      title: "Đã gửi báo cáo",
      description: "Cảm ơn bạn đã báo cáo. Chúng tôi sẽ xem xét nội dung này.",
    })

    setOpen(false)
    setReason("")
    setDetails("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 hover:bg-gray-100">
            <Flag className="h-4 w-4" />
            Báo cáo
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Báo cáo bài viết</DialogTitle>
            <DialogDescription>
              Hãy cho chúng tôi biết lý do bạn báo cáo bài viết này. Báo cáo của bạn sẽ được gửi đến quản trị viên để
              xem xét.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Bài viết: {postTitle}</h4>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Lý do báo cáo</Label>
              <RadioGroup value={reason} onValueChange={setReason}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spam" id="spam" />
                  <Label htmlFor="spam" className="font-normal">
                    Spam hoặc quảng cáo trái phép
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inappropriate" id="inappropriate" />
                  <Label htmlFor="inappropriate" className="font-normal">
                    Nội dung không phù hợp
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="misinformation" id="misinformation" />
                  <Label htmlFor="misinformation" className="font-normal">
                    Thông tin sai lệch về y tế
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="copyright" id="copyright" />
                  <Label htmlFor="copyright" className="font-normal">
                    Vi phạm bản quyền
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="font-normal">
                    Lý do khác
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Chi tiết (không bắt buộc)</Label>
              <Textarea
                id="details"
                placeholder="Vui lòng cung cấp thêm thông tin về báo cáo của bạn..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button type="submit">Gửi báo cáo</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
