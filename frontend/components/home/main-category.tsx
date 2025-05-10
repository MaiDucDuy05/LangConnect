"use client";
import Link from "next/link"
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {  ChevronRight } from "lucide-react";

const MainCategory = () => {
  return (
    <section className="py-12">
       <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Danh Mục Nổi Bật</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link href="/thay-lang">
                <div className="bg-green-50 p-8 flex flex-col items-center">
                  <div className="text-5xl mb-4 text-green-700">🏥</div>
                  <h3 className="text-xl font-semibold text-center mb-3">Dịch Vụ Khám Chữa Bệnh Đông Y</h3>
                  <p className="text-gray-600 text-center mb-4 text-sm">
                    Tìm kiếm thầy lang và phòng khám đông y uy tín theo khu vực, chuyên môn và đánh giá
                  </p>
                  <Button className="mt-2 bg-green-700 hover:bg-green-800">
                    Tìm Thầy Lang
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link href="/san-pham">
                <div className="bg-green-50 p-8 flex flex-col items-center">
                  <div className="text-5xl mb-4 text-green-700">🌿</div>
                  <h3 className="text-xl font-semibold text-center mb-3">Sản Phẩm Đông Y</h3>
                  <p className="text-gray-600 text-center mb-4 text-sm">
                    Tìm kiếm và mua sắm các sản phẩm đông y chất lượng từ các nhà cung cấp uy tín
                  </p>
                  <Button className="mt-2 bg-green-700 hover:bg-green-800">
                    Mua Sản Phẩm
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link href="/blog">
                <div className="bg-green-50 p-8 flex flex-col items-center">
                  <div className="text-5xl mb-4 text-green-700">⭐</div>
                  <h3 className="text-xl font-semibold text-center mb-3">Góc Đánh Giá & Kinh Nghiệm</h3>
                  <p className="text-gray-600 text-center mb-4 text-sm">
                    Chia sẻ kinh nghiệm, đánh giá và kiến thức về y học cổ truyền từ cộng đồng
                  </p>
                  <Button className="mt-2 bg-green-700 hover:bg-green-800">
                    Xem Bài Viết
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </Card>
          </div>
        </div> 
      </section>
  );
}

export default MainCategory;