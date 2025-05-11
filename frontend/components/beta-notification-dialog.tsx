"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles, Rocket, ArrowRight, Bell } from "lucide-react"

interface BetaNotificationDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function BetaNotificationDialog({ open: externalOpen, onOpenChange }: BetaNotificationDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)

  // Determine if we should use internal or external state
  const isControlled = externalOpen !== undefined
  const isOpen = isControlled ? externalOpen : internalOpen

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)

    // If dialog is being closed and we're using internal state, save to localStorage
    if (!newOpen && !isControlled) {
      localStorage.setItem("hasSeenBetaNotification", "true")
    }
  }

  useEffect(() => {
    // Only check localStorage if we're using internal state
    if (!isControlled) {
      const hasSeenNotification = localStorage.getItem("hasSeenBetaNotification")
      if (!hasSeenNotification) {
        setInternalOpen(true)
      }
    }
  }, [isControlled])

  const handleConfirm = () => {
    // Save to localStorage so we don't show it again (only if using internal state)
    if (!isControlled) {
      localStorage.setItem("hasSeenBetaNotification", "true")
    }
    handleOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[550px] md:max-w-[650px] rounded-md border-2 border-green-200 p-0">
        {/* Banner header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-md">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-green-100">Thông báo</h3>
                <DialogTitle className="text-2xl font-bold mt-1">Phiên Bản Thử Nghiệm</DialogTitle>
              </div>
            </div>
            <Rocket className="h-10 w-10 text-white opacity-90" />
          </div>
        </div>

        <div className="p-8">
          <DialogHeader>
            <DialogDescription className="text-lg font-medium text-green-700">
               Chào mừng bạn đến với LangConnect – nền tảng tư vấn sức khỏe theo phương pháp Đông y.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-4">

            <div className="bg-amber-50 border-l-4 border-amber-400 pl-4 py-3 pr-3 text-amber-700">
              <p className="font-medium mb-1">Lưu ý quan trọng:</p>
              <p>
                Chúng tôi hiện đang trong giai đoạn thử nghiệm nhằm hoàn thiện chức năng và nội dung. Một số thông tin có thể chưa đầy đủ và không thay thế cho chẩn đoán y khoa chính thức.
              </p>
            </div>

            <div className="bg-green-50 rounded-md p-4 flex items-start gap-3">
              <div className="bg-green-100 p-1.5 rounded-full mt-0.5">
                <Sparkles className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">Đăng ký ngay để trải nghiệm dịch vụ!</p>
            
                <p className="text-green-700 text-sm mt-1">
                  Chúng tôi luôn trân trọng mọi đóng góp và phản hồi từ bạn để cải thiện nền tảng tốt hơn.
                </p>
                <p className="text-green-700 text-sm mt-1">
                Bạn có thể kết nối với chuyên gia Đông y để nhận tư vấn sức khỏe miễn phí cho bản thân hoặc cho gia đình của bạn
              </p>
                <p className="text-green-700 text-sm mt-1">
                Cảm ơn bạn đã ghé thăm! Chúng tôi đang xây dựng nền tảng y học cổ truyền toàn diện và bạn là một trong
                những người đầu tiên được trải nghiệm.
              </p>
          
              </div>
            </div>
          </div>

          <DialogFooter className="flex sm:justify-between gap-4 pt-2 border-t border-gray-100 mt-2 pt-6">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
              onClick={() => handleOpenChange(false)}
            >
              Đóng thông báo
            </Button>
            <Button
              onClick={handleConfirm}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 gap-1 group px-6 py-6 text-base"
            >
              Tôi đã hiểu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
