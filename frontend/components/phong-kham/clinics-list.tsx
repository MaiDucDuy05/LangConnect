import { Clinic } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { CheckCircle, MapPin, Phone, Star } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { useState } from "react";


function sortClinics(Clinics: Clinic[], sortBy: string) {
        const sorted = [...Clinics]; 
        switch (sortBy) {
          case "rating":
            return sorted.sort((a, b) => b.rating - a.rating);
          case "reviews":
            return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
          case "experience":
            return sorted.sort((a, b) => b.experience - a.experience);
          default:
            return sorted; 
        }
    }

const ClinicsList = ({ clinics }: { clinics: Clinic[] }) => {
     const [sortOption, setSortOption] = useState("rating");
    
    const sortedClinics = sortClinics(clinics, sortOption);

  return (
    <div className="lg:w-3/4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">Hiển thị {clinics.length} kết quả</p>
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
            {sortedClinics.map((clinic) => (
              <Card key={clinic.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto">
                      <img
                        src={clinic.image || "/placeholder.svg"}
                        alt={clinic.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-bold mr-2">{clinic.name}</h3>
                        {clinic.isVerified && (
                          <div className="bg-green-100 text-green-700 rounded-full p-1">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{clinic.experience} năm kinh nghiệm</p>
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400 mr-1">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(clinic.rating) ? "fill-current" : "text-gray-300"}`}
                              />
                            ))}
                        </div>
                        <span className="text-sm font-medium">{clinic.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({clinic.reviewCount} đánh giá)</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{clinic.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Phone className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{clinic.phone}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {clinic.specialties.map((specialty) => (
                          <span key={specialty} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <span>{clinic.services} dịch vụ</span>
                      </div>
                      <div className="flex gap-3">
                        <Button className="bg-green-700 hover:bg-green-800">
                            <Link href={`/dat-lich/?idPhongKham=${encodeURIComponent(clinic.id)}`}>Đặt Lịch Ngay</Link>
                        </Button>
                        <Button variant="outline">
                          <Link href={`/phong-kham/${clinic.id}`}>Xem Chi Tiết</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8">
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
          </div>
        </div>
  );
}

export default ClinicsList;