import Link from "next/link"
export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container p-20 mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Về Chúng Tôi</h3>
            <p className="text-muted-foreground mb-4">
              Nền tảng kết nối đông y Việt Nam, mang đến giải pháp y học cổ truyền uy tín và hiệu quả.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/profile.php?id=61575814304088" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="https://www.tiktok.com/@langconnect2?_t=ZS-8wETVVnxkW2&_r=1&fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExVWFYdDlzTG52M2ZUelhNaQEeZO0cct5CE2UTaffdlpe258cx1I6V0XrTmDdFs-pZeirDAKpwmuqX4CENwmA_aem_CLQrQJz6IBXcV4vl6Hu4xQ" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">TikTok</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M9.5 3C9.5 1.61929 10.6193 0.5 12 0.5C13.3807 0.5 14.5 1.61929 14.5 3V3.25C14.5 5.73528 16.5147 7.75 19 7.75H19.5V10.25C18.1641 10.25 16.9033 9.80143 15.9141 9.01786V14.5C15.9141 17.2614 13.6755 19.5 10.9141 19.5C8.15267 19.5 5.91406 17.2614 5.91406 14.5C5.91406 11.7386 8.15267 9.5 10.9141 9.5C11.3944 9.5 11.8531 9.56907 12.2812 9.69446V12.2378C12.0069 12.1622 11.7139 12.125 11.4062 12.125C10.2076 12.125 9.23438 13.0982 9.23438 14.2969C9.23438 15.4955 10.2076 16.4688 11.4062 16.4688C12.6049 16.4688 13.5781 15.4955 13.5781 14.2969V3H9.5Z" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">YouTube</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link href="/thay-lang" className="text-muted-foreground hover:text-primary">
                  Thầy Lang
                </Link>
              </li>
              <li>
                <Link href="/phong-kham" className="text-muted-foreground hover:text-primary">
                  Phòng Khám
                </Link>
              </li>
              <li>
                <Link href="/san-pham" className="text-muted-foreground hover:text-primary">
                  Sản Phẩm
                </Link>
              </li>
              <li>
                <Link href="/kien-thuc" className="text-muted-foreground hover:text-primary">
                  Kiến Thức
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Hỗ Trợ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Trung Tâm Hỗ Trợ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Câu Hỏi Thường Gặp
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Chính Sách Bảo Mật
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Điều Khoản Sử Dụng
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Chính Sách Hoàn Tiền
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên Hệ</h3>
            <address className="not-italic">
              {/* <p className="text-muted-foreground">123 Đường Đông Y, Quận 1</p>
              <p className="text-muted-foreground">TP. Hồ Chí Minh, Việt Nam</p> */}
              <p className="text-muted-foreground mt-2">Email: langconnect2025@gmail.com</p>
              <p className="text-muted-foreground">Điện thoại: 0968912734</p>
            </address>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Nền Tảng Kết Nối Đông Y. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}

