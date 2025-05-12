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

  const isControlled = externalOpen !== undefined
  const isOpen = isControlled ? externalOpen : internalOpen

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
    if (!newOpen && !isControlled) {
      localStorage.setItem("hasSeenBetaNotification", "true")
    }
  }

  useEffect(() => {
    if (!isControlled) {
      const hasSeenNotification = localStorage.getItem("hasSeenBetaNotification")
      if (!hasSeenNotification) {
        setInternalOpen(true)
      }
    }
  }, [isControlled])

  const handleConfirm = () => {
    if (!isControlled) {
      localStorage.setItem("hasSeenBetaNotification", "true")
    }
    handleOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="w-full max-w-[90vw] sm:max-w-[550px] md:max-w-[650px] max-h-[90vh] overflow-y-auto rounded-md border border-green-200 p-0"
      >
        {/* Banner header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-6 sm:p-8 text-white">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-md">
                <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-medium uppercase tracking-wider text-green-100">Thông báo</h3>
                <DialogTitle className="text-xl sm:text-2xl font-bold mt-1">Phiên Bản Thử Nghiệm</DialogTitle>
              </div>
            </div>
            <Rocket className="h-8 w-8 sm:h-10 sm:w-10 text-white opacity-90" />
          </div>
        </div>

        <div className="p-4 sm:p-8">
          <DialogHeader>
            <DialogDescription className="text-base sm:text-lg font-medium text-green-700">
              Chào mừng bạn đến với LangConnect – nền tảng tư vấn sức khỏe theo phương pháp Đông y.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 sm:py-6 space-y-4">
            <div className="bg-amber-50 border-l-4 border-amber-400 pl-3 sm:pl-4 py-3 pr-3 text-amber-700">
              <p className="font-medium mb-1">Lưu ý quan trọng:</p>
              <p>
                Chúng tôi hiện đang trong giai đoạn thử nghiệm nhằm hoàn thiện chức năng và nội dung. Một số thông tin có thể chưa đầy đủ và không thay thế cho chẩn đoán y khoa chính thức.
              </p>
            </div>

            <div className="bg-green-50 rounded-md p-3 sm:p-4 flex items-start gap-3">
              <div className="bg-green-100 p-1.5 rounded-full mt-0.5">
                <Sparkles className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-sm sm:text-base">
                <p className="font-medium text-green-800">Đăng ký ngay để trải nghiệm dịch vụ!</p>
                <p className="text-green-700 mt-1">
                  Chúng tôi luôn trân trọng mọi đóng góp và phản hồi từ bạn để cải thiện nền tảng tốt hơn.
                </p>
                <p className="text-green-700 mt-1">
                  Bạn có thể kết nối với chuyên gia Đông y để nhận tư vấn sức khỏe miễn phí cho bản thân hoặc cho gia đình của bạn.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-4 sm:pt-6 border-t border-gray-100">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
              onClick={() => handleOpenChange(false)}
            >
              Đóng thông báo
            </Button>
            <Button
              onClick={handleConfirm}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 gap-1 group px-4 py-4 sm:px-6 sm:py-6 text-sm sm:text-base"
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
