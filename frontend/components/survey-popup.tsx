"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface SurveyPopupProps {
  isOpen: boolean
  onClose: () => void
  appointmentType?: "practitioner" | "clinic"
  selectedId?: string
  selectedService?: string
  date?: Date
  time?: string
  name?: string
  phone?: string
  notes?: string
  isOnline?: boolean
}

// Danh sách các tỉnh thành Việt Nam
const provinces = [
  "Hà Nội",
  "TP Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Định",
  "Bình Dương",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cao Bằng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Tĩnh",
  "Hải Dương",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
]

// Các nhóm tuổi
const ageGroups = ["Dưới 18 tuổi", "18-24 tuổi", "25-34 tuổi", "35-44 tuổi", "45-54 tuổi", "55-64 tuổi", "Trên 65 tuổi"]

// Các lựa chọn giới tính
const genderOptions = ["Nam", "Nữ", "Khác", "Không muốn trả lời"]

export function SurveyPopup({
  isOpen,
  onClose,
  selectedId = "",
  selectedService = "",
  date,
  time = "",
  name = "",
  phone = "",
  notes = "",
}: SurveyPopupProps) {
  const [step, setStep] = useState<"survey" | "thanks">("survey")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [answers, setAnswers] = useState({
    experience: "",
    consultationType: "",
    price: "",
    expectation: [] as string[], // Thay đổi thành mảng để lưu nhiều lựa chọn
    feedback: "",
    province: "",
    ageGroup: "",
    gender: "",
    selectedId,
    selectedService,
    date: date?.toISOString() || "",
    time,
    name,
    phone,
    notes,
  })

  useEffect(() => {
    setAnswers((prev) => ({
      ...prev,
      selectedId,
      selectedService,
      date: date?.toISOString() || "",
      time,
      name,
      phone,
      notes,
    }))
  }, [selectedId, selectedService, date, time, name, phone, notes])

  const handleChange = (question: keyof typeof answers, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [question]: value }))
  }

  // Hàm xử lý khi người dùng chọn/bỏ chọn một lựa chọn trong câu hỏi checkbox
  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      // Thêm lựa chọn vào mảng
      setAnswers((prev) => ({
        ...prev,
        expectation: [...prev.expectation, option],
      }))
    } else {
      // Xóa lựa chọn khỏi mảng
      setAnswers((prev) => ({
        ...prev,
        expectation: prev.expectation.filter((item) => item !== option),
      }))
    }
  }

  const questions = [
    {
      id: "province",
      title: "Bạn đang ở tỉnh thành nào?",
      type: "select",
      options: provinces,
    },
    {
      id: "ageGroup",
      title: "Độ tuổi của bạn?",
      type: "select",
      options: ageGroups,
    },
    {
      id: "gender",
      title: "Giới tính của bạn?",
      type: "radio",
      options: genderOptions,
    },
    {
      id: "experience",
      title: "Bạn đã từng khám chữa bằng Đông y chưa?",
      type: "radio",
      options: ["Rồi", "Chưa", "Thỉnh thoảng"],
    },
    {
      id: "consultationType",
      title: "Nếu được chọn, bạn mong muốn hình thức tư vấn nào?",
      type: "radio",
      options: ["Gọi video với thầy thuốc", "Nhắn tin trước", "Tư vấn qua Zalo"],
    },
    {
      id: "price",
      title: "Bạn sẵn sàng chi trả bao nhiêu cho 1 lần tư vấn (20-30 phút)?",
      type: "radio",
      options: ["Dưới 50.000đ", "50.000–100.000đ", "100.000–200.000đ", "Trên 200.000đ", "Cần miễn phí"],
    },
    {
      id: "expectation",
      title: "Bạn mong muốn điều gì nhất ở một thầy thuốc? (Có thể chọn nhiều)",
      type: "checkbox", // Thay đổi type thành checkbox
      options: [
        "Có bằng cấp rõ ràng/ Chứng chỉ hành nghề",
        "Kinh nghiệm lâu năm",
        "Phản hồi nhanh, dễ tiếp cận",
        "Có phòng khám uy tín",
        "Tận tâm, dễ hiểu",
        "Được người quen giới thiệu/ Có nhiều người tin tưởng",
      ],
    },
    {
      id: "feedback",
      title:
        "Bạn nghĩ việc để lại nhận xét công khai sau khi được tư vấn có giúp ích cho cộng đồng và chính bạn không?",
      type: "radio",
      options: [
        "Rất có ích – giúp mình và người khác chọn tốt hơn",
        "Có thể, nếu thầy thuốc thực sự nổi bật",
        "Mình không quan tâm lắm",
        "Không phù hợp vì khám bệnh là chuyện riêng tư",
      ],
    },
  ]

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const canProceed = () => {
    const currentId = currentQ.id as keyof typeof answers
    if (currentId === "expectation") {
      // Kiểm tra xem người dùng đã chọn ít nhất một lựa chọn chưa
      return answers.expectation.length > 0
    }
    return !!answers[currentId]
  }

  const handleSubmit = async () => {
    // Giả lập gửi dữ liệu khảo sát
    console.log("Gửi dữ liệu khảo sát:", answers)
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbykW0BAqT0_fN9XlNlGqRQhGj18Lzy_mey1RwA9ya165bapIMMbn-eDN7sa3prJlwid/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answers),
        },
      )
        .then(() => {
          setSubmitted(true)
        })
        .catch((error) => console.error("Error:", error))
    } catch (error) {
      console.error("Gửi không thành công", error)
    }

    // Chuyển sang màn hình cảm ơn
    setStep("thanks")

    // Sau 5 giây, đóng popup
    setTimeout(() => {
      onClose()
      // Reset lại state cho lần sau
      setStep("survey")
      setCurrentQuestion(0)
      setAnswers({
        experience: "",
        consultationType: "",
        price: "",
        expectation: [], // Reset thành mảng rỗng
        feedback: "",
        province: "",
        ageGroup: "",
        gender: "",
        selectedId,
        selectedService,
        date: date?.toISOString() || "",
        time,
        name,
        phone,
        notes,
      })
    }, 15000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:w-2/3 w-[95%] max-w-3xl p-0 overflow-hidden bg-white rounded-xl">
        <DialogHeader className="bg-[#16a34a]/10 pb-4 pt-6">
          <DialogTitle className="text-center text-xl text-[#16a34a]">
            {step === "survey" ? "🎯 Chỉ vài giây nữa thôi!" : "Bạn đã hoàn tất đăng ký!"}
          </DialogTitle>
          {step === "survey" && (
            <div className="px-6 mt-2">
              <p className="text-center text-gray-600 mb-3">Hãy giúp chúng tôi hiểu rõ bạn hơn để phục vụ tốt hơn:</p>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#16a34a] h-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-right text-sm text-gray-500 mt-1">
                {currentQuestion + 1}/{questions.length}
              </div>
            </div>
          )}
        </DialogHeader>

        {step === "survey" ? (
          <Card className="border-0 shadow-none">
            <CardContent className="p-4 sm:p-6 min-h-[300px] flex flex-col justify-between">
              <div className="space-y-6">
                <div className="bg-[#16a34a]/5 p-5 rounded-lg">
                  <h3 className="font-medium text-[#16a34a] text-base sm:text-lg mb-4">{currentQ.title}</h3>

                  {currentQ.type === "select" ? (
                    <Select
                      value={answers[currentQ.id as keyof typeof answers] as string}
                      onValueChange={(value) => handleChange(currentQ.id as keyof typeof answers, value)}
                    >
                      <SelectTrigger className="w-full border-[#16a34a]/30 focus:ring-[#16a34a]/20">
                        <SelectValue placeholder="Chọn một giá trị" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {currentQ.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : currentQ.type === "checkbox" ? (
                    <div className="space-y-3">
                      {currentQ.options.map((option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-2 p-2 sm:p-3 rounded-lg hover:bg-[#16a34a]/10 transition-colors"
                        >
                          <Checkbox
                            id={`${currentQ.id}-${option}`}
                            checked={answers.expectation.includes(option)}
                            onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                            className="text-[#16a34a] border-[#16a34a] data-[state=checked]:bg-[#16a34a] data-[state=checked]:text-white"
                          />
                          <Label htmlFor={`${currentQ.id}-${option}`} className="cursor-pointer w-full">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <RadioGroup
                      value={answers[currentQ.id as keyof typeof answers] as string}
                      onValueChange={(value) => handleChange(currentQ.id as keyof typeof answers, value)}
                      className="space-y-3"
                    >
                      {currentQ.options.map((option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-2 p-2 sm:p-3 rounded-lg hover:bg-[#16a34a]/10 transition-colors"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`${currentQ.id}-${option}`}
                            className="text-[#16a34a] border-[#16a34a]"
                          />
                          <Label htmlFor={`${currentQ.id}-${option}`} className="cursor-pointer w-full">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-[#16a34a]/5 p-4 sm:p-6 flex justify-between">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="border-[#16a34a] text-[#16a34a] hover:bg-[#16a34a]/10 text-xs sm:text-sm px-2 sm:px-4"
              >
                Quay lại
              </Button>
              <Button
                onClick={nextQuestion}
                disabled={!canProceed()}
                className="bg-[#16a34a] hover:bg-[#16a34a]/90 text-xs sm:text-sm px-2 sm:px-4"
              >
                {currentQuestion < questions.length - 1 ? (
                  <span className="flex items-center">
                    Tiếp theo <ChevronRight className="ml-1 h-4 w-4" />
                  </span>
                ) : (
                  "Gửi phản hồi"
                )}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border-0 shadow-none">
            <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6">
              <div className="text-center space-y-5">
                <div className="flex justify-center">
                  <div className="bg-[#16a34a]/10 p-4 rounded-full">
                    <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-[#16a34a]" />
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#16a34a]">🎉 Cảm ơn bạn đã đăng ký trải nghiệm!</h2>
                <p className="text-gray-600">Chúng tôi sẽ liên hệ trong 1–2 ngày tới nếu bạn thuộc nhóm phù hợp.</p>
                <div className="pt-3 space-y-3 bg-[#16a34a]/5 p-4 rounded-lg">
                  <p className="font-medium">👉 Theo dõi fanpage để nhận các đợt tư vấn mới nhất!</p>
                  <p className="font-medium">
                    👉 Tìm hiểu thêm về LangConnect{" "}
                    <a href="https://www.facebook.com/profile.php?id=61575814304088" className="text-[#16a34a] hover:underline font-semibold">
                      tại đây
                    </a>
                    .
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  )
}
