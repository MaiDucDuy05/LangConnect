import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Practitioner, Clinic} from "@/types";

interface SearchAndFilterProps {
  data: Practitioner[] | Clinic[];
  onFilterChange: (filteredData: Practitioner[] | Clinic[]) => void;
}

const SearchAndFilter = ({ data, onFilterChange }: SearchAndFilterProps) => {
  const [searchText, setSearchText] = useState("");
  const [address, setAddress] = useState("");

  const handleFilter = () => {
    if (data.length > 0 && "isOnline" in data[0]) {
      // Data is Practitioner[]
      const filteredPractitioners = (data as Practitioner[]).filter((practitioner) => {
        const isNameMatch = practitioner.name?.toLowerCase().includes(searchText.toLowerCase()) ?? false;
        const isLocationMatch = practitioner.address.toLowerCase().includes(address.toLowerCase());
        return isNameMatch && isLocationMatch;
      });
      onFilterChange(filteredPractitioners);
    } else {
      // Data is Clinic[]
      const filteredClinics = (data as Clinic[]).filter((clinic) => {
        const isNameMatch = clinic.name?.toLowerCase().includes(searchText.toLowerCase());
        const isLocationMatch = clinic.address.toLowerCase().includes(address.toLowerCase());
        return isNameMatch && isLocationMatch;
      });
      onFilterChange(filteredClinics);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, chuyên môn..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Địa điểm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>
        <div className="flex-none">
          <Button
            onClick={handleFilter}
            className="w-full md:w-auto bg-green-700 hover:bg-green-800"
          >
            <Search className="mr-2 h-4 w-4" />
            Tìm Kiếm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
