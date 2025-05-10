"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Send, Paperclip, ImageIcon, Smile, Phone, Video } from "lucide-react"

export function ZaloChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Xin chào! Tôi là trợ lý ảo của LangConnect. Bạn cần hỗ trợ gì?",
      time: "10:00",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputValue.trim() === "") return

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newUserMessage])
    setInputValue("")

    // Simulate bot response after 1 second
    setTimeout(() => {
      let botResponse

      if (inputValue.toLowerCase().includes("đau đầu") || inputValue.toLowerCase().includes("nhức đầu")) {
        botResponse = {
          id: messages.length + 2,
          sender: "bot",
          text: "Đau đầu có thể do nhiều nguyên nhân. Bạn có thể tham khảo bài thuốc từ Thầy Lang Nguyễn Văn A hoặc đặt lịch khám tại Phòng Khám Đông Y Minh Đường.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
      } else if (inputValue.toLowerCase().includes("mất ngủ")) {
        botResponse = {
          id: messages.length + 2,
          sender: "bot",
          text: "Mất ngủ là vấn đề phổ biến. Chúng tôi có các bài thuốc an thần từ Thầy Lang Trần Văn B có thể giúp bạn ngủ ngon hơn.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
      } else {
        botResponse = {
          id: messages.length + 2,
          sender: "bot",
          text: "Cảm ơn bạn đã liên hệ. Bạn có thể mô tả chi tiết hơn về vấn đề sức khỏe để chúng tôi tư vấn tốt hơn, hoặc bạn có thể kết nối với thầy lang/bác sĩ trực tiếp.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
      }

      setMessages((prevMessages) => [...prevMessages, botResponse])
    }, 1000)
  }

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col border border-blue-100">
          {/* Header */}
          <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2 border-2 border-white">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Zalo" />
                <AvatarFallback className="bg-blue-700 text-white">Z</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-bold">LangConnect</div>
                <div className="text-xs">Trực tuyến</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-blue-600">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-blue-600">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-blue-600" onClick={toggleChat}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto max-h-96 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                    <AvatarFallback className="bg-blue-500 text-white">Z</AvatarFallback>
                  </Avatar>
                )}
                <div className="max-w-[70%]">
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-white border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    {message.text}
                  </div>
                  <div
                    className={`text-xs mt-1 text-gray-500 ${message.sender === "user" ? "text-right" : "text-left"}`}
                  >
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t p-3 bg-white">
            <div className="flex items-center space-x-2 mb-2">
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                <Smile className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-blue-500 hover:bg-blue-600">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Zalo Chat Button */}
      <Button
        onClick={toggleChat}
        className={`rounded-full w-14 h-14 p-0 shadow-lg ${isOpen ? "bg-blue-600" : "bg-blue-500"} hover:bg-blue-600`}
      >
        <div className="flex items-center justify-center">
          <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
              fill="white"
            />
            <path
              d="M26.6601 18.7283C28.1454 18.7283 29.5318 18.9456 30.8192 19.3802C32.1066 19.8149 33.2505 20.4669 34.251 21.3362C35.2514 22.2056 36.0519 23.2923 36.6523 24.5964C37.2527 25.9005 37.5529 27.422 37.5529 29.1608C37.5529 30.8996 37.2527 32.421 36.6523 33.7251C36.0519 35.0293 35.2514 36.116 34.251 36.9853C33.2505 37.8546 32.1066 38.5066 30.8192 38.9413C29.5318 39.3759 28.1454 39.5932 26.6601 39.5932H20.9562C19.4709 39.5932 18.0845 39.3759 16.7971 38.9413C15.5097 38.5066 14.3658 37.8546 13.3653 36.9853C12.3649 36.116 11.5644 35.0293 10.964 33.7251C10.3636 32.421 10.0634 30.8996 10.0634 29.1608C10.0634 27.422 10.3636 25.9005 10.964 24.5964C11.5644 23.2923 12.3649 22.2056 13.3653 21.3362C14.3658 20.4669 15.5097 19.8149 16.7971 19.3802C18.0845 18.9456 19.4709 18.7283 20.9562 18.7283H26.6601Z"
              fill="#0068FF"
            />
          </svg>
        </div>
      </Button>
    </div>
  )
}

