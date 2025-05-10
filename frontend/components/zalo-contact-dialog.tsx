"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Phone, Video, Send, User, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface Message {
  id: string
  content: string
  sender: "user" | "practitioner"
  timestamp: Date
}

interface ZaloContactDialogProps {
  practitionerId?: string
  practitionerName?: string
  practitionerPhone?: string
  practitionerZalo?: string
  buttonText?: string
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  buttonClassName?: string
  buttonIcon?: boolean
}

export function ZaloContactDialog({
  practitionerId,
  practitionerName = "Thầy Lang",
  practitionerPhone = "0123456789",
  practitionerZalo = "0123456789",
  buttonText = "Nhắn Tin",
  buttonVariant = "outline",
  buttonClassName,
  buttonIcon = true,
}: ZaloContactDialogProps) {
  const [open, setOpen] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Xin chào! Tôi là ${practitionerName}. Tôi có thể giúp gì cho bạn?`,
      sender: "practitioner",
      timestamp: new Date(Date.now() - 60000),
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handlePhoneCall = () => {
    // Gọi điện thoại
    window.location.href = `tel:${practitionerPhone}`
  }

  const handleVideoCall = () => {
    // Mở trang video call
    window.open(`/video-call?id=${practitionerId}`, "_blank")
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Thêm tin nhắn của người dùng
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Giả lập phản hồi từ thầy lang sau 1 giây
    setTimeout(() => {
      const practitionerResponses = [
        `Cảm ơn bạn đã liên hệ. Tôi sẽ xem xét vấn đề của bạn.`,
        `Bạn có thể mô tả chi tiết hơn về tình trạng sức khỏe không?`,
        `Tôi có thể giúp bạn đặt lịch khám trực tiếp nếu bạn muốn.`,
        `Đây là một vấn đề cần thăm khám trực tiếp. Bạn có thể đặt lịch không?`,
        `Tôi sẽ gửi cho bạn một số hướng dẫn để cải thiện tình trạng.`,
      ]

      const randomResponse = practitionerResponses[Math.floor(Math.random() * practitionerResponses.length)]

      const practitionerMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "practitioner",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, practitionerMessage])
    }, 1000)
  }

  // Cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, open])

  // Format thời gian
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div>
      <Button variant={buttonVariant as any} className={buttonClassName} onClick={() => setOpen(!open)}>
        {buttonIcon && <MessageSquare className="mr-2 h-4 w-4" />}
        {buttonText}
      </Button>

      {open && (
        <div className="fixed bottom-20 right-4 z-50 w-[350px] shadow-lg">
          <Card className="border rounded-lg overflow-hidden">
            <CardHeader className="p-3 bg-green-600  text-primary-foreground flex flex-row justify-between items-center">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt={practitionerName} />
                  <AvatarFallback>{practitionerName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm font-medium">{practitionerName}</h3>
                  <p className="text-xs opacity-80">Trực tuyến</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-green-600"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4 bg-green-600 hover:bg-green-700" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="chat" className="w-full">
                <TabsList className="grid w-full grid-cols-1 rounded-none">
                  <TabsTrigger value="chat">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Nhắn tin
                  </TabsTrigger>
                  {/* <TabsTrigger value="phone">
                    <Phone className="mr-2 h-4 w-4" />
                    Điện thoại
                  </TabsTrigger>
                  <TabsTrigger value="video">
                    <Video className="mr-2 h-4 w-4" />
                    Video call
                  </TabsTrigger> */}
                </TabsList>
                <TabsContent value="chat" className="p-0 m-0">
                  <div className="flex flex-col h-[350px]">
                    <ScrollArea className="flex-1 px-3 py-2 h-[300px]">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "user" ? "justify-end " : "justify-start"}`}
                          >
                            {message.sender === "practitioner" && (
                              <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={practitionerName} />
                                <AvatarFallback>{practitionerName.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}
                            <div className="max-w-[75%]">
                              <div
                                className={`rounded-lg px-3 py-2 inline-block ${
                                  message.sender === "user" ? "bg-green-600 text-primary-foreground" : "bg-muted"
                                }`}
                              >
                                {message.content}
                              </div>
                              <div
                                className={`text-xs text-muted-foreground mt-1 ${
                                  message.sender === "user" ? "text-right" : "text-left"
                                }`}
                              >
                                {formatTime(message.timestamp)}
                              </div>
                            </div>
                            {message.sender === "user" && (
                              <Avatar className="h-8 w-8 ml-2 flex-shrink-0">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bạn" />
                                <AvatarFallback>
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                    <CardFooter className="p-2 border-t">
                      <form onSubmit={handleSendMessage} className="flex gap-2 w-full">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Nhập tin nhắn..."
                          className="flex-1"
                        />
                        <Button type="submit" size="icon" className="h-9 w-9 bg-green-600 hover:bg-green-700">
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    </CardFooter>
                  </div>
                </TabsContent>
                <TabsContent value="phone" className="p-4">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-center">
                      <p className="font-medium">Gọi điện trực tiếp</p>
                      <p className="text-sm text-muted-foreground">Số điện thoại: {practitionerPhone}</p>
                    </div>
                    <Button onClick={handlePhoneCall} className="w-full bg-green-600 hover:bg-green-700">
                      <Phone className="mr-2 h-4 w-4" />
                      Gọi điện ngay
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="video" className="p-4">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-center">
                      <p className="font-medium">Tư vấn qua video call</p>
                      <p className="text-sm text-muted-foreground">
                        Kết nối trực tiếp với {practitionerName} qua video call
                      </p>
                    </div>
                    <Button onClick={handleVideoCall} className="w-full bg-purple-600 hover:bg-purple-700">
                      <Video className="mr-2 h-4 w-4" />
                      Bắt đầu video call
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
