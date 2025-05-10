"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send } from "lucide-react"

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Xin chào! Tôi là trợ lý ảo của LangConnect. Tôi có thể giúp gì cho bạn?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Tôi có thể giúp bạn tìm thầy lang hoặc phòng khám phù hợp với nhu cầu của bạn.",
        "Bạn có thể mô tả triệu chứng của mình để tôi gợi ý một số bài thuốc cổ truyền.",
        "Để được tư vấn chi tiết hơn, bạn nên đặt lịch với thầy lang chuyên về lĩnh vực này.",
        "Tôi có thể giúp bạn tìm hiểu thêm về các phương pháp điều trị đông y cho vấn đề của bạn.",
        "Bạn có muốn tôi kết nối bạn với một thầy lang để được tư vấn trực tiếp không?",
      ]

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Trợ Lý Ảo LangConnect</h1>

      <div className="max-w-2xl mx-auto">
        <Card className="border-green-200 shadow-md">
          <CardHeader className="bg-green-50 border-b border-green-100">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center mr-3">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle>Chatbot LangConnect</CardTitle>
                <CardDescription>Hỗ trợ tư vấn nhanh 24/7</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === "user" ? "text-green-100" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t p-3">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Nhập tin nhắn..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-8 bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-green-800 mb-2">Chatbot có thể giúp bạn:</h2>
          <ul className="list-disc pl-5 space-y-1 text-green-700">
            <li>Tư vấn nhanh về các triệu chứng và bài thuốc cổ truyền</li>
            <li>Gợi ý thầy lang hoặc phòng khám phù hợp với nhu cầu của bạn</li>
            <li>Hướng dẫn đặt lịch khám và mua sản phẩm</li>
            <li>Giải đáp các câu hỏi thường gặp về đông y</li>
            <li>Kết nối bạn với bác sĩ hoặc thầy lang để được tư vấn trực tiếp</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

