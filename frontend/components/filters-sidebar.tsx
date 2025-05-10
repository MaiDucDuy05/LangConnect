'use client'
import { useEffect, useState } from "react";
import { Filter, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clinic, Practitioner } from "@/types";


const specialties = [
  "Châm cứu", "Bấm huyệt", "Xương khớp", "Da liễu", "Tiêu hóa", "Thần kinh", 
  "Mất ngủ", "Gan mật", "Thảo dược"
];

interface FiltersSidebarProps {
    data: Practitioner[] | Clinic[];
   onFilterChange: (filteredData: Practitioner[] | Clinic[]) => void;
}

const FiltersSidebar = ({ data, onFilterChange }: FiltersSidebarProps) => {
  const [address, setAddress] = useState<string>("");  // Khu vực
  const [specialtyFilters, setSpecialtyFilters] = useState<string[]>([]); // Chuyên môn
  const [isOnline, setIsOnline] = useState<boolean>(false); // Trực tuyến
  const [isOffline, setIsOffline] = useState<boolean>(false); // Offline
  const [ratings, setRatings] = useState<number[]>([]); // Đánh giá

  // Hàm xử lý thay đổi bộ lọc
  const handleFilterChange = () => {
    const filteredData= data.filter((item) => {
        const isLocationMatch = location
        ? item.address.toLowerCase().includes(address.toLowerCase())
        : true;
      const isSpecialtyMatch = specialtyFilters.length > 0 
        ? item.specializations.some(specialty => specialtyFilters.includes(specialty.name)) 
        : true;
      const isOnlineMatch = isOnline 
        ? "isOnline" in item && item.isOnline 
        : true;
      const isOfflineMatch = isOffline 
        ? "isOnline" in item && !item.isOnline 
        : true;
      // const isRatingMatch = ratings.length > 0
      //   ? ratings.some((rating) => item?.rating >= rating)
      //   : true;

      return isLocationMatch && isSpecialtyMatch && (isOnlineMatch || isOfflineMatch) 
      // && isRatingMatch;
    });

    if (data.every(item => "isOnline" in item)) {
      onFilterChange(filteredData as Practitioner[]);
    } else {
      onFilterChange(filteredData as Clinic[]);
    }
  };

  const handleSpecialtyChange = (specialty: string) => {
    setSpecialtyFilters((prevFilters) => {
      if (prevFilters.includes(specialty)) {
        return prevFilters.filter((filter) => filter !== specialty); 
      } else {
        return [...prevFilters, specialty]; 
      }
    });
  };

  useEffect(() => {
    handleFilterChange(); 
  }, [specialtyFilters, address, isOnline, isOffline, ratings]);

  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Bộ Lọc</h2>
          <Button onClick={
            () => {
              setAddress("");
              setSpecialtyFilters([]);
              setIsOnline(false);
              setIsOffline(false);
              setRatings([]);
            }
          } variant="ghost" size="sm" className="text-green-700 hover:text-green-800">
            Đặt lại
          </Button>
        </div>

        {/* Location Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Khu Vực</h3>
          <Select value={address} onValueChange={setAddress}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn tỉnh/thành phố" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value=" ">All</SelectItem>
              <SelectItem value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</SelectItem>
              <SelectItem value="Hà Nội">Hà Nội</SelectItem>
              <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
              <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
              <SelectItem value="Hải Phòng">Hải Phòng</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Specialty Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Chuyên Môn</h3>
          <div className="space-y-2">
            {specialties.map((specialty) => (
              <div key={specialty} className="flex items-center">
                <Checkbox 
                  id={specialty} 
                  checked={specialtyFilters.includes(specialty)}
                  onClick={() => handleSpecialtyChange(specialty)} 
                />
                <label htmlFor={specialty} className="ml-2 text-sm text-gray-700">
                  {specialty}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Type */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Hình Thức Khám</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox 
                id="direct"
                onClick={() => setIsOffline(!isOffline)} 
                checked={isOffline}
              />
              <label htmlFor="direct" className="ml-2 text-sm text-gray-700">
                Trực tiếp
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="online"
                checked={isOnline}
                onClick={() => setIsOnline(!isOnline)} 
              />
              <label htmlFor="online" className="ml-2 text-sm text-gray-700">
                Trực tuyến
              </label>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Đánh Giá</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <Checkbox 
                  id={`rating-${rating}`} 
                  checked={ratings.includes(rating)}
                  onClick={() => {
                    if (!ratings.includes(rating)) {
                      setRatings([...ratings, rating]);
                    } else {
                      setRatings(ratings.filter(r => r !== rating));
                    }
                  }} 
                />
                <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center">
                  {Array(rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  {Array(5 - rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gray-300" />
                    ))}
                  <span className="ml-1">& trở lên</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Filters Button */}
        <Button onClick={handleFilterChange} className="w-full bg-green-700 hover:bg-green-800">
          <Filter className="mr-2 h-4 w-4" />
          Áp Dụng Bộ Lọc
        </Button>
      </div>
    </div>
  );
};

export default FiltersSidebar;
