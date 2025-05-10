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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReviewDialogProps {
  itemName: string
  itemType: "practitioner" | "product" | "clinic" | "article"
  onSubmit?: (data: { rating: number; comment: string; images?: File[] }) => void
  buttonText?: string
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  buttonClassName?: string
}

export function ReviewDialog({
  itemName,
  itemType,
  onSubmit,
  buttonText = "Viết Đánh Giá",
  buttonVariant = "default",
  buttonClassName,
}: ReviewDialogProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá")
      return
    }

    if (comment.trim() === "") {
      alert("Vui lòng nhập nội dung đánh giá")
      return
    }

    if (onSubmit) {
      onSubmit({ rating, comment, images })
    } else {
      console.log({ rating, comment, images })
    }

    // Reset form
    setRating(0)
    setComment("")
    setImages([])
    setOpen(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setImages((prev) => [...prev, ...fileArray])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const getItemTypeText = () => {
    switch (itemType) {
      case "practitioner":
        return "thầy lang"
      case "product":
        return "sản phẩm"
      case "clinic":
        return "phòng khám"
      case "article":
        return "bài viết"
      default:
        return "mục"
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant as any} className={buttonClassName}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Đánh giá {getItemTypeText()}</DialogTitle>
          <DialogDescription>
            Chia sẻ trải nghiệm của bạn về {itemName}. Đánh giá của bạn sẽ giúp ích cho cộng đồng.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="rating" className="text-center block">
              Đánh giá của bạn
            </Label>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    className={cn(
                      "h-8 w-8",
                      (hoverRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                    )}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500">
              {rating === 1
                ? "Rất không hài lòng"
                : rating === 2
                  ? "Không hài lòng"
                  : rating === 3
                    ? "Bình thường"
                    : rating === 4
                      ? "Hài lòng"
                      : rating === 5
                        ? "Rất hài lòng"
                        : "Chọn số sao để đánh giá"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Nội dung đánh giá</Label>
            <Textarea
              id="comment"
              placeholder={`Chia sẻ trải nghiệm của bạn về ${itemName}...`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {(itemType === "product" || itemType === "clinic") && (
            <div className="space-y-2">
              <Label htmlFor="images">Thêm hình ảnh (không bắt buộc)</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((image, index) => (
                  <div key={index} className="relative w-16 h-16 border rounded overflow-hidden group">
                    <img
                      src={URL.createObjectURL(image) || "/placeholder.svg"}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white"
                    >
                      Xóa
                    </button>
                  </div>
                ))}
                {images.length < 5 && (
                  <label className="w-16 h-16 border border-dashed rounded flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <span className="text-2xl text-gray-400">+</span>
                    <input
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-gray-500">Tối đa 5 hình ảnh, mỗi hình không quá 5MB</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} className="bg-green-700 hover:bg-green-800">
            Gửi đánh giá
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

