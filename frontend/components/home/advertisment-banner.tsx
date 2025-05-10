import { ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";

const AdvertisementBanner = () => {
  return (
    <section className="py-8">
    <div className="container mx-auto px-4">
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl overflow-hidden shadow-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-8 md:p-12">
            <span className="inline-block bg-white text-amber-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
              Quảng cáo
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Trà Thảo Mộc Thanh Nhiệt Giải Độc</h3>
            <p className="text-white/90 mb-6">
              Sản phẩm mới từ Thảo Mộc Xanh - Giúp thanh lọc cơ thể, giải độc gan, hỗ trợ tiêu hóa và cải thiện giấc
              ngủ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-amber-600 hover:bg-gray-100">
                Mua Ngay
                <ShoppingBag className="ml-2 h-4 w-4" />
              </Button>
              <Button className="bg-white text-amber-600 hover:bg-gray-100">
                Tìm Hiểu Thêm
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="/placeholder.svg?height=400&width=600&text"
              alt="Trà Thảo Mộc Thanh Nhiệt"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}   
export default AdvertisementBanner;