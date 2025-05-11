import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight} from 'lucide-react';
import Link from 'next/link';

interface BannerCarouselProps {
    images: string[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1  gap-4 h-[400px] md:h-[500px] ">
            {/* Main Banner - Takes 2/3 of the width on desktop */}
            <div className="relative overflow-hidden rounded-lg shadow-md">
              {/* Carousel Container */}
              <div className="relative">
                {/* Current Slide */}
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=400&width=800&text=Banner Quảng Cáo Chính"
                    alt="Banner quảng cáo chính"
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                    <div className="text-white p-6 md:p-10 max-w-xl">
                      <span className="inline-block bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                        Khuyến mãi đặc biệt
                      </span>
                      <h3 className="text-2xl md:text-4xl font-bold mb-4">Nền Tảng Kết Nối Đông Y Toàn Diện</h3>
                      <p className="text-gray-200 mb-6">
                        Kết nối với thầy lang, phòng khám và sản phẩm đông y chất lượng. Giảm 30% cho lần đặt lịch đầu
                        tiên.
                      </p>
                      <Button className="bg-green-700 hover:bg-green-800">
                          <Link href="/dat-lich">
                            Đặt Lịch Ngay
                          </Link>
                          <ChevronRight className="ml-2 h-4 w-4" />
                       
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50 ml-2"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50 mr-2"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  <div className="h-2 w-8 bg-white rounded-full"></div>
                  <div className="h-2 w-2 bg-white/50 rounded-full"></div>
                  <div className="h-2 w-2 bg-white/50 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Side Banners - Takes 1/3 of the width on desktop, stacked */}
            {/* <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-lg shadow-md h-[190px] md:h-[195px]">
                <img
                  src="/placeholder.svg?height=200&width=400&text=Quảng Cáo 1"
                  alt="Quảng cáo 1"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center p-4">
                  <div className="text-white">
                    <h3 className="text-lg font-bold mb-2">Sản Phẩm Đông Y Mới</h3>
                    <p className="text-sm mb-2">Khám phá các sản phẩm mới nhất</p>
                    <Button size="sm" className="bg-green-700 hover:bg-green-800">
                      <Link href={'/san-pham'}> Xem Ngay</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-md h-[190px] md:h-[195px]">
                <img
                  src="/placeholder.svg?height=200&width=400&text=Quảng Cáo 2"
                  alt="Quảng cáo 2"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center p-4">
                  <div className="text-white">
                    <h3 className="text-lg font-bold mb-2">Thầy Lang Uy Tín</h3>
                    <p className="text-sm mb-2">Đặt lịch với thầy lang hàng đầu</p>
                    <Button size="sm" className="bg-green-700 hover:bg-green-800">
                      <Link href={"/thay-lang"}>Đặt Lịch</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

    );
};

export default BannerCarousel;