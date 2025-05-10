import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { ChevronRight, MapPin, Star } from "lucide-react";
import { Button } from "../ui/button";
import { getAllPractitioners } from "@/database/business";

const featuredPractitioners = getAllPractitioners()

const FeaturedPractitioners = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Thầy Lang Nổi Bật</h2>
          <Link href="/thay-lang" className="text-green-700 hover:text-green-800 flex items-center">
            Xem tất cả
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {featuredPractitioners.map((practitioner) => (
            <Card key={practitioner.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-40 bg-gray-200">
                <img
                  src={practitioner.profilePic||"/placeholder.svg?height=160&width=160&text=Thầy Lang"}
                  alt={practitioner.name|| ""}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-3">
                <div className="flex items-center mb-1">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Top Rated</span>
                </div>
                <h3 className="font-semibold text-sm mb-1">{practitioner.name}</h3>
                
                  <p className="text-xs text-gray-500 mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {practitioner.specializations.map((spec, index) => spec.name).join(", ")}
                  </p>
                
                <div className="flex items-center mb-1">
                  <div className="flex text-yellow-400">
                    {[...Array(Math.round(practitioner.rating))].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({practitioner.reviews.length} đánh giá) </span>
                </div>
                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                  <span>{practitioner.address.substring(0, 30)} ...</span>
                </div>
                <Button size="sm" className="w-full text-xs bg-green-700 hover:bg-green-800">
                  <Link href={`/dat-lich/?idThayLang=${encodeURIComponent(practitioner.id)}`}>Đặt Lịch Tư Vấn</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPractitioners;
