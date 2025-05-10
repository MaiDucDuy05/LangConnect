"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, MicOff, VideoIcon, VideoOff, Phone, PhoneOff, Users } from "lucide-react"

export default function VideoCallPage() {
  const [isMicOn, setIsMicOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isCallActive, setIsCallActive] = useState(false)
  const [callStatus, setCallStatus] = useState("Sẵn sàng")
  const [selectedTab, setSelectedTab] = useState("connect")

  // Simulate call connection
  const startCall = () => {
    setCallStatus("Đang kết nối...")
    setTimeout(() => {
      setIsCallActive(true)
      setCallStatus("Đang trong cuộc gọi")
    }, 2000)
  }

  // End call
  const endCall = () => {
    setIsCallActive(false)
    setCallStatus("Cuộc gọi đã kết thúc")
    setTimeout(() => {
      setCallStatus("Sẵn sàng")
    }, 3000)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Tư Vấn Trực Tuyến</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Video Call</CardTitle>
              <CardDescription>{callStatus}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ height: "400px" }}>
                {isCallActive ? (
                  <>
                    {/* Remote video (doctor) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Users className="h-20 w-20 mx-auto mb-4 opacity-20" />
                        <p className="text-xl opacity-50">Video của bác sĩ</p>
                      </div>
                    </div>

                    {/* Local video (user) - small overlay */}
                    {isVideoOn && (
                      <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="text-white text-xs">Video của bạn</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-white text-center">
                      <VideoIcon className="h-20 w-20 mx-auto mb-4 opacity-20" />
                      <p className="text-xl opacity-50">Chưa có cuộc gọi</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${!isMicOn ? "bg-red-100 text-red-500" : ""}`}
                onClick={() => setIsMicOn(!isMicOn)}
              >
                {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${!isVideoOn ? "bg-red-100 text-red-500" : ""}`}
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>

              {isCallActive ? (
                <Button variant="destructive" size="icon" className="rounded-full h-14 w-14" onClick={endCall}>
                  <PhoneOff className="h-6 w-6" />
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="icon"
                  className="rounded-full h-14 w-14 bg-green-600 hover:bg-green-700"
                  onClick={startCall}
                >
                  <Phone className="h-6 w-6" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="connect" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="connect">Kết Nối</TabsTrigger>
              <TabsTrigger value="chat">Trò Chuyện</TabsTrigger>
            </TabsList>

            <TabsContent value="connect">
              <Card>
                <CardHeader>
                  <CardTitle>Kết nối với bác sĩ</CardTitle>
                  <CardDescription>Chọn bác sĩ hoặc thầy lang để bắt đầu cuộc gọi tư vấn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Chọn bác sĩ</Label>
                    <select id="doctor" className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">-- Chọn bác sĩ --</option>
                      <option value="1">Thầy Lang Nguyễn Văn A</option>
                      <option value="2">Bác Sĩ Trần Thị B</option>
                      <option value="3">Lương Y Lê Văn C</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Lý do tư vấn</Label>
                    <textarea
                      id="reason"
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Mô tả ngắn gọn vấn đề của bạn"
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Thời gian tư vấn</Label>
                    <select id="time" className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">-- Chọn thời gian --</option>
                      <option value="now">Ngay bây giờ</option>
                      <option value="schedule">Đặt lịch hẹn</option>
                    </select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Bắt Đầu Tư Vấn</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="chat">
              <Card>
                <CardHeader>
                  <CardTitle>Trò chuyện</CardTitle>
                  <CardDescription>Trao đổi tin nhắn với bác sĩ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 overflow-y-auto border border-gray-200 rounded-md p-3 mb-4 bg-gray-50">
                    <div className="flex items-start mb-3">
                      <div className="bg-green-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm font-medium mb-1">Bác sĩ Nguyễn Văn A</p>
                        <p className="text-sm">Xin chào, tôi có thể giúp gì cho bạn?</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-3 justify-end">
                      <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">
                          Tôi bị đau lưng mấy ngày nay, không biết có cách nào giảm đau không ạ?
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start mb-3">
                      <div className="bg-green-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm font-medium mb-1">Bác sĩ Nguyễn Văn A</p>
                        <p className="text-sm">
                          Bạn có thể mô tả cụ thể hơn về cơn đau không? Đau ở vị trí nào và đau như thế nào?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <Input placeholder="Nhập tin nhắn..." className="flex-1 mr-2" />
                    <Button>Gửi</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

