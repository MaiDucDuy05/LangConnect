"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Phone, Send, User, Bot, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ZaloChatWidget } from "@/components/zalo-chat-widget"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: number
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Xin chào! Tôi là trợ lý ảo của Đông Y Platform. Tôi có thể giúp gì cho bạn?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [messages, isOpen])

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, newUserMessage])
    setInputValue("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "Cảm ơn bạn đã liên hệ với Đông Y Platform. Chúng tôi sẽ phản hồi sớm nhất có thể.",
        "Bạn có thể cho tôi biết thêm chi tiết về vấn đề bạn đang gặp phải không?",
        "Bạn có thể tìm thêm thông tin về các sản phẩm đông y tại mục 'Sản phẩm' trên trang chủ.",
        "Để đặt lịch khám với thầy lang, bạn có thể truy cập mục 'Thầy Lang' và chọn thời gian phù hợp.",
        "Chúng tôi có nhiều bài thuốc đông y truyền thống được chia sẻ trong mục 'Kiến thức'.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const newBotMessage: Message = {
        id: messages.length + 2,
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newBotMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        {isOpen ? (
          <Card className="w-[350px] shadow-lg border-green-600/20">
            <CardHeader className="p-4 pb-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-white/20">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Đông Y Platform" />
                    <AvatarFallback className="bg-green-700 text-white">ĐY</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Hỗ Trợ Trực Tuyến</CardTitle>
                    <Badge
                      variant="outline"
                      className="text-xs text-white/90 bg-white/10 hover:bg-white/20 border-white/20"
                    >
                      <Zap className="h-3 w-3 mr-1" /> Đang hoạt động
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 mx-4 mt-2 rounded-lg">
                <TabsTrigger value="chat" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  Chat
                </TabsTrigger>
                <TabsTrigger value="zalo" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  Zalo
                </TabsTrigger>
                <TabsTrigger value="call" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  Gọi điện
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="mt-0">
                <CardContent className="p-4 pt-2">
                  <ScrollArea className="h-[300px] pr-4 -mr-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className="flex gap-2 max-w-[80%]">
                            {message.sender === "bot" && (
                              <Avatar className="h-8 w-8 mt-1">
                                <AvatarFallback className="bg-green-600 text-white">
                                  <Bot className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <div
                                className={`rounded-2xl px-3 py-2 text-sm ${
                                  message.sender === "user" ? "bg-green-600 text-white" : "bg-muted"
                                }`}
                              >
                                {message.content}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</div>
                            </div>
                            {message.sender === "user" && (
                              <Avatar className="h-8 w-8 mt-1">
                                <AvatarFallback className="bg-green-100 text-green-600">
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex w-full gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Nhập tin nhắn của bạn..."
                      className="border-green-600/20 focus-visible:ring-green-600/30"
                    />
                    <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </TabsContent>

              <TabsContent value="zalo" className="mt-0">
                <CardContent className="p-4">
                  <ZaloChatWidget />
                </CardContent>
              </TabsContent>

              <TabsContent value="call" className="mt-0">
                <CardContent className="p-4">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                      <Phone className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="font-medium mb-1">Gọi ngay để được hỗ trợ</p>
                    <p className="text-xl font-bold mb-3 text-green-600">1800 1234</p>
                    <p className="text-sm text-muted-foreground mb-4">Thời gian hỗ trợ: 8:00 - 20:00 hàng ngày</p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Phone className="mr-2 h-4 w-4" /> Gọi ngay
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        ) : (
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105"
            onClick={() => setIsOpen(true)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>
    </>
  )
}