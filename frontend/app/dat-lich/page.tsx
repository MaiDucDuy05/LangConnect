"use client"

import { use, useEffect, useState } from "react"
import { useRouter,  useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { format, set } from "date-fns"
import { id, vi } from "date-fns/locale"
import { CalendarIcon, Clock, MapPin, User, FileText, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { SurveyPopup } from "@/components/survey-popup"
import { getAllPractitioners } from "@/database/business";

// Giả lập dữ liệu
const practitioners = getAllPractitioners();


// const services = {
//   practitioner: [
//     { id: "1", name: "Khám tổng quát", price: 300000, duration: "45 phút" },
//     { id: "2", name: "Châm cứu", price: 250000, duration: "60 phút" },
//     { id: "3", name: "Bấm huyệt", price: 200000, duration: "30 phút" },
//     { id: "4", name: "Tư vấn trực tuyến", price: 150000, duration: "30 phút" },
//   ],
//   clinic: [
//     { id: "1", name: "Khám tổng quát", price: 350000, duration: "60 phút" },
//     { id: "2", name: "Châm cứu", price: 300000, duration: "60 phút" },
//     { id: "3", name: "Xoa bóp, bấm huyệt", price: 250000, duration: "45 phút" },
//     { id: "4", name: "Điều trị cột sống", price: 400000, duration: "60 phút" },
//     { id: "5", name: "Tư vấn dinh dưỡng", price: 200000, duration: "30 phút" },
//   ],
// }



const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
]

export default function AppointmentPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [appointmentType, setAppointmentType] = useState<"practitioner" | "clinic">("practitioner")
  const [selectedId, setSelectedId] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [isOnline, setIsOnline] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("momo")
  const searchParams = useSearchParams()
  const [showSurvey, setShowSurvey] = useState(false)
  const [services, setServices] = useState<any[]>([])
  const [idDichVu, setIdDichVu] = useState("")


  useEffect(() => {
    if (appointmentType === "practitioner") {
      setServices(practitioners.find((p) => p.id.toString() === selectedId)?.services || [])
    } else {
      setServices([])
    }
  }, [appointmentType, selectedId])


  
  useEffect(() => {
    const idThayLang = searchParams.get("idThayLang")
    const idPhongKham = searchParams.get("idPhongKham")
    const idDichVu = searchParams.get("idDichVu")
    setSelectedId(idThayLang || idPhongKham || "")
    setSelectedService(idDichVu || "")
    if (idThayLang) {
      setSelectedId(idThayLang);
      setAppointmentType("practitioner")
      setStep(2)
    } else if (idPhongKham) {
      setAppointmentType("clinic")
      setStep(2)
    }
    if (idDichVu) {
      setIdDichVu(idDichVu)
      const practitioner = practitioners.find((p) => p.id.toString() === idThayLang);
      const service = practitioner?.services.find((s) => s.id === idDichVu);
      if (service) {
        setSelectedService(service.id)
        setStep(3)
      }
    }
  },[searchParams])

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = () => {
    setShowSurvey(true)

    // router.push("/thanh-toan?type=appointment")
  }

  const getSelectedItem = () => {
    if (appointmentType === "practitioner") {
      return practitioners.find((p) => p.id === Number(selectedId))
    } else {
      return ;
    }
  }

  const getSelectedServiceDetails = () => {
    const practitioner = practitioners.find((p) => p.id === Number(selectedId))
    if (practitioner) {
      return practitioner.services.find((s) => s.id === selectedService)
    }
    return null
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Chọn loại lịch hẹn</h3>
              <RadioGroup
                value={appointmentType}
                onValueChange={(value) => {
                  setAppointmentType(value as "practitioner" | "clinic")
                  setSelectedId("")
                  setSelectedService("")
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="practitioner" id="practitioner" className="peer sr-only" />
                  <Label
                    htmlFor="practitioner"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-600 [&:has([data-state=checked])]:border-green-600 cursor-pointer"
                  >
                    <User className="mb-3 h-6 w-6" />
                    <div className="text-center">
                      <p className="font-medium">Thầy Lang</p>
                      <p className="text-sm text-muted-foreground">Đặt lịch với thầy lang cụ thể</p>
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="clinic" id="clinic" className="peer sr-only" />
                  <Label
                    htmlFor="clinic"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-600 [&:has([data-state=checked])]:border-green-600 cursor-pointer"
                  >
                    <MapPin className="mb-3 h-6 w-6" />
                    <div className="text-center">
                      <p className="font-medium">Phòng Khám</p>
                      <p className="text-sm text-muted-foreground">Đặt lịch tại phòng khám</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Chọn {appointmentType === "practitioner" ? "thầy lang" : "phòng khám"}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {(appointmentType === "practitioner" ? practitioners : []).map((item) => (
                  <div key={item.id} className="relative">
                    <input
                      type="radio"
                      id={`item-${item.id}`}
                      name="selected-item"
                      className="peer sr-only"
                      checked={selectedId === item.id.toString()}
                      onChange={() => setSelectedId( item.id.toString())}
                    />
                    <label
                      htmlFor={`item-${item.id}`}
                      className="flex flex-col md:flex-row md:items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-green-600 cursor-pointer"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500 mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.specializations.map((spec, index) => spec.name).join(", ")}
                  </p>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0">
                        <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm text-muted-foreground">{item.address}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Chọn dịch vụ</h3>
              <div className="grid grid-cols-1 gap-4">
                {services.map((service) => (
                  <div key={service.id} className="relative">
                    <input
                      type="radio"
                      id={`service-${service.id}`}
                      name="selected-service"
                      className="peer sr-only"
                      checked={selectedService === service.id}
                      onChange={() => setSelectedService(service.id)}
                    />
                    <label
                      htmlFor={`service-${service.id}`}
                      className="flex flex-col md:flex-row md:items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-green-600 cursor-pointer"
                    >
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                          <span className="text-sm text-muted-foreground">{service.duration} phút</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className="font-bold text-green-700">{service.price.toLocaleString()}đ</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {appointmentType === "practitioner" && getSelectedServiceDetails()?.name === "Tư vấn trực tuyến" && (
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="online"
                  checked={isOnline}
                  onCheckedChange={(checked) => setIsOnline(checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="online"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Tư vấn trực tuyến qua video
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Bạn sẽ nhận được link tham gia buổi tư vấn qua email và tin nhắn.
                  </p>
                </div>
              </div>
            )}
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Chọn ngày</h3>
                <div className="border rounded-md p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={vi}
                    disabled={(date) => {
                      // Disable past dates and Sundays
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      return date < today || date.getDay() === 0
                    }}
                    className="mx-auto"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Chọn giờ</h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={cn(
                        "py-2 px-4 rounded-md text-center",
                        time === slot ? "bg-green-600 text-white" : "bg-gray-100 hover:bg-gray-200",
                      )}
                      onClick={() => setTime(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin liên hệ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input
                    id="name"
                    placeholder="Nhập họ và tên của bạn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    placeholder="Nhập số điện thoại của bạn"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú (không bắt buộc)</Label>
                <Textarea
                  id="notes"
                  placeholder="Nhập triệu chứng, câu hỏi hoặc yêu cầu đặc biệt"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </div>
        )
      case 4:
        const selectedItem = getSelectedItem()
        const serviceDetails = getSelectedServiceDetails()

        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Xác nhận thông tin đặt lịch</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{selectedItem?.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedItem?.specializations?.map((spec) => spec.name).join(", ")}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{serviceDetails?.name}</p>
                      <p className="text-sm text-muted-foreground">{serviceDetails?.duration}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{date ? format(date, "EEEE, dd/MM/yyyy", { locale: vi }) : "Chưa chọn ngày"}</span>
                    </div>
                    <div>
                      <span>{time || "Chưa chọn giờ"}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-start space-x-2">
                      <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p>{name || "Chưa nhập tên"}</p>
                        <p className="text-sm text-muted-foreground">{phone || "Chưa nhập số điện thoại"}</p>
                      </div>
                    </div>
                  </div>

                  {notes && (
                    <div className="pt-2 border-t">
                      <div className="flex items-start space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <p className="text-sm">{notes}</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Tổng tiền</span>
                      <span className="font-bold text-green-700">{serviceDetails?.price.toLocaleString()}đ</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {/* <h3 className="text-lg font-medium">Chọn phương thức thanh toán</h3>
              <Tabs defaultValue="momo" onValueChange={setPaymentMethod}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="momo">MoMo</TabsTrigger>
                  <TabsTrigger value="banking">Chuyển khoản</TabsTrigger>
                  <TabsTrigger value="cod">Tiền mặt</TabsTrigger>
                </TabsList>
                <TabsContent value="momo" className="p-4 border rounded-md mt-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-md flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-medium">Thanh toán qua MoMo</p>
                      <p className="text-sm text-muted-foreground">Quét mã QR hoặc chuyển tiền qua ví MoMo</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="banking" className="p-4 border rounded-md mt-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Chuyển khoản ngân hàng</p>
                      <p className="text-sm text-muted-foreground">Chuyển khoản qua tài khoản ngân hàng</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="cod" className="p-4 border rounded-md mt-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Thanh toán tiền mặt</p>
                      <p className="text-sm text-muted-foreground">Thanh toán trực tiếp tại phòng khám</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs> */}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return !selectedId
      case 2:
        return !selectedService
      case 3:
        return !date || !time || !name || !phone
      default:
        return false
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Đặt Lịch Khám</CardTitle>
            <CardDescription>Đặt lịch khám với thầy lang hoặc phòng khám đông y</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                        step === s
                          ? "bg-green-600 text-white"
                          : step > s
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500",
                      )}
                    >
                      {s}
                    </div>
                    <span className="text-xs mt-1 text-center hidden md:block">
                      {s === 1
                        ? "Chọn thầy lang/phòng khám"
                        : s === 2
                          ? "Chọn dịch vụ"
                          : s === 3
                            ? "Chọn thời gian"
                            : "Xác nhận"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
                  <div
                    className="h-1 bg-green-600 transition-all"
                    style={{ width: `${((step - 1) / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {renderStepContent()}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={step === 1}>
              Quay lại
            </Button>
            {step < 4 ? (
              <Button onClick={handleNext} disabled={isNextDisabled()} className="bg-green-700 hover:bg-green-800">
                Tiếp theo
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-700 hover:bg-green-800">
                Xác nhận 
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      <SurveyPopup
          isOpen={showSurvey}
          onClose={() => {
            setShowSurvey(false);
            router.push("/");
          }}
          appointmentType={appointmentType}
          selectedId={practitioners.find(item => item.id === Number(selectedId))?.name || "" }
          selectedService={practitioners.find(item => item.id === Number(selectedId))?.services.find(service => service.id === selectedService)?.name || ""}
          date={date}
          time={time}
          name={name}
          phone={`(+84) ${phone}`}
          notes={notes}
          isOnline={isOnline}
        />
    </div>
  )
}

