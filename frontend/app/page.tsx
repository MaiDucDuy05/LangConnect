import { Button } from "@/components/ui/button"
import Link from "next/link"
import BannerCarousel from "@/components/home/banner-carousel"
import CategoryIcon from "@/components/home/category-icon"
import MainCategory from "@/components/home/main-category"
import FeaturedPractitioners from "@/components/home/fearured-pracitioners"
import AdvertisementBanner from "@/components/home/advertisment-banner"
import FeaturedProducts from "@/components/home/featured-products"
import FeaturedArticles from "@/components/home/featured-articles"
import BetaNotificationDialog from "@/components/beta-notification-dialog"
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <BetaNotificationDialog />
      {/* Banner Carousel - Similar to Shopee's main banner */}
     <BannerCarousel images={[]}/>

      {/* Category Icons - Similar to Shopee's category icons */}
      <CategoryIcon />

      {/* Main Categories */}
      {/* <MainCategory/> */}

      {/* Featured Practitioners */}
      <FeaturedPractitioners />

      {/* Advertisement Banner */}
     {/* <AdvertisementBanner/> */}

      {/* Featured Products */}
     {/* <FeaturedProducts/> */}

      {/* Featured Articles */}
      <FeaturedArticles />

      {/* CTA Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Bạn Là Thầy Lang Hoặc Có Phòng Khám Đông Y?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Đăng ký để trở thành đối tác của chúng tôi và tiếp cận hàng ngàn khách hàng tiềm năng
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-800 hover:bg-gray-100">
              <Link href={'/dang-ky/thay-lang-phong-kham'}> Đăng Ký Làm Đối Tác</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-green-800  border-white text-white hover:bg-white hover:text-green-800">
              Tìm Hiểu Thêm
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

