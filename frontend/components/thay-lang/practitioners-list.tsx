import { SelectValue } from "@radix-ui/react-select";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { Calendar, CheckCircle, Clock, MapPin, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { FC, useState } from "react";
import { Practitioner } from "@/types";
import Link from "next/link";

interface PractitionerListProps {
  practitioners: Practitioner[];
}

function sortPractitioners(practitioners: Practitioner[], sortBy: string) {
    const sorted = [...practitioners]; 
    switch (sortBy) {
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "reviews":
        return sorted.sort((a, b) => b.reviews.length - a.reviews.length);
      case "experience":
        return sorted.sort((a, b) => (b.experience ?? 0) - (a.experience ?? 0));
      default:
        return sorted; 
    }
}

const PractitionerList: FC<PractitionerListProps> = ({ practitioners}) => {

    const [sortOption, setSortOption] = useState("rating");

    const sortedPractitioners = sortPractitioners(practitioners, sortOption);

    return (
        <div className="lg:w-3/4">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">Hiển thị {practitioners.length} kết quả</p>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Sắp xếp theo:</span>
            <Select onValueChange={setSortOption} defaultValue="rating">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                <SelectItem value="reviews">Nhiều đánh giá nhất</SelectItem>
                <SelectItem value="experience">Kinh nghiệm nhiều nhất</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          {sortedPractitioners.map((practitioner) => (
            <Card key={practitioner.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 p-4 flex items-center justify-center">
                    <div className="relative">
                      <img
                        src={practitioner?.profilePic || "/placeholder.svg"}
                        alt={practitioner?.name}
                        className="w-32 h-32 object-cover rounded-full"
                      />
                      {practitioner.isVerified && (
                        <div className="absolute -bottom-2 -right-2 bg-green-100 text-green-700 rounded-full p-1">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:w-2/4 p-4 border-t md:border-t-0 md:border-l md:border-r border-gray-200">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-bold mr-2">{practitioner.name}</h3>
                      {practitioner.isOnline && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                          Đang trực tuyến
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{practitioner?.experience || 0} năm kinh nghiệm</p>
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400 mr-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(practitioner?.rating) ? "fill-current" : "text-gray-300"}`}
                            />
                          ))}
                      </div>
                      <span className="text-sm font-medium">{practitioner?.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({practitioner?.reviews.length} đánh giá)</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{practitioner.address}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {practitioner.specializations?.map((specialization) => (
                        <span key={specialization.id} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {specialization.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-1/4 p-4 bg-gray-50 flex flex-col justify-center">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Lịch khám gần nhất</h4>
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          <span>Hôm nay</span>
                        </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        <span>14:00 - 17:00</span>
                      </div>
                    </div>
                    <Button className="w-full bg-green-700 hover:bg-green-800 mb-2">
                        <Link href={`/dat-lich/?idThayLang=${encodeURIComponent(practitioner.id)}`}>Đặt Lịch Tư Vấn</Link>
                        </Button>
                    <Button variant="outline" className="w-full">
                        <Link href={`/thay-lang/${practitioner.id}`}>Xem Hồ Sơ</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {/* <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div> */}
      </div>
    );
}

export default PractitionerList;