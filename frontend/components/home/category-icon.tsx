import Link from "next/link";

const CategoryIcon = () => {
    return(
        <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <Link href="/thay-lang" className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2 group-hover:bg-green-200 transition-colors">
                <span className="text-3xl">🧑‍⚕️</span>
              </div>
              <span className="text-sm text-center text-gray-700">Thầy Thuốc Đông Y</span>
            </Link>
            <Link href="/phong-kham" className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2 group-hover:bg-green-200 transition-colors">
                <span className="text-3xl">🏢</span>
              </div>
              <span className="text-sm text-center text-gray-700">Phòng Khám</span>
            </Link>
            <Link href="/san-pham" className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2 group-hover:bg-green-200 transition-colors">
                <span className="text-3xl">🌿</span>
              </div>
              <span className="text-sm text-center text-gray-700">Sản Phẩm Đông Y</span>
            </Link>
            {/* <Link href="/dat-lich" className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2 group-hover:bg-green-200 transition-colors">
                <span className="text-3xl">📅</span>
              </div>
              <span className="text-sm text-center text-gray-700">Đặt Lịch Tư Vấn</span>
            </Link> */}
            <Link href="/kien-thuc" className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2 group-hover:bg-green-200 transition-colors">
                <span className="text-3xl">📚</span>
              </div>
              <span className="text-sm text-center text-gray-700">Thư Viện</span>
            </Link>
          </div>
        </div>
      </section>
    )
}


export default CategoryIcon;