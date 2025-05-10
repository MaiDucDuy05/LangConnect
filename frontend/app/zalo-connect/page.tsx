import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ZaloConnectPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Kết Nối Zalo</h1>

      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
                  fill="#0068FF"
                />
                <path
                  d="M26.6601 18.7283C28.1454 18.7283 29.5318 18.9456 30.8192 19.3802C32.1066 19.8149 33.2505 20.4669 34.251 21.3362C35.2514 22.2056 36.0519 23.2923 36.6523 24.5964C37.2527 25.9005 37.5529 27.422 37.5529 29.1608C37.5529 30.8996 37.2527 32.421 36.6523 33.7251C36.0519 35.0293 35.2514 36.116 34.251 36.9853C33.2505 37.8546 32.1066 38.5066 30.8192 38.9413C29.5318 39.3759 28.1454 39.5932 26.6601 39.5932H20.9562C19.4709 39.5932 18.0845 39.3759 16.7971 38.9413C15.5097 38.5066 14.3658 37.8546 13.3653 36.9853C12.3649 36.116 11.5644 35.0293 10.964 33.7251C10.3636 32.421 10.0634 30.8996 10.0634 29.1608C10.0634 27.422 10.3636 25.9005 10.964 24.5964C11.5644 23.2923 12.3649 22.2056 13.3653 21.3362C14.3658 20.4669 15.5097 19.8149 16.7971 19.3802C18.0845 18.9456 19.4709 18.7283 20.9562 18.7283H26.6601Z"
                  fill="white"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl">Tư Vấn Qua Zalo</CardTitle>
            <CardDescription>Kết nối với thầy lang và bác sĩ qua Zalo để được tư vấn nhanh chóng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Các bước kết nối Zalo</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Quét mã QR bên dưới hoặc tìm kiếm "LangConnect" trên Zalo</li>
                <li>Gửi tin nhắn với nội dung "Tư vấn" để bắt đầu</li>
                <li>Mô tả vấn đề sức khỏe của bạn</li>
                <li>Chờ phản hồi từ bác sĩ hoặc thầy lang</li>
              </ol>
            </div>

            <div className="flex justify-center">
              <div className="border-2 border-blue-500 p-4 rounded-lg">
                {/* Placeholder for QR code */}
                <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Mã QR Zalo</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-700 mb-2">Lợi ích khi tư vấn qua Zalo</h4>
              <ul className="list-disc pl-5 space-y-1 text-blue-700">
                <li>Tư vấn nhanh chóng, tiện lợi</li>
                <li>Gửi hình ảnh triệu chứng dễ dàng</li>
                <li>Nhận tư vấn từ các bác sĩ và thầy lang uy tín</li>
                <li>Lưu trữ lịch sử tư vấn để theo dõi</li>
                <li>Nhận thông báo về lịch hẹn và đơn thuốc</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              <svg
                width="20"
                height="20"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
                  fill="#0068FF"
                />
                <path
                  d="M26.6601 18.7283C28.1454 18.7283 29.5318 18.9456 30.8192 19.3802C32.1066 19.8149 33.2505 20.4669 34.251 21.3362C35.2514 22.2056 36.0519 23.2923 36.6523 24.5964C37.2527 25.9005 37.5529 27.422 37.5529 29.1608C37.5529 30.8996 37.2527 32.421 36.6523 33.7251C36.0519 35.0293 35.2514 36.116 34.251 36.9853C33.2505 37.8546 32.1066 38.5066 30.8192 38.9413C29.5318 39.3759 28.1454 39.5932 26.6601 39.5932H20.9562C19.4709 39.5932 18.0845 39.3759 16.7971 38.9413C15.5097 38.5066 14.3658 37.8546 13.3653 36.9853C12.3649 36.116 11.5644 35.0293 10.964 33.7251C10.3636 32.421 10.0634 30.8996 10.0634 29.1608C10.0634 27.422 10.3636 25.9005 10.964 24.5964C11.5644 23.2923 12.3649 22.2056 13.3653 21.3362C14.3658 20.4669 15.5097 19.8149 16.7971 19.3802C18.0845 18.9456 19.4709 18.7283 20.9562 18.7283H26.6601Z"
                  fill="white"
                />
              </svg>
              Mở Zalo để kết nối
            </Button>
            <p className="text-sm text-gray-500 text-center">
              Hoặc liên hệ qua số Zalo: <span className="font-medium">0123.456.789</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

