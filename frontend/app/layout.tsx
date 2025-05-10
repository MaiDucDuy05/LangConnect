import React, { ReactNode } from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import ClientOnly from "@/components/ui/ClientOnly"
import { CartProvider } from "@/context/CartContext"
import { AuthProvider } from "@/context/AuthContext";


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Nền Tảng Kết Nối Đông Y",
  description: "Kết nối với thầy lang, phòng khám và sản phẩm đông y chất lượng",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <ClientOnly>{children}</ClientOnly>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

