import { ChevronRight, ShoppingBag, Star } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"

const fearuredProducts = () => {    
    return (
        <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Sản Phẩm Đông Y Nổi Bật</h2>
            <Link href="/san-pham" className="text-green-700 hover:text-green-800 flex items-center">
              Xem tất cả
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative">
                  <div className="h-40 bg-gray-200">
                    <img
                      src={`/placeholder.svg?height=160&width=160&text=Sản Phẩm ${item}`}
                      alt={`Sản Phẩm ${item}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  {item === 2 && (
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1">-15%</div>
                  )}
                  {item === 1 && (
                    <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-2 py-1">
                      Bán chạy
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="text-sm font-medium mb-1 line-clamp-2 h-10">Trà Thảo Mộc Thanh Nhiệt Loại {item}</h3>
                  <div className="flex items-center mb-1">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(85)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-green-700 text-sm">250.000đ</span>
                    <Button size="sm" className="bg-green-700 hover:bg-green-800 h-8 px-2">
                      <ShoppingBag className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
}
export default fearuredProducts