"use client";
import { useEffect, useRef, useState } from "react";
import SearchAndFilter from "@/components/search-and-filter"
import FiltersSidebar from "@/components/filters-sidebar"
import PractitionersList from "@/components/thay-lang/practitioners-list"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ClipboardList, Bell, ThumbsUp, Clock } from "lucide-react"
import { Clinic, Practitioner } from "@/types";
import { getAllPractitioners } from "@/database/business";
import { Button } from "@/components/ui/button";
// import {getBusinessApi} from "@/lib/api";
// import { useAuth } from "@/context/AuthContext"

const EmptyStateWithSurvey = ({ position }: { position: "center" | "bottom" }) => {
    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSe8QianXbD8alss08UX_UDnBDKpay44YjlFj3nf9HuhhM8pBA/viewform"

    const containerStyles =
      position === "center"
        ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-4xl shadow-2xl animate-fadeIn"
        : "w-full"

    return (
      <Card className={`${containerStyles} border-dashed border-2 border-green-200 bg-green-50 overflow-hidden`}>
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">

            <p className="text-gray-600 mb-6 max-w-2xl text-sxl">
              Không tìm thấy thầy thuốc phù hợp?
              <br />
              Đừng lo! Chúng tôi vẫn đang mở rộng mạng lưới thầy thuốc trên toàn quốc mỗi ngày.
              <br />
              Hãy chia sẻ nhu cầu hoặc tình trạng sức khỏe của bạn – đội ngũ của chúng tôi sẽ chủ động hỗ trợ và kết nối bạn với thầy lang phù hợp nhất trong thời gian sớm nhất.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-3xl">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <Clock className="h-10 w-10 text-green-600 mb-2" />
              
                <h4 className="font-medium text-gray-800"> Mất 1 phút để được kết nối đúng người</h4>
                <p className="text-sm text-gray-500">Khảo sát ngắn gọn, dễ trả lời</p>
              </div>

              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <ClipboardList className="h-10 w-10 text-green-600 mb-2" />
                <h4 className="font-medium text-gray-800">Trả lời nhanh</h4>
                <p className="text-sm text-gray-500">Nhận hỗ trợ đúng người</p>
              </div>

              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <ThumbsUp className="h-10 w-10 text-green-600 mb-2" />
                <h4 className="font-medium text-gray-800">Cải thiện dịch vụ</h4>
                <p className="text-sm text-gray-500">Góp phần phát triển cộng đồng</p>
              </div>
            </div>

            <Button
              className="rounded-full bg-green-600 hover:bg-green-700 text-white px-8 py-6 h-auto text-lg font-medium"
              onClick={() => window.open(googleFormUrl, "_blank")}
            >
              📩 Đăng ký ngay để nhận tư vấn khi có thầy thuốc phù hợp
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }


export default function ThayLangPage() {
  const [filteredPractitioners, setFilteredPractitioners] = useState<Practitioner[] | Clinic[]>([])
  const practitionersData = getAllPractitioners()
  const [practitioners, setPractitioners] = useState<Practitioner[]>(practitionersData)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [popupPosition, setPopupPosition] = useState<"center" | "bottom">("bottom")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const surveyRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const interval = setInterval(() => {
        setPopupPosition((prev) => {
          if (prev === "bottom") {
            return "center"
          }
          return prev
        })
      }, 20000)

      return () => {
        clearInterval(interval)
      }
    }, [])


  const handleClosePopup = () => {
    setPopupPosition("bottom")
    setTimeout(() => {
      if (surveyRef.current) {
        surveyRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  // const { user: authUser}= useAuth()
  // const businessApi = getBusinessApi(authUser?.token);

  // useEffect(() => {
  //   async function fetchPractitioners() {
  //     try {
  //       const data = await businessApi.getBusiness("HERBALIST");
  //       console.log("Fetched practitioners:", data);
  //       setPractitioners(data);
  //       setFilteredPractitioners(data);
  //     } catch (error) {
  //       console.error("Failed to fetch practitioners", error);
  //     }
  //   }
  //   fetchPractitioners();
  // }, []);

  const handleFilterChange = (filteredData: Practitioner[] | Clinic[], term?: string) => {
    setFilteredPractitioners(filteredData)
    if (term !== undefined) {
      setSearchTerm(term)
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filteredData = practitioners.filter((practitioner) =>
      practitioner.name?.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredPractitioners(filteredData)
  }



  return (
    <div onClick={handleClosePopup } className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tìm Kiếm Thầy Lang </h1>

      <SearchAndFilter
        data={practitioners}
        onFilterChange={(filteredData, term) => {
          if (Array.isArray(filteredData) && filteredData.every((item) => "isOnline" in item && "isOffline" in item)) {
            handleFilterChange(filteredData as Practitioner[], term)
          }
        }}
        onSearch={handleSearch}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <FiltersSidebar data={practitioners} onFilterChange={handleFilterChange}/>

        {/* Practitioners List */}
        <PractitionersList practitioners={filteredPractitioners.filter((item): item is Practitioner => 'services' in item)} />
      </div>

      {/* <div ref={surveyRef}>
          {(popupPosition === "bottom" || !showPopup) && <EmptyStateWithSurvey position="bottom" />}
        </div> */}
      {/* Hiển thị popup ở giữa màn hình sau 10 giây */}
      <EmptyStateWithSurvey position={popupPosition} />

    </div>
  )
}


